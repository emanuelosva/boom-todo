<script>
  export let sessionActive;
  export let segment;
</script>

<style>
  .Nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  nav {
    max-width: 680px;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: minmax(auto, 680px);
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    font-weight: 400;
    background-color: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  ul::after {
    content: "";
    display: block;
    clear: both;
  }
  li {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  [aria-current] {
    position: relative;
    display: inline-block;
  }
  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1.5em);
    height: 4px;
    background-color: #ff7f51;
    display: block;
    bottom: -1px;
  }
  a {
    width: 80%;
    text-align: center;
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

{#if sessionActive}
  <div class="Nav-container">
    <nav class="Nav">
      <ul>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === undefined ? 'page' : undefined}
            href="/workspace">Home</a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'categories' ? 'page' : undefined}
            href="/workspace/categories">Categories</a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'todos' ? 'page' : undefined}
            href="/workspace/todos/new">New</a>
        </li>
        <li>
          <a
            rel="prefetch"
            aria-current={segment === 'profile' ? 'page' : undefined}
            href="/workspace/profile">Profile</a>
        </li>
      </ul>
    </nav>
  </div>
{/if}
