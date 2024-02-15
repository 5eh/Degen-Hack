<script>
  async function pingDatabase() {
    const response = await fetch('http://localhost:5000/pingDatabase');
    const data = await response.text();
    console.log(data);
  }
</script>

<button on:click={pingDatabase}>Ping Database</button>