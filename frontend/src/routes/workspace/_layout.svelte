<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    return { sessionActive: token };
  }
</script>

<script>
  export let sessionActive;
  export let segment;
  import Nav from "../../components/Nav.svelte";
</script>

<style>
  .TodoBoom {
    margin: 0;
    padding: 0;
  }
  .TodoBoom-content {
    margin: 0;
    padding: 0;
  }
  .TodoBoom-nav {
    position: fixed;
    z-index: 1000;
    bottom: 0;
  }
</style>

<div class="TodoBoom">
  <div class="TodoBoom-content">
    <slot />
  </div>
  <div class="TodoBoom-nav">
    <Nav {segment} {sessionActive} />
  </div>
</div>
