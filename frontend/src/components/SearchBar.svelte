<script>
  import { todos, filterTodos } from "../context";

  let searchString = "";
  let searchMessage = "Find...";

  const findTodos = () => {
    if (!searchString) {
      return (searchMessage = "Input a valid search");
    }

    const allTodos = [...$todos];

    const listStrings = searchString.split(" ");
    const listStringsLowerCase = listStrings.map((str) => str.toLowerCase());

    const regexExpression = listStringsLowerCase.join("|");
    const filterExp = new RegExp(regexExpression);

    const _filterTodos = allTodos.filter((todo) => {
      const str = todo.title.toLowerCase();
      const tag = todo.tag;
      return filterExp.test(str) || filterExp.test(tag);
    });

    filterTodos.set(_filterTodos);
  };
</script>

<style>
  .SearchBar {
    width: 100%;
    margin: 1em 0;
    display: flex;
    justify-content: center;
  }
  .SearchBar-container {
    width: 100%;
    height: 48px;
    padding: 0 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    background-color: #2b49c3;
  }
  .SearchBar form {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .SearchBar input {
    border: none;
    outline: none;
    color: #fff;
    font-size: 20px;
    background-color: #2b49c3;
  }
  ::placeholder {
    color: #fff;
    font-size: 16px;
  }
  .SearchBar button {
    padding: 0.5em;
    outline: none;
    background-color: transparent;
    border: transparent;
  }
  .SearchBar-icon {
    color: rgba(255, 255, 255, 0.707);
  }
</style>

<div class="SearchBar">
  <div class="SearchBar-container">
    <form on:submit|preventDefault={findTodos}>
      <label for="search" />
      <input
        type="text"
        id="search"
        placeholder={searchMessage}
        bind:value={searchString} />
      <button class="SearchBar-icon" type="submit">Lupa</button>
    </form>
  </div>
</div>
