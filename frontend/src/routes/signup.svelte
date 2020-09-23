<script>
  import SubmitButton from "../components/SubmitButton.svelte";
  import WarningAuthMessage from "../components/WarningAuthMessage.svelte";

  import axios from "axios";
  import { user } from "../context";

  let name = "";
  let email = "";
  let password = "";
  let passwordConfirm = "";

  let nameWarnig = "";
  let emailWarning = "";
  let passwordWarning = "";

  const strongPassword = (password) => {
    // At least one lower case, one upper case alphabetical character
    // & at leats one number
    // & must be contains six characters or longer
    const goodPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );
    return goodPassword.test(password);
  };

  const validEmail = (email) => {
    const goodEmail = /\S+@\S+\.\S+/;
    return goodEmail.test(email);
  };

  const handleSignup = async () => {
    nameWarnig = emailWarning = passwordWarning = "";
    if (!name) return (nameWarnig = "Your name is needed");
    if (!email) return (emailWarning = "Your email is needed");
    if (!password) return (passwordWarning = "Password is needed");

    if (!validEmail(email)) return (emailWarning = "Input a valid email");
    if (password !== passwordConfirm)
      return (passwordWarning = "Two passwords must be equals");
    if (!strongPassword(password)) {
      return (passwordWarning =
        "Password needs at least one upper case alphabetical, at lest one number and be equal or longer than 6 characters");
    }

    const body = { name, email, password };
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/signup.json",
        data: body,
      });
      user.set(data.user);
      window.location.href = "/workspace";
    } catch (error) {
      if (error.response.status === 409) {
        return (emailWarning = "This email already exists");
      }
    }
  };
</script>

<style>
  .Signup {
    min-height: 90vh;
    margin: 1em;
    display: grid;
    grid-template-columns: minmax(auto, 560px);
    justify-content: center;
    align-items: center;
  }

  .Signup-container {
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
  .Signup-title h1 {
    margin-bottom: 1.5em;
    text-align: center;
    font-family: "Montserrat Subrayada", sans-serif;
  }
  .Signup-Form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Signup-Form input {
    width: 80%;
    height: 50px;
    margin-bottom: 1em;
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
  .Signup-Form input:focus {
    outline: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: white;
  }
  .Signup-login {
    margin: 10px 50px;
    text-align: center;
  }
</style>

<div class="Signup">
  <div class="Signup-container">
    <div class="Signup-title">
      <h1>Signup</h1>
    </div>
    <form class="Signup-Form" on:submit|preventDefault={handleSignup}>
      <label for="name" />
      <WarningAuthMessage message={nameWarnig} />
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        bind:value={name} />
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
      <label for="passwordConfirm" />
      <input
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        placeholder="Confirm password"
        bind:value={passwordConfirm} />
      <SubmitButton text="Get started" />
    </form>
    <span class="Signup-login">Do you have an account?: <a href="/login" rel="prefetch">Login</a></span>
  </div>
</div>
