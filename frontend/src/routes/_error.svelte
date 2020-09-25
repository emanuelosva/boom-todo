<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  .Error404 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .Error404-image figure {
    margin: 2em 0;
    padding: 0;
  }
  .Error404-image img {
    width: 250px;
    margin: 2em 0 0 0;
    transform: translateY(0px);
    animation: float 8s ease-in-out infinite;
  }
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-40px);
    }
    000% {
      transform: translateY(0px);
    }
  }
  h1,
  p {
    margin: 3em auto;
    color: #fff;
  }

  h1 {
    font-size: 5em;
    font-weight: 700;
    margin: 0;
  }

  p {
    font-size: 1.5em;
    margin: 2em auto;
    text-align: center;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 6em;
    }
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="Error404">
  <div class="Error404-message">
    <h1>{status}</h1>
    <p>{error.message}</p>
    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </div>
  <div class="Error404-image">
    <figure>
      <img src="https://arepa.s3.amazonaws.com/img404.png" alt="Error 404" />
    </figure>
  </div>
</div>
