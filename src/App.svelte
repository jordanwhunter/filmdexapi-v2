<script>
  import { onMount } from 'svelte';
  import { createItem, getJSON } from './apiCall';
  import Spinner from 'svelte-spinner';
  import Modal from './Modal.svelte';
  import Title from './Title.svelte';
  import API from './apiLink.svelte';

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

  .italic {
    font-style: italic;
  }

  .left-align {
    text-align: left;
  }

  .lighter {
    font-weight: lighter;
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
      <input type='text' name='notes' placeholder='Leave A Note...'><br><br>
      <button>Submit</button>
    </form>
  {/await}
</Modal>
<main>
  <Title />
  <!-- <section>
      <h2>
        <span class='underline'>The Film API</span>
        <br>
        <span class='italic smaller'>
          A RESTful Camera Film API <br>
          Cataloging 130+ different 35mm / 120 format film types and counting!
        </span>
      </h2>
  </section> -->
  <API />
  <!-- <section>
    <h4 class='italic'>
    Direct link to results: 
      <a 
        href='https://filmapi.vercel.app/api/films' 
        target='_blank' 
        rel='noreferrer noopener'
      >
        https://filmapi.vercel.app/api/films
      </a>
    </h4>
  </section> -->
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
  <section class='left-align'>
    <h4 class='underline'>About</h4>
    <h5>What is this?</h5>
    <p class='smaller'>
      This website provides a RESTful <span class='underline'>application programming interface</span> (API) to detailed objects related to photo camera film - both in 35mm format and 120 format. Using this website, you can consume information on camera film brands, a specific film's ISO, developing processes, key features, and more. 
    </p>
    <h5>What is an API?</h5>
    <p class='smaller'>
      An <span class='underline'>application programming interface</span> (API) is a computing interface that defines interactions between multiple software intermediaries. It defines the kinds of calls or requests that can be made, how to make them, the data formats that should be used, the conventions to follow, etc. In this case, the application is a database of camera film types, and the interface is a URL link. <br><br>
      A RESTful API, or a <span class='underline'>representational state transfer</span> API, is one that conforms to the constraints of HTTP(S) parameters.
    </p>
    <h5>How much information is here?</h5>
    <p class='smaller'>
      The API is small, but growing! Currently, we've catalogued around 130 different types of applicable photo film. The items within our database include:
    </p>
    <ul class='smaller'>
      <li>Brand Name</li>
      <li>Film Model</li>
      <li>ISO</li>
      <li>Availability in 35mm</li>
      <li>Availability in 120 format</li>
      <li>Black & White / Color Specification</li>
      <li>Photographic Processing Type</li>
      <li>Image (500 x 500)</li>
      <li>Film Description</li>
      <li>Key Features</li>
    </ul>
    <h5>This API is missing film types that I'm familiar with!</h5>
    <p class='smaller'>
      We're fully aware! While we feel like we've already made decent progress of growing our database, we're just getting started! Feel free to contribute to open issues on <a href='https://github.com/jordanwhunter/filmdexapi-v2' target='_blank'>Github</a>. If you aren't a developer, but would still like to contribute, please click <button on:click={toggleModal}>here</button>
    </p>
  </section>
</main>
