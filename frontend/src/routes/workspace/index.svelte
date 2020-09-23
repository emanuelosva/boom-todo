<script context="module">
  import { fetchApi } from "../../utils";

  export async function preload(page, session) {
    const { token } = session;
    if (!token) return this.redirect(302, "/login");

    // Get user data
    const { data: userResponse } = await fetchApi.get("/users/current", token);
    const user = userResponse.data;
    user.password = "";

    // Get all todos
    const { data: todosResponse } = await fetchApi.get("/todos/all", token);
    const todosList = todosResponse.data;

    return { userData: user, todosList };
  }
</script>

<script>
  export let userData;
  export let todosList;

  import SearchBar from "../../components/SearchBar.svelte";

  import { user, todos, filterTodos } from "../../context";

  user.set(userData);
  filterTodos.set([]); // Initialice as void array
  todos.set(todosList);
</script>

<style>
  .Workspace-container {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .Worskpace-info {
    padding: 0.5em 2em 1em 2em;
  }
  .Workspace-todos {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 56px;
    top: 220px;
    padding: 2em;
    border-top-left-radius: 40px;
    background-color: #fff;
  }
</style>

<div class="Workspace">
  <div class="Workspace-container">
    <div class="Worskpace-info">
      <h2>Hello, <strong>{$user.name}</strong></h2>
      <SearchBar />
    </div>
    <div class="Workspace-todos">
      <div class="Todos-select">
        <p>Today</p>
      </div>
      <div class="Todos-list">
        {#if $filterTodos.length}
          {#each $filterTodos as todo}
            <div class="Todo-container">{todo.title}</div>
          {/each}
        {:else}
          {#each $todos as todo}
            <div class="Todo-container">{todo.title}</div>
          {:else}Not todos{/each}
        {/if}
      </div>
    </div>
  </div>
</div>
