<script lang="ts">
  import { t } from "$lib/translations/i18n";
  import type { IEmoji } from "$lib/types/index";

  export let showCurrentEmoji = false;
  export let currentEmoji: IEmoji = {
    name: "",
    icon: "",
    keywords: [],
    title: "",
  };
</script>

<div
  text-gray-700
  dark:text-gray-400
  min-h-3rem
  pl-4
  w-sm
  overflow-x-hidden
  class="flex items-center justify-between"
>
  {#if showCurrentEmoji}
    <div class="flex">
      <div class="text-2xl">{currentEmoji.icon}</div>
      <div class="px-2">
        <div>{currentEmoji.title}</div>
        <div text-sm text-gray-500>:{currentEmoji.name}:</div>
      </div>
    </div>
  {:else}
    {$t("homepage.hint")}
  {/if}
</div>
