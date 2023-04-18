<script lang="ts">
  import { currentTheme } from "$lib/utils/handleTheme";
</script>

<div class="mb-6">
  <button
    class="border-0 bg-transparent icon-btn px-0 !outline-none c-gray-600 hover:c-black dark:c-gray-400 dark:hover:c-white"
  >
    {#if $currentTheme === "light" || $currentTheme === "auto"}
      <button
        class="scale-180"
        i-carbon-sun
        hover="cursor-pointer"
        on:click={() => ($currentTheme = "dark")}
      />
    {:else}
      <button
        class="scale-180"
        i-carbon-moon
        hover="cursor-pointer"
        on:click={() => ($currentTheme = "light")}
      />
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
