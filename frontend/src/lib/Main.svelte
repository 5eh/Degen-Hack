<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit, MichelCodecPacker } from "@taquito/taquito";
  import { char2Bytes, bytes2Char } from "@taquito/utils";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";
  import { COMPANY, MARKETPLACE_TYPE, WEB3_RPC_URL} from "../../MarketplaceVariables.js"

   type ExtendedFormData = {
  location: string;
  service: string;
  description: string;
  price: string | number;
  email: string;
  wallet: string;
  title: string;
  files: FileList | null;
};

  let service: string = '';
  let location: string = '';
  let price: string = '';
  let email: string = '';
  let title: string = '';
  let description: string = '';
  let files: FileList | null = null;

const initialFormData: ExtendedFormData = {
  location: '',
  service: '',
  description: '',
  price: '', // Assuming price is a number, not a string
  email: '',
  wallet: '',
  title: '',
  files: undefined,
};

  let Tezos: TezosToolkit;
  let wallet: BeaconWallet;
  const walletOptions = {
    name: "Create NFTs",
    preferredNetwork: NetworkType.GHOSTNET
  };
  let userAddress: string;

  if (process.env.NODE_ENV === "dev") {
    title = "uranus";
    description = "this is Uranus";
  }

 $: formData = {
    location: location,
    service: service,
    description: description,
    price: price,
    email: email,
    wallet: userAddress,
    title: title,
    files: files,
    
    };
  
  const submitToMongoDB = async () => {
      console.log(formData)
    const response = await fetch('http://localhost:5000/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to MongoDB');
    }

    const result = await response.json();
    console.log("MongoDB Submission Result:", result);
  };

  const rpcUrl = `${WEB3_RPC_URL}`;

  console.log(rpcUrl)
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
    submitToMongoDB();

  };

  onMount(async () => {
    Tezos = new TezosToolkit(rpcUrl);
    Tezos.setPackerProvider(new MichelCodecPacker());
    wallet = new BeaconWallet(walletOptions);
    if (await wallet.client.getActiveAccount()) {
      userAddress = await wallet.getPKH();
      Tezos.setWalletProvider(wallet);
      await getUserNfts(userAddress);
    }
  });
  
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
    <div>
  <div class="user-nfts">
    Your Web3 Services:
    {#if nftStorage && userNfts.length > 0}
      <select class="dropdown">
        {#each userNfts as nft}
          <option value={nft.tokenId}>
            <a href={`https://cloudflare-ipfs.com/ipfs/${nft.ipfsHash}`} target="_blank" rel="noopener noreferrer nofollow">
              Listing {nft.tokenId}
            </a>
          </option>
        {/each}
      </select>
    {:else}
      <p>No Web3 Services found for your wallet.</p>
    {/if}
</div>
        <br />

      </div>
      {#if newNft}
        <div>Your NFT has been successfully minted!</div>
        <div>
          <a
            href={`https://cloudflare-ipfs.com/ipfs/${newNft.imageHash}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to your picture
          </a>
        </div>
        <div>
          <a
            href={`https://cloudflare-ipfs.com/ipfs/${newNft.metadataHash}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to your metadata
          </a>
        </div>
        <div>
          <a
            href={`https://better-call.dev/ghostnet/opg/${newNft.opHash}/contents `}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Link to the operation details
          </a>
        </div>
        <div>
          <button class="trueno" on:click={() => (newNft = undefined)}>
            Mint a new NFT
          </button>
        </div>
      {:else}
        <div>
          <div>Select your picture</div>
          <br />
          <input type="file" bind:files />
        </div>
        <div>
          <label for="image-title">
            <span>Title:</span>
            <input type="text" placeholder="Professional kitchen remodelling" id="image-title" bind:value={title} />
          </label>
        </div>
        <div>
          <label for="image-description">
            <span>Description:</span>
            <textarea
              id="image-description"
              rows="4"
              placeholder="A professional kitchen remodelling service. We offer a full range of services from design to installation. We are a team of experienced professionals who are passionate about what we do. We are committed"
              bind:value={description}
            />
          </label>
        </div>
                   
        <div>
          <label for="service">
            <span>Service:</span>
            <input type="text" placeholder="Kitchen Remodelling" bind:value={service} />

          </label>
        </div>

                <div>
          <label for="price">
            <span>Price:</span>
            <input
              id="price"
              bind:value={price}
              type="number"
              placeholder="zł"
            />
          </label>
        </div>

                <div>
          <label for="service">
            <span>Location:</span>
            <input
              id="location"
              placeholder="Poland, Lublin"
              bind:value={location}
            />
          </label>
        </div>

                        <div>
          <label for="service">
            <span>Primary contact:</span>
            <input
              id="email"
              placeholder="@gmail, @yahoo, @protonmail"
              bind:value={email}
            />
          </label>
        </div>
       
       
        <div>
          {#if pinningMetadata}
            <button class="trueno"> Saving your image... </button>
          {:else if mintingToken}
            <button class="trueno"> Minting your NFT... </button>
          {:else}
            <button class="trueno functionbutton" on:click={upload}> Create Listing </button>
          {/if}
        </div>
      {/if}
    {:else}
    <div class="trueno">Sell your {MARKETPLACE_TYPE} services here</div>
      <button class="trueno functionbutton" on:click={connect}>Create Listing</button>
      
    {/if}
    <p>The {COMPANY} </p>
    <button class="trueno functionbutton" on:click={disconnect}>Change Accounts</button>
</div>
</main>
