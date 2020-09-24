<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    return { token };
  }
</script>

<script>
  export let token;

  import SubmitButton from "../../components/SubmitButton.svelte";

  import { goto } from "@sapper/app";
  import { fetchApi } from "../../utils";

  let title = "";
  let content = "";
  let date = "";
  let time = "";
  let tag = "";
  let isUrgent = false;
  let warningMessage = "";

  $: completeData =
    Boolean(title) && Boolean(date) && Boolean(time) && Boolean(tag);

  const saveTodo = async () => {
    const dateTodo = new Date(`${date}T${time}`);
    if (!completeData) return (warningMessage = "Complete all inputs");
    warningMessage = "";

    const body = { title, content, dateTodo, tag, isUrgent };
    const { data, status } = await fetchApi.post("/todos", body, token);
    if (status === 400) {
      return (warningMessage = data.detail);
    }
    if (status === 401) {
      await fetch("/api/logout.json", { method: "POST" });
      window.location.href = "/login";
    }

    await goto("/workspace");
  };
</script>

<style>
  .NewTodo-container {
    min-height: calc(100vh - 190px);
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
  .NewTodo-warning {
    font-size: 20px;
    font-weight: 600;
    color: #ebbe55;
    text-align: center;
  }
  .NewTodo-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .NewtTodo-form__principal {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .NewtTodo-form__info {
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
  .NewTodo-info__container {
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
  @media (min-width: 480px) {
    .NewTodo-container {
      min-height: calc(100vh - 210px);
    }
  }
</style>

<svelte:head>
  <title>New Todo</title>
</svelte:head>

<div class="NewTodo">
  <div class="NewTodo-container">
    <form class="NewTodo-form" on:submit|preventDefault={saveTodo}>
      <span class="NewTodo-warning">{warningMessage}</span>
      <div class="NewtTodo-form__principal">
        <label for="title" />
        <input
          type="text"
          id="title"
          placeholder="New Todo..."
          bind:value={title} />
        <label for="content" />
        <textarea
          type="text"
          id="content"
          placeholder="Save the world..."
          bind:value={content} />
        <div class="divSection" />
      </div>
      <div class="NewtTodo-form__info">
        <div class="NewTodo-info__container">
          <label for="date" />
          <input type="date" id="date" bind:value={date} />
        </div>
        <div class="NewTodo-info__container">
          <label for="time" />
          <input type="time" id="time" bind:value={time} />
        </div>
        <div class="NewTodo-info__container">
          <label for="tag" />
          <select id="tag" bind:value={tag}>
            <option value="" disabled selected hidden>Tag...</option>
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="home">home</option>
          </select>
        </div>
        <div class="NewTodo-info__container">
          <label for="isUrgent">Is urgent </label>
          <input type="checkbox" id="isUrgent" bind:checked={isUrgent} />
        </div>
      </div>
      <SubmitButton text="Save" />
    </form>
  </div>
</div>
