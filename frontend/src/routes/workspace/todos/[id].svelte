<script context="module">
  export async function preload({ params }, session) {
    const { id } = params;
    const { token } = session;
    return { id, token };
  }
</script>

<script>
  export let id;
  export let token;

  import SubmitButton from "../../../components/SubmitButton.svelte";

  import swal from "sweetalert";
  import { goto } from "@sapper/app";
  import { todos } from "../../../context";
  import { fetchApi } from "../../../utils";

  let warningMessage = "";
  const allTodos = [...$todos];
  const [todo] = allTodos.filter((t) => Number(t.id) === Number(id));
  const dateTimeInfo = todo.dateTodo.split("T");
  let date = dateTimeInfo[0];
  let time = dateTimeInfo[1].split(".")[0];

  const saveTodo = async () => {
    const dateTodo = new Date(`${date}T${time}`);
    todo.dateTodo = dateTodo;

    // To no send metadata;
    delete todo.id;
    delete todo.createdAt;
    delete todo.updatedAt;
    delete todo.postedBy_id;

    const { status, data } = await fetchApi.put(`/todos/${id}`, todo, token);

    if (status === 400) return (warningMessage = data.detail);
    if (status === 401) {
      await fetch("/api/logout.json", { method: "POST" });
      window.location.href = "/login";
    }
    await goto("/workspace");
  };

  const deleteTodo = async () => {
    const secureDelete = await swal({
      title: "Are you sure?",
      text: "This action is permanent",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!secureDelete) return "";

    const { status } = await fetchApi.delete(`/todos/${id}`, {}, token);

    if (status === 401) {
      await fetch("/api/logout.json", { method: "POST" });
      window.location.href = "/login";
    }
    await goto("/workspace");
  };
</script>

<style>
  .UpdateTodo-container {
    min-height: calc(100vh - 194px);
    padding: 2em 1em;
    display: grid;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    border: 2px solid white;
    border-top-left-radius: 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: white;
  }
  .UpdateTodo-warning {
    font-size: 20px;
    font-weight: 600;
    color: #ebbe55;
    text-align: center;
  }
  .UpdateTodo-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .UpdatetTodo-form__principal {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .UpdatetTodo-form__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
  }
  .divSection {
    width: 50%;
    height: 3px;
    margin: 0 0 0 1.5em;
    display: flex;
    align-self: baseline;
    background-color: #ff7f51;
  }
  .UpdateTodo-info__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input,
  textarea,
  select {
    width: 90%;
    height: 50px;
    margin-bottom: 1em;
    border-left: 0px;
    border-right: 0px;
    border-top: 0px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.363);
    outline: none;
    background-color: transparent;
    color: #000;
    font-size: 20px;
  }
  ::placeholder {
    color: #000;
    font-size: 20px;
  }
  input:focus {
    outline: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #000;
  }
  label {
    padding: 0 0 20px 0;
    font-size: 20px;
    color: #000;
  }
  #title {
    font-size: 32px;
    text-align: center;
  }
  #title::placeholder {
    font-size: 32px;
  }
  #content {
    min-height: 3em;
  }
  #isUrgent {
    width: 20px;
    border: 1px solid #ff7f51;
  }
  .DeleteContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .DeleteButton {
    width: 50px;
    height: 24px;
    padding: 0.3em;
    margin-top: 0.5em;
    align-self: center;
    outline: none;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .DeleteButton i {
    font-size: 20px;
    color: #000;
  }
  @media (min-width: 480px) {
    .UpdateTodo-container {
      min-height: calc(100vh - 210px);
    }
  }
</style>

<svelte:head>
  <title>Todo: {todo.id}</title>
</svelte:head>

<div class="TodoPage">
  <div class="UpdateTodo-container">
    <form class="UpdateTodo-form" on:submit|preventDefault={saveTodo}>
      <span class="UpdateTodo-warning">{warningMessage}</span>
      <div class="UpdatetTodo-form__principal">
        <label for="title" />
        <input
          type="text"
          id="title"
          placeholder="Update Todo..."
          bind:value={todo.title} />
        <label for="content" />
        <textarea
          type="text"
          id="content"
          placeholder="Save the world..."
          bind:value={todo.content} />
        <div class="divSection" />
      </div>
      <div class="UpdatetTodo-form__info">
        <div class="UpdateTodo-info__container">
          <label for="date" />
          <input type="date" id="date" bind:value={date} />
        </div>
        <div class="UpdateTodo-info__container">
          <label for="time" />
          <input type="time" id="time" bind:value={time} />
        </div>
        <div class="UpdateTodo-info__container">
          <label for="tag" />
          <select id="tag" bind:value={todo.tag}>
            <option value="" disabled selected hidden>Tag...</option>
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="home">home</option>
          </select>
        </div>
        <div class="UpdateTodo-info__container">
          <label for="isUrgent">Is urgent </label>
          <input type="checkbox" id="isUrgent" bind:checked={todo.isUrgent} />
        </div>
      </div>
      <SubmitButton text="Save" />
    </form>
    <div class="DeleteContainer">
      <button on:click={deleteTodo} class="DeleteButton" type="submit">
        <i class="fas fa-trash-alt delete" />
      </button>
    </div>
  </div>
</div>
