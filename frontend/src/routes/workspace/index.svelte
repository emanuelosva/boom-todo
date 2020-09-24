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

    return { userData: user, todosList, token };
  }
</script>

<script>
  export let userData;
  export let todosList;
  export let token;

  import SearchBar from "../../components/SearchBar.svelte";
  import TodoCard from "../../components/TodoCard.svelte";
  import NotTodosMessage from "../../components/NotTodosMessage.svelte";

  import { user, todos, filterTodos } from "../../context";

  // Actualize the state
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
  .Workspace-info {
    padding: 0.5em 2em 1em 2em;
  }
  .Workspace-info h2 {
    margin-bottom: 0.5em;
    color: #fff;
    font-size: 28px;
  }
  .Workspace-todos {
    box-sizing: border-box;
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(auto, 680px);
    justify-content: center;
    align-content: flex-start;
    padding: 0.5em 0em;
    border-top-left-radius: 48px;
    background-color: #fff;
  }
  .Todos-select {
    margin: 0 2em;
  }
  .Todos-select p {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 24px;
  }
  .Todos-list {
    margin: 0.5em 1em;
    display: flex;
    flex-direction: column;
  }
  .divSection {
    width: 20%;
    height: 3px;
    margin-bottom: 1.5em;
    background-color: #ff7f51;
  }
</style>

<svelte:head>
  <title>Boom Todo</title>
</svelte:head>

<div class="Workspace">
  <div class="Workspace-container">
    <div class="Workspace-info">
      <h2>Hello, <strong>{$user.name}</strong></h2>
      <SearchBar />
    </div>
    <div class="Workspace-todos">
      <div class="Todos-select">
        <p>My Todos</p>
        <div class="divSection" />
      </div>
      <div class="Todos-list">
        {#if $filterTodos.length}
          {#each $filterTodos as todo}
            <TodoCard {todo} {token} />
          {/each}
        {:else}
          {#each $todos as todo}
            <TodoCard {todo} {token} />
          {:else}
            <NotTodosMessage />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
