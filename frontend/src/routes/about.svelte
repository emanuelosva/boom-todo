<script>
</script>

<style>
  .About {
    box-sizing: border-box;
    margin: 0;
    padding: 1em;
    display: grid;
    grid-template-columns: minmax(auto, 680px);
    justify-content: center;
    align-items: center;
  }
  .About-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .About-image {
    margin: 0.5em 0 1em 0;
  }
  .About-image img {
    width: 240px;
  }
  .About-message {
    color: #fff;
  }
  .About-message h1 {
    font-weight: 700;
  }
  .About-message p {
    font-size: 20px;
    font-weight: 550;
    color: rgba(255, 248, 248, 0.9);
  }
  a,
  li {
    font-size: 20px;
    text-decoration: underline;
    text-decoration-color: #ff7f51;
    text-decoration-thickness: 2px;
  }
  li {
    margin-bottom: 1ems;
  }
</style>

<svelte:head>
  <title>About - BoomTodo</title>
</svelte:head>

<div class="About">
  <div class="About-container">
    <div class="About-image"><img src="about-image.png" alt="Info" /></div>
    <div class="About-message">
      <h1>About</h1>
      <p>
        This app is part of a challenge of my mentor in Platzi Master Program. I
        had to build a todo list but with scalable and powerfull backend code
        base and only in one week. This is the result!
      </p>
      <h3>- Some useful links</h3>
      <ul>
        <li>
          <a
            href="https://github.com/emanuelosva/boom-todo/tree/master/frontend"
            target="_blank"
            rel="noopener noreferrer">Frontend</a>
        </li>
        <li>
          <a
            href="https://github.com/emanuelosva/boom-todo/tree/master/server"
            target="_blank"
            rel="noopener noreferrer">Backend</a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/emanuel-osorio-462b2218a/"
            target="_blank"
            rel="noopener noreferrer">Linkedin</a>
        </li>
        <li>
          <a
            href="https://platzi.com/blog/que-es-platzi-master/"
            target="_blank"
            rel="noopener noreferrer">Platzi Master</a>
        </li>
      </ul>
      <p>
        I'm not a disegner, then, the almost all complete app design was
        inspired in the public work of Fikri Ruslandi. My thanks to Fikri for
        this public work. You can see his: <a
          href="https://dribbble.com/fikriruslandi"
          target="_blank"
          rel="noopener noreferrer">Dribbble</a>
      </p>
    </div>
  </div>
</div>
