<script lang="ts">
  import { locale } from "$lib/translations/i18n";
</script>

<div class="mt-2 mb-4 text-center">
  <button
    bg="#199/50"
    dark="text-white"
    dark:hover="bg-#199"
    hover="text-white cursor-pointer bg-#199"
    border="0 #199 rounded-lg"
    text="sm font-medium"
    p="x-2 y-1"
    mr-2
    transition
    class:active={$locale === "en"}
    on:click={() => ($locale = "en")}
  >
    English
  </button>

  <button
    bg="#199/50"
    dark="text-white"
    dark:hover="bg-#199"
    hover="text-white cursor-pointer bg-#199"
    border="0 #199 rounded-lg"
    text="sm font-medium"
    p="x-2 y-1"
    transition
    class:active={$locale === "cn"}
    on:click={() => ($locale = "cn")}
  >
    简体中文
  </button>
</div>

<style>
  .active {
    background-color: #199;
    color: #fff;
    border-color: #199;
  }
</style>

