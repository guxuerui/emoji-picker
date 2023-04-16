<script lang="ts">
  import { onMount } from "svelte"
  import { currentTheme, toggleTheme, loadTheme } from "$lib/utils/handleTheme";

  onMount(() => {
    loadTheme()
  })
</script>
<div class="mb-4">
  <button
    class="border-0 bg-transparent icon-btn px-0 !outline-none c-gray-600 hover:c-black dark:c-gray-400 dark:hover:c-white"
    on:click={toggleTheme}
  >
    {#if currentTheme === "light" || currentTheme === "auto"}
      <div class="scale-180" i-carbon-sun />
    {:else}
      <div class="scale-180" i-carbon-moon />
    {/if}
  </button>
  <a
    class="ml-3 c-gray-600 dark:c-gray-400"
    hover="c-black"
    dark:hover="c-white"
    rel="noreferrer"
    href="https://github.com/guxuerui/emoji-picker"
    target="_blank"
    title="GitHub"
  >
    <span class="scale-160" i-carbon-logo-github />
  </a>
</div>