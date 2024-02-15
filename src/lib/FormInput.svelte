<!-- src/lib/FormInput.svelte -->
<script lang="ts">
  type FormData = {
    name: string;
    location: string;
    service: string;
    description: string;
    price: number;
    email: string;
  };

  let formData: FormData = {
    name: '',
    location: '',
    service: '',
    description: '',
    price: 0,
    email: ''
  };

  const handleSubmit = () => {
    console.log(formData); // Handle form submission
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="name">Name:</label>
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

  <button type="submit">Submit</button>

  
</form>
