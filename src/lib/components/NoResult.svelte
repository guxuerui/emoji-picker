<script lang="ts">
  import { fade } from "svelte/transition";
  import { t } from "$lib/translations/i18n";
</script>

<div
  in:fade
  text-gray-700
  dark:text-gray-200
  pa-0 mt-2 mx-auto
  class="w-xs h-xs flex justify-center items-center"
>
  {$t("homepage.nodata")}
</div>