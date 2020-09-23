<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    return { sessionActive: token };
  }
</script>

<script>
  export let sessionActive;
  export let segment;

  import PublicNav from "../components/PublicNav.svelte";
</script>

<style>
  main {
    position: relative;
    box-sizing: border-box;
    max-width: 56em;
    margin: 2em auto;
    padding: 0;
  }
</style>

<PublicNav {segment} {sessionActive} />

<main>
  <slot />
</main>
