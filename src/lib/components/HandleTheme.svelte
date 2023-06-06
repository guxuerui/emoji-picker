<script lang="ts">
  import ToggleTheme from "$lib/components/ToggleTheme.svelte";
</script>

<div class="mb-6">
  <ToggleTheme on:toggleTheme />
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
