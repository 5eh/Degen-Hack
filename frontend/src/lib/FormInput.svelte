<!-- src/lib/FormInput.svelte -->
<script lang="ts">
  type FormData = {
    name: string;
    location: string;
    service: string;
    description: string;
    price: number;
    email: string;
    wallet: string;
  };

  let formData: FormData = {
    name: 'Personal Photography Studio of Austin',
    location: 'Austin, Texas',
    service: 'Photography',
    description: 'We sell photography services for all occasions.',
    price: 11110,
    email: 'example@photos.com',
    wallet: ``,
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
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the form.'); 
    }
  };
</script>


<form on:submit|preventDefault={handleSubmit}>
  <label for="name">Name (or business):</label>14
  <input type="text" id="name" bind:value={formData.name} />

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

  <button type="submit">Submit</button>

  
</form>
