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

  .italic {
    font-style: italic;
  }

  .lighter {
    font-weight: lighter;
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
      <h2>
        The Film API
        <br>
        <span class='italic lighter'>
          The RESTful Camera Film API
        </span>
      </h2>
      <h5 class='italic'>
        Cataloging 130 different 35mm / 120 format film types and counting!
      </h5>
    </div>
  </section>
  <section>
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
  </section>
  <br />
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
</main>
