<script>
  import { onMount } from 'svelte';
  import { createItem, getJSON } from './apiCall';
  import Spinner from 'svelte-spinner';
  import Modal from './Modal.svelte';
  import Title from './Title.svelte';
  import API from './ApiLink.svelte';
  import About from './About.svelte';

  let films = [];
  let submissions = [];
  let showModal = false;
  let createPromise = Promise.reject();

  onMount(async () => {
    const res = await fetch('/api/films');
    films = await res.json();
  });

  const toggleModal = () => {
    showModal = !showModal
  };

  const create = event => {
    const item = getJSON(event)
    createPromise = createItem(item)
    .then(submissionRes => submissions = [submissionRes, ...submissions])
    .then(() => Promise.reject())
  };
</script>

<style>
  .container {
    overflow: scroll;
    overflow-y: auto;
    height: 500px;
    width: auto;
    background: #fff;
    padding: 5px;
    border-radius: 6px; 
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  }

  .films {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  .left-align {
    text-align: left;
  }

  .smaller {
    font-size: small;
  }

  .underline {
    text-decoration: underline;
  }

  figure, img {
    width: 100%;
    margin: 0;
    font-size: small;
    font-style: italic;
  }
</style>

<Modal {showModal} on:click={toggleModal}>
  <h3>Submit a New Film Type</h3>
  {#await createPromise}
    <Spinner size='60' color='#8A2BE2' />
  {:catch error}
    {#if error}{error}{/if}
    <form on:submit|preventDefault={create}>
      <input type='text' name='brand' placeholder='Film Brand (Required)'><br>
      <input type='text' name='name' placeholder='Film Model (Required)'><br>
      <input type='number' name='iso' placeholder='ISO (Number)'><br>
      <input type='text' name='process' placeholder='Process'><br>
      <input type='text' name='staticImageUrl' placeholder='Image URL'><br>
      <input type='text' name='description' placeholder='Film Description'><br>
      <input type='text' name='contributor' placeholder='Your Name'><br>
      <input type='text' name='notes' placeholder='Leave a Note...'><br><br>
      <button>Submit</button>
    </form>
  {/await}
</Modal>
<main>
  <Title />
  <API />
  <br />
  <section>
    <p class='smaller'>(Scroll for overview of API's contents)</p>
    <div class='container'>
      <div class='films'>
        {#each films as film}
          <figure>
            <img 
              src={film.staticImageUrl} 
              alt={film.name}
            >
            <figcaption>
              {film.brand
                .toLowerCase()
                .split(' ')
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ')
              }
              <br />
              {film.name
                .toLowerCase()
                .split(' ')
                .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ')
              }
            </figcaption>
          </figure>
        {:else}
          <p>Loading Film Types...</p>
        {/each}
      </div>
    </div>
  </section>
  <h4 class='underline left-align'>About</h4>
  <div class='container left-align'>
    <About />
    <h5>This API is missing film types that I'm familiar with!</h5>
    <p class='smaller'>
      We're fully aware! While we feel like we've already made decent progress of growing our database, we're just getting started! Feel free to contribute to open issues on <a href='https://github.com/jordanwhunter/filmdexapi-v2' target='_blank'>Github</a>. If you aren't a developer, but would still like to contribute, please click <button on:click={toggleModal}>here</button> please note: submitting a film type does not guarantee that it will be added to the API's database. 
    </p>
  </div>
</main>
