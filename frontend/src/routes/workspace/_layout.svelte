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
  import LogoStatic from "../../components/LogoStatic.svelte";
</script>

<style>
  .TodoBoom {
    margin: 0;
    padding: 0;
  }
  .TodoBoom-content {
    margin: 10px 0 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: minmax(auto, 680px);
    justify-content: center;
    align-items: center;
  }
  .TodoBoom-nav {
    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="TodoBoom">
  <LogoStatic />
  <div class="TodoBoom-content">
    <slot />
  </div>
  <div class="TodoBoom-nav">
    <Nav {segment} {sessionActive} />
  </div>
</div>
