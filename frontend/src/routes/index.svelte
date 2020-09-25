<script context="module">
  export async function preload(page, { token }) {
    if (token) return this.redirect(302, "/workspace");
  }
</script>

<style>
  .Home {
    box-sizing: border-box;
    margin: 2em auto;
    padding: 0 2em;
    display: grid;
    grid-template-columns: minmax(auto, 1024px);
    justify-content: center;
    align-items: center;
  }
  .Home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .Home-info {
    text-align: left;
  }
  .Home-image figure {
    padding: 0;
    margin: 3em 0;
  }
  .Home-image img {
    max-width: 300px;
  }
  .Home-signup {
    display: flex;
    margin-bottom: 2.5em;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 48px;
    border: #ff7f51 solid 1px;
    border-radius: 24px;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.2em;
    background-color: #ff7f51;
  }
  h1 {
    text-align: center;
    font-size: 1.5em;
    color: #fff;
  }
  p {
    color: rgba(255, 255, 255, 0.842);
    margin-bottom: 2em;
  }
  @media (min-width: 1025px) {
    .Home {
      min-height: 80vh;
      margin: 0;
    }
    .Home-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 104px;
      justify-content: space-between;
    }
  }
  @media (min-width: 480px) {
    .Home-signup {
      width: 50%;
    }
    .Home-image img {
      max-width: 420px;
    }
    h1 {
      text-align: left;
      font-size: 2em;
    }
    p {
      font-size: 20px;
    }
  }
</style>

<svelte:head>
  <title>Boom Todo</title>
</svelte:head>

<div class="Home">
  <div class="Home-container">
    <div class="Home-image">
      <figure><img src="home-image.png" alt="Home" /></figure>
    </div>
    <div class="Home-info">
      <h1><strong>Set your Goals</strong></h1>
      <p>
        Improve your productivity, and don't forget the important things for
        you. Get one of the very easy and fastests ways to organize your live.
      </p>
      <a class="Home-signup" href="/signup" rel="prefetch"> Get now </a>
    </div>
  </div>
</div>
