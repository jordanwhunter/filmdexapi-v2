<script>
  export let showModal = false;
  export let message;
</script>

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
  }

  .modal {
    padding: 10px;
    border-radius: 10px;
    max-width: 400px;
    margin: 10% auto;
    text-align: center;
    background: #fff;
  }
</style>

{#if showModal}
  <section class='backdrop' on:click>
    <div class='modal'>
      <p>{message}</p>
    </div>
  </section>
{/if}