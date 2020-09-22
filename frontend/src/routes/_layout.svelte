<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
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

<Nav {segment} />

<main>
  <slot />
</main>
