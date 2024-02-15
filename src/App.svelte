<script lang="ts">
  import FormInput from './lib/FormInput.svelte';
  import ConnectDatabase from './lib/ConnectDatabase.svelte';
</script>

<main>
  <p>Locale - The Photography marketplace</p>

  <FormInput />
  <ConnectDatabase />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
