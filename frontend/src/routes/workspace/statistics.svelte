<script>
  import { todos } from "../../context";

  $: workTodos = $todos.filter((t) => t.tag === "work");
  $: personalTodos = $todos.filter((t) => t.tag === "personal");
  $: homeTodos = $todos.filter((t) => t.tag === "home");
  $: totalCompleted = $todos.filter((t) => t.completed).length;

  $: totalNumTodos = $todos.length;
  $: totalNumWorkTodos = workTodos.length;
  $: totalNumPersonTodos = personalTodos.length;
  $: totalNumHomeTodos = homeTodos.length;
</script>

<style>
  .Categories {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Categories-container {
    width: 100%;
    display: flex;
    margin: 1em 2em;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .Categories-title {
    width: 100%;
    margin-bottom: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
  }
  .Categories-title h2 {
    color: #fff;
    font-weight: 700;
  }
  .Categories-title p {
    margin: 10px 2px;
    color: #fff;
    font-weight: 400;
    font-size: 24px;
  }
  .Categories-cardList {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 16px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 12px 19px 1px rgba(0, 0, 0, 0.75);
  }
  .Categories-card {
    box-sizing: border-box;
    height: 28vh;
    padding: 1em;
    background-color: #fff;
  }
  .Icon-container {
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff0e5;
    border-radius: 15px;
  }
  .Categories-card i {
    color: #ff7f51;
    font-size: 32px;
  }
  .Categories-card h3 {
    margin: 10px 2px;
    font-size: 24px;
    font-weight: 600;
  }
  .Categories-card p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.7);
  }
  @media (min-width: 480px) {
    .Categories-title h2 {
      font-size: 32px;
    }
    .Categories-container {
      width: 100%;
      display: flex;
      margin: 1em 0;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }
    .Categories-card {
      padding: 2.5em;
    }
    .Icon-container {
      width: 5em;
      height: 5em;
      border-radius: 25px;
    }
    .Categories-card p {
      font-size: 24px;
      font-weight: 500;
    }
  }
</style>

<div class="Categories">
  <div class="Categories-container">
    <div class="Categories-title">
      <h2>Statistics</h2>
      <p>
        <i class="fas fa-bullseye" /> Completed: <strong>{totalCompleted}</strong>
      </p>
    </div>
    <div class="Categories-cardList">
      <div class="Categories-card">
        <div class="Icon-container"><i class="far fa-list-alt" /></div>
        <h3>All</h3>
        <p>{totalNumTodos} Todos</p>
      </div>
      <div class="Categories-card">
        <div class="Icon-container"><i class="fas fa-briefcase" /></div>
        <h3>Work</h3>
        <p>{totalNumWorkTodos} Todos</p>
      </div>
      <div class="Categories-card">
        <div class="Icon-container"><i class="fas fa-user-check" /></div>
        <h3>Personal</h3>
        <p>{totalNumPersonTodos} Todos</p>
      </div>
      <div class="Categories-card">
        <div class="Icon-container"><i class="fas fa-laptop-house" /></div>
        <h3>Home</h3>
        <p>{totalNumHomeTodos} Todos</p>
      </div>
    </div>
  </div>
</div>
