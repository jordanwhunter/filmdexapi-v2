<script>
  export let showModal = false;
</script>

<style>
  .backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
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
  <section class='backdrop' on:click|self>
    <div class='modal'>
      <slot></slot>
    </div>
  </section>
{/if}