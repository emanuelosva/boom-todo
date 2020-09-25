<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    if (!token) return this.redirect(302, "/login");

    return { token };
  }
</script>

<script>
  export let token;

  import SubmitButton from "../../components/SubmitButton.svelte";

  import swal from "sweetalert";
  import { user } from "../../context";
  import { fetchApi, logout } from "../../utils";

  let updateMessage = "";

  const updateUser = async () => {
    const { id, name, email } = $user;
    if (!name || !email) return (updateMessage = "Complete both fields");

    const body = { name, email };
    const { status } = await fetchApi.put(`/users/${id}`, body, token);
    if (status === 401) {
      await logout();
    }
    updateMessage = "Data updated.";
  };

  const getAboutInfo = () => {
    const info = `This app is part of a challenge of my mentor
    in Platzi Master Program. I had to build a todo list but with 
    scalable and powerfull backend code base and only in one week.
     This is the result!`;
    swal({
      title: "About",
      text: info,
      icon: "success",
      button: "🚀",
    });
  };
</script>

<style>
  .Profile-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Profile-title {
    margin: 1em 2em;
    align-self: baseline;
  }
  .Profile-title h2 {
    color: #fff;
    font-weight: 700;
    font-size: 24px;
  }
  .Profile-settings {
    position: fixed;
    bottom: 56px;
    top: 160px;
    box-sizing: border-box;
    max-width: 680px;
    width: 100%;
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    border-top-left-radius: 40px;
  }
  .Settings-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .Settings-info h2 {
    margin-bottom: 1em;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
  }
  .Settings-info__user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Settings-info__user input {
    width: 90%;
    height: 40px;
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
  .Settings-tab {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    cursor: pointer;
  }
  .Settings-tab .Icon-container {
    width: 3em;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff0e5;
    border-radius: 15px;
  }
  .Settings-tab i {
    font-size: 24px;
    color: #ff7f51;
  }
  .Settings-tab h3 {
    font-weight: 600;
  }
  .Settings-tab h5 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
  }
  .divDivision {
    width: 100%;
    height: 2px;
    margin: 1em 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .updateMessage {
    font-size: 20px;
    font-weight: 600;
    color: #ebbe55;
  }
  @media (min-width: 480px) {
    .Settings-tab {
      grid-template-columns: 1fr 5fr;
    }
    .Settings-tab h3 {
      font-size: 28px;
    }
    .Settings-tab h5 {
      font-size: 20px;
    }
  }
  @media (max-width: 374px) {
    .Profile-settings {
      top: 120px;
    }
    .Settings-tab {
      margin-top: 10px;
    }
  }
</style>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="Profile">
  <div class="Profile-container">
    <div class="Profile-title">
      <h2>Profile</h2>
      <span class="updateMessage">{updateMessage}</span>
    </div>
    <div class="Profile-settings">
      <div class="Settings-info">
        <h2>Update you</h2>
        <form class="Settings-info__user" on:submit|preventDefault={updateUser}>
          <label for="name" />
          <input
            type="text"
            id="name"
            placeholder="My name"
            bind:value={$user.name} />
          <label for="email" />
          <input
            type="email"
            id="email"
            placeholder="boom@todo.com"
            bind:value={$user.email} />
          <SubmitButton text="Save" />
        </form>
      </div>
      <div class="Settings-options">
        <div class="Settings-tab" on:click={getAboutInfo}>
          <div class="Icon-container"><i class="fas fa-info-circle" /></div>
          <div class="Info-container">
            <h3>About</h3>
            <h5>History, Terms & conditions</h5>
          </div>
        </div>
        <div class="divDivision" />
        <div class="Settings-tab" on:click={logout}>
          <div class="Icon-container"><i class="fas fa-sign-out-alt" /></div>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  </div>
</div>
