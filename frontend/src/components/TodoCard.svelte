<script>
  export let todo;
  export let token;

  import { fetchApi } from "../utils";
  import { updateTodo } from "../context";

  const getPrettyDate = (dateString) => {
    const allDate = String(new Date(dateString));
    return allDate.split(" ").slice(0, 3).join(" ");
  };

  const selectIcon = (tag) => {
    if (tag === "work") return "fas fa-briefcase";
    if (tag === "personal") return "fas fa-user-check";
    if (tag === "home") return "fas fa-laptop-house";
  };

  const toggleCompleted = async (id, status) => {
    todo.completed = status;
    updateTodo(id, todo);
    await fetchApi.put(`/todos/${id}`, { completed: status }, token);
  };
</script>

<style>
  .TodoCard {
    box-sizing: border-box;
    margin: 0 0 0.5em 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .TodoCard-container {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .Todo-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Todo-icon__container {
    padding: 0.65em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff0e5;
    border-radius: 10px;
  }
  .Todo-icon i {
    font-size: 28px;
    color: #ff7f51;
  }
  .Todo-info {
    box-sizing: border-box;
    padding: 0.2em 0.5em;
    text-decoration: none;
  }
  .Todo-info h3 {
    margin: 0 0 5px 0;
    font-weight: 600;
    font-size: 20px;
  }
  .Todo-info p {
    margin: 0;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }
  .Todo-info i {
    display: inline;
    color: rgba(252, 14, 14, 0.945);
    margin-left: 5px;
  }

  /* Checkbox */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .container input:checked ~ .checkmark {
    background-color: #46a750;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  .container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .completed {
    background-color: rgba(0, 0, 0, 0.03);
  }
</style>

<div class="TodoCard">
  <div class="TodoCard-container {todo.completed ? 'completed' : ''}">
    <div class="Todo-icon">
      <div class="Todo-icon__container"><i class={selectIcon(todo.tag)} /></div>
    </div>
    <a class="Todo-info" href="/workspace/todos/{todo.id}">
      <span>
        <h3>{todo.title}</h3>
        {#if todo.isUrgent}<i class="fas fa-bolt" />{/if}
      </span>
      <p>{getPrettyDate(todo.dateTodo)}</p>
    </a>
    <div class="Todo-completed">
      <label class="container">
        <input
          type="checkbox"
          bind:checked={todo.completed}
          on:change={() => toggleCompleted(todo.id, todo.completed)} />
        <span class="checkmark" />
      </label>
    </div>
  </div>
</div>
