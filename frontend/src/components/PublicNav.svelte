<script>
  export let sessionActive;
  export let segment;
  import Logo from "./Logo.svelte";
</script>

<style>
  nav {
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    background-color: #fff;
  }
  .Nav-logo {
    margin: 0;
    padding: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  ul::after {
    content: "";
    display: block;
    clear: both;
  }
  li {
    display: block;
    float: left;
  }
  [aria-current] {
    position: relative;
    display: inline-block;
  }
  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: #ff7f51;
    display: block;
    bottom: -1px;
  }
  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

{#if !sessionActive}
  <nav class="Nav">
    <div class="Nav-logo">
      <Logo />
    </div>
    <ul>
      <li>
        <a
          aria-current={segment === undefined ? 'page' : undefined}
          href=".">Home</a>
      </li>
      <li>
        <a
          aria-current={segment === 'about' ? 'page' : undefined}
          href="about">About</a>
      </li>

      <li>
        <a
          rel="prefetch"
          aria-current={segment === 'login' ? 'page' : undefined}
          href="login"><strong>Login</strong></a>
      </li>
    </ul>
  </nav>
{/if}
