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

  import { user, todos } from "../../context";
  user.set(userData);
  todos.set(todosList);
</script>

<style>
</style>

<div class="Workspace">
  <div class="Workspace-container">
    <div class="Worskpace-info">
      <h2>Hello, <strong>{$user.name}</strong></h2>
    </div>
    <div class="Workspace-todos">
      <div class="Todos-select">
        <p>Today</p>
      </div>
      <div class="Todos-list">
        {#each $todos as todo}
          <div class="Todo-container">{todo.title}</div>
        {:else}Not todos{/each}
      </div>
    </div>
  </div>
</div>
