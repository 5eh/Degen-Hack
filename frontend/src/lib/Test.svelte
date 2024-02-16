<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
  import { char2Bytes, bytes2Char } from "@taquito/utils";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";
  import { COMPANY, MARKETPLACE_TYPE, WEB3_RPC_URL } from "../../MarketplaceVariables.js";

  type ExtendedFormData = {
    name: string;
    location: string;
    service: string;
    description: string;
    price: number;
    email: string;
    wallet: string;
    title: string;
    imageDescription: string;
    files: FileList | null;
  };

  let Tezos: TezosToolkit;
  let wallet: BeaconWallet;
  const walletOptions = {
    name: "Create NFTs",
    preferredNetwork: NetworkType.GHOSTNET,
  };
  let userAddress: string = '';
  let formData: ExtendedFormData = {
    name: 'Personal Photography Studio of Austin',
    location: 'Austin, Texas',
    service: 'Photography',
    description: 'We sell photography services for all occasions.',
    price: 11110,
    email: 'example@photos.com',
    wallet: '',
    title: '',
    imageDescription: '',
    files: null,
  };

  let files, title, description;

  const rpcUrl = `${WEB3_RPC_URL}`;


const serverUrl =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "https://my-cool-backend-app.com";
  const contractAddress = "KT1W6APrMVKSbPELYKx8TUsBwque5TwvRrEE";
  let nftStorage = undefined;
  let userNfts: { tokenId: number; ipfsHash: string }[] = [];
  let pinningMetadata = false;
  let mintingToken = false;
  let newNft:
    | undefined
    | { imageHash: string; metadataHash: string; opHash: string };

  onMount(async () => {
    Tezos = new TezosToolkit(WEB3_RPC_URL);
    Tezos.setPackerProvider(new MichelCodecPacker());
    wallet = new BeaconWallet(walletOptions);
    if (await wallet.client.getActiveAccount()) {
      userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      await getUserNfts(userAddress);
    }
  });

const getUserNfts = async (address: string) => {
  const contract = await Tezos.wallet.at(contractAddress);
  nftStorage = await contract.storage();

  const getTokenIds = await nftStorage.reverse_ledger.get(address);
  if (getTokenIds) {
    userNfts = await Promise.all(
      getTokenIds.map(async id => {
        const tokenId = id.toNumber();
        const metadata = await nftStorage.token_metadata.get(tokenId);
        const tokenInfoBytes = metadata.token_info.get("");
        const tokenInfo = bytes2Char(tokenInfoBytes);
        // Assuming you have a way to get the opHash for each tokenId
        // This might involve another call or a different data structure
        const opHash = "opHash";
        return {
          tokenId,
          opHash, // include the operation hash here
          ipfsHash: tokenInfo.slice(0, 7) === "ipfs://" ? tokenInfo.slice(7) : null
          // Add other properties as needed
        };
      })
    );
  }
};

  const connect = async () => {
    if (!wallet) {
      wallet = new BeaconWallet(walletOptions);
    }

    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl
        }
      });
      userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      await getUserNfts(userAddress);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    wallet.client.destroy();
    wallet = undefined;
    userAddress = "";
  };


  const upload = async () => {
    try {
      pinningMetadata = true;
      const data = new FormData();
      data.append("image", files[0]);
      data.append("title", title);
      data.append("description", description);
      data.append("creator", userAddress);

      const response = await fetch(`${serverUrl}/mint`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: data
      });
      if (response) {
        const data = await response.json();
        if (
          data.status === true &&
          data.msg.metadataHash &&
          data.msg.imageHash
        ) {
          pinningMetadata = false;
          mintingToken = true;
          // saves NFT on-chain
          const contract = await Tezos.wallet.at(contractAddress);
          const op = await contract.methods
            .mint(char2Bytes("ipfs://" + data.msg.metadataHash), userAddress)
            .send();
          console.log("Op hash:", op.opHash);
          await op.confirmation();

          newNft = {
            imageHash: data.msg.imageHash,
            metadataHash: data.msg.metadataHash,
            opHash: op.opHash
          };

          files = undefined;
          title = "";
          description = "";

          // refreshes storage
          await getUserNfts(userAddress);
        } else {
          throw "No IPFS hash";
        }
      } else {
        throw "No response";
      }
    } catch (error) {
      console.log(error);
    } finally {
      pinningMetadata = false;
      mintingToken = false;
    }
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(formData)
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the form.'); 
    }
  };
</script>

<style lang="scss">
  $tezos-blue: #2e7df7;

  h1 {
    font-size: 3rem;
  }

  .trueno {
    text-transform: uppercase;
    font-family: "trueno-light";
    font-weight: bold;
  }

  .container {
    font-size: 1.3rem;
    & > div {
      padding: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    input,
    textarea {
      padding: 10px;
    }

    .user-nfts {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<main>
  <div class="container">
    <h1>THE {MARKETPLACE_TYPE} MARKETPLACE</h1>
    {#if userAddress}
      <form on:submit|preventDefault={handleSubmit}>
        <label for="title">Title</label>
        <input type="text" id="title" bind:value={formData.title} />

        <label for="location">Location:</label>
        <input type="text" id="location" bind:value={formData.location} />

        <label for="service">Service:</label>
        <input type="text" id="service" bind:value={formData.service} />

        <label for="description">Description:</label>
        <textarea id="description" bind:value={formData.description}></textarea>

        <label for="price">Price:</label>
        <input type="number" id="price" bind:value={formData.price} />

        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={formData.email} />

        <label for="wallet">Wallet:</label>
        <input type="text" id="wallet" bind:value={formData.wallet} />

        <label for="image-title">Title:</label>
        <input type="text" id="image-title" bind:value={title} />

        <label for="image-description">Image Description:</label>
        <textarea id="image-description" rows="4" bind:value={description} />

        <label for="image-file">Select Image:</label>
        <input type="file" id="image-file" bind:files />

        <button type="submit" class="trueno" on:click={upload}>Submit</button>
      </form>

      {#if newNft}
        <div>Your NFT has been successfully minted!</div>
        <div>
          <a href={`https://cloudflare-ipfs.com/ipfs/${newNft.imageHash}`} target="_blank" rel="noopener noreferrer nofollow">
            Link to your picture
          </a>
        </div>
        <div>
          <a href={`https://cloudflare-ipfs.com/ipfs/${newNft.metadataHash}`} target="_blank" rel="noopener noreferrer nofollow">
            Link to your metadata
          </a>
        </div>
        <div>
          <a href={`https://better-call.dev/ghostnet/opg/${newNft.opHash}/contents `} target="_blank" rel="noopener noreferrer nofollow">
            Link to the operation details
          </a>
        </div>
      {/if}

      {#if pinningMetadata}
        <p>Saving your image...</p>
      {:else if mintingToken}
        <p>Minting your NFT...</p>
      {/if}
      
      <button class="trueno" on:click={disconnect}>Log out</button>
      <button class="trueno" on:click={disconnect}>Change Accounts</button>
      
    {:else}
      <div class="trueno">Sell your {MARKETPLACE_TYPE} services here</div>
      <button class="trueno" on:click={connect}>Login</button>
    {/if}
  </div>
  <p>The {COMPANY}</p>
</main>