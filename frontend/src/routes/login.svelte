<script context="module">
  export async function preload(page, session) {
    const { token } = session;
    if (token) {
      // If the session is active login is not needed.
      return this.redirect(302, "/workspace");
    }
  }
</script>

<script>
  import SubmitButton from "../components/SubmitButton.svelte";
  import WarningAuthMessage from "../components/WarningAuthMessage.svelte";

  import axios from "axios";
  import { user } from "../context";

  let email = "";
  let password = "";

  let emailWarning = "";
  let passwordWarning = "";
  let credentialsWarning = "";

  const handleLogin = async () => {
    emailWarning = passwordWarning = "";
    if (!email) return (emailWarning = "Your email is needed");
    if (!password) return (passwordWarning = "Password is needed");

    const body = { email, password };
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/login.json",
        data: body,
      });
      user.set(data.user);
      window.location.href = "/workspace";
    } catch (error) {
      if (error.response.status === 401) {
        return (credentialsWarning = "Invalid credentials");
      }
      if (error.response.status === 400) {
        return (credentialsWarning = "Invalid inputs");
      }
    }
  };
</script>

<style>
  .Login {
    min-height: 90vh;
    margin: 1em;
    display: grid;
    grid-template-columns: minmax(auto, 560px);
    justify-content: center;
    align-items: center;
  }

  .Login-container {
    padding: 60px 0px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    border-radius: 40px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    color: white;
  }
  .Login-title h1 {
    margin-bottom: 1.5em;
    text-align: center;
    font-family: "Montserrat Subrayada", sans-serif;
  }
  .Login-Form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Login-Form input {
    width: 80%;
    height: 50px;
    margin-bottom: 2em;
    border-left: 0px;
    border-right: 0px;
    border-top: 0px;
    border-bottom: 2px solid white;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 16px;
  }
  ::placeholder {
    color: white;
    font-size: 16px;
  }
  .Login-Form input:focus {
    outline: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: white;
  }
  .Login-signup {
    margin: 10px 50px;
    text-align: center;
  }
</style>

<svelte:head>
  <title>Login - BoomTodo</title>
</svelte:head>

<div class="Login">
  <div class="Login-container">
    <div class="Login-title">
      <h1>Login</h1>
    </div>
    <WarningAuthMessage message={credentialsWarning} />
    <form class="Login-Form" on:submit|preventDefault={handleLogin}>
      <label for="email" />
      <WarningAuthMessage message={emailWarning} />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        bind:value={email} />
      <label for="password" />
      <WarningAuthMessage message={passwordWarning} />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        bind:value={password} />
      <SubmitButton text="Submit" />
    </form>
    <span class="Login-signup">Are you want to <a href="/signup" rel="prefetch"> Create
        an account?</a></span>
  </div>
</div>
