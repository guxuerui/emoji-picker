<script lang="ts">
  import "uno.css";
  import "./styles.css";
  import { Toaster } from "svelte-french-toast";
</script>

<div class="app dark:bg-black/90">
  <main>
    <slot />
    <Toaster />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
