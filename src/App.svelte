<script>
  import { onMount } from 'svelte';
  
  let films = [];

  onMount(async () => {
    const res = await fetch('/api/films');
    films = await res.json();
  });
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
    box-shadow: 0px 2px 4px rgba(0,0,0,0.1)
  }

  .films {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 8px;
  }

  figure, img {
    width: 100%;
    margin: 0;
    font-size: small;
    font-style: italic;
  }

  
</style>

<main>
  <section>
    <div>
      <h2>The Film API</h2>
      <h3>The RESTful Camera Film API</h3>
      <h5>Cataloging 130 different 35mm / 120 format film types and counting!</h5>
    </div>
  </section>
  <section>
    <h2>
    Deployed with
      <a href='https://vercel.com/docs' target='_blank' rel='noreferrer noopener'>
        Vercel
      </a>!
    </h2>
  </section>
  <!-- <p>
    <a
      href='https://github.com/vercel/vercel/tree/master/examples/svelte'
      target='_blank'
      rel='noreferrer noopener'>
      This project
    </a>
    is a
    <a href='https://svelte.dev/'>Svelte</a>
    app with three directories,
    <code>/public</code>
    for static assets,
    <code>/src</code>
    for components and content, and
    <code>/api</code>
    which contains a serverless
    <a href='https://nodejs.org/en/'>Node.js</a>
    function. See
    <a href='/api/date'>
      <code>api/date</code>
      for the Date API with Node.js
    </a>
    .
  </p> -->
  <br />
  <!-- <section>
    <h2>The date according to Node.js is:</h2>
    <p>{date ? date : 'Loading date...'}</p>
  </section> -->
  <section>
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
</main>
