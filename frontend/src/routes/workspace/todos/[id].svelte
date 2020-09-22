<script context="module">
  export async function preload({ params }) {
    const { id } = params;
    return { id };
  }
</script>

<script>
  export let id;
</script>

<style>
</style>

<div class="Login">Todo: {id}</div>
