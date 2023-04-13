<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "svoast";
  import Line from "$lib/components/Line.svelte";
  import PreviewEmoji from "$lib/components/PreviewEmoji.svelte";
  import { tooltip } from "svooltip";
  import "svooltip/styles.css";
  import type { IEmoji } from "$lib/types";
  import type { PageData } from "./$types";
  import { currentTheme, toggleTheme, loadTheme } from "$lib/utils/handleTheme";
  import { t, locale, locales } from "$lib/translations/i18n";

  export let data: PageData;

  let emojisData: IEmoji[] = [];
  let searchedEmojis: IEmoji[] = [];
  let categoriesData: any[] = [];
  let searchValue = "";
  let activeIcon = 0;
  let lightActiveIcon = 0;
  let currentEmoji: IEmoji = {
    name: "",
    icon: "",
    keywords: [],
    title: "",
  };
  let showCurrentEmoji = false;

  function searchEmojis(searchValue: string) {
    if (!searchValue) {
      activeIcon = 0;
      lightActiveIcon = 0;
      searchedEmojis = categoriesData[0].emojis;
      return;
    }

    activeIcon = 100;
    lightActiveIcon = 100;
    searchedEmojis = emojisData.filter(
      (emoji) =>
        emoji.keywords.includes(searchValue) || emoji.name.includes(searchValue)
    );
  }

  function handleClickCategory(index: number) {
    activeIcon = index;
    lightActiveIcon = index;
    searchedEmojis = categoriesData[index].emojis;
  }

  function handleMouseOver(emoji: IEmoji) {
    currentEmoji = emoji;
    showCurrentEmoji = true;
  }

  async function handlePickEmoji(emoji: IEmoji) {
    try {
      navigator?.canShare
        ? await navigator.share({ title: emoji.title, text: emoji.name })
        : await navigator.clipboard.writeText(`:${emoji.name}:`);

      toast.success("Emoji shortcode copied to clipboard!");
    } catch (error) {
      toast.error(error.toString());
    }
  }

  onMount(async () => {
    loadTheme();

    // handle emojis data
    const fetchData = data.jsonData;
    emojisData = Object.entries(fetchData.emojis as any[]).map(
      ([key, value]) => {
        return {
          name: key,
          icon: value?.skins[0].native,
          keywords: value?.keywords,
          title: value?.name,
        };
      }
    );

    const emojisCategories: any[] = fetchData.categories;
    function handleEmojiCaegories(category: any) {
      let currCategoriesData: any[] = [];
      for (let i = 0; i < category.emojis.length; i++) {
        const currEmoji = emojisData.filter(
          (emoji) => emoji.name === category.emojis[i]
        );
        currCategoriesData = [...currCategoriesData, ...currEmoji];
      }
      return currCategoriesData;
    }

    for (let i = 0; i < emojisCategories.length; i++) {
      let currentEmojiId = "";
      if (emojisCategories[i].id === "people") {
        currentEmojiId = "Smileys & People";
      } else if (emojisCategories[i].id === "nature") {
        currentEmojiId = "Animals & Nature";
      } else {
        currentEmojiId =
          emojisCategories[i].id.charAt(0).toUpperCase() +
          emojisCategories[i].id.slice(1);
      }

      categoriesData = [
        ...categoriesData,
        ...[
          {
            id: currentEmojiId,
            emojis: handleEmojiCaegories(emojisCategories[i]),
          },
        ],
      ];
    }

    searchedEmojis = categoriesData[0].emojis;
  });
</script>

<svelte:head>
  <title>{$t("homepage.title")}</title>
  <meta name="description" content="search and pick github emoji" />
</svelte:head>

<section>
  <h1 class="my-2 text-2.5rem dark:text-gray-200 page-title">
    {$t("homepage.title")}
  </h1>
  <div class="mt-2 mb-4 text-center">
    <button
      class="dark:text-white border border-blue-700 bg-transparent hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-2 py-1 mr-2 dark:border-blue-500 dark:hover:bg-blue-500 hover:text-white hover:cursor-pointer"
      transition
      class:active={$locale === "en"}
      on:click={() => ($locale = "en")}
    >
      English
    </button>

    <button
      bg="transparent"
      dark="text-white"
      dark:hover="border-red-500 bg-red-500"
      hover="text-white cursor-pointer bg-red-800"
      border="red-700 rounded-lg"
      text="sm font-medium"
      p="x-2 y-1"
      transition
      focus="outline-none"
      class:active={$locale === "cn"}
      on:click={() => ($locale = "cn")}
    >
      简体中文
    </button>
  </div>
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
  <div bg-white dark:bg-black rounded-2xl pt-4>
    {#if categoriesData.length}
      <div pl-2 flex="~ gap-x-2">
        {#each categoriesData as category, index}
          <button
            use:tooltip={{
              content: `<strong class="font-bold pa-2">${category.id}</strong>`,
              html: true,
            }}
            on:click={() => handleClickCategory(index)}
            class:!bg-gray-200={lightActiveIcon === index}
            class:dark:!bg-gray-700={activeIcon === index}
            class="pa-0 pt-0.2rem border-0 w-9 h-9 bg-transparent rounded-50 transition-colors text-center text-1.5rem"
            hover="cursor-pointer bg-gray-200"
            dark:hover="bg-gray-700"
          >
            {category.emojis[0].icon}
          </button>
        {/each}
      </div>
    {/if}

    <Line />
    <div text-center w-full>
      <input
        type="text"
        on:keyup={searchEmojis(searchValue)}
        bind:value={searchValue}
        class="bg-gray-200 border-0 ring-0 text-gray-900 text-sm rounded-xl px-4 py-2 mt-3 w-6/7 dark:bg-gray/30 dark:placeholder-gray-400 dark:text-white"
        placeholder={$t("homepage.search")}
      />
    </div>
    {#if searchedEmojis.length}
      <ul pa-0 mt-2 mx-auto w-sm h-xs overflow-y-auto>
        {#each searchedEmojis as emoji}
          <li
            class="list-none w-8 h-8 rounded-50 transition-colors float-left text-center"
            hover="cursor-pointer bg-gray-200"
            dark:hover="bg-gray-700"
            on:mouseenter={handleMouseOver(emoji)}
            on:mouseleave={() => (showCurrentEmoji = false)}
          >
            <button
              on:click={() => handlePickEmoji(emoji)}
              class="mt-0.1rem mx-auto pa-0 text-1.5rem bg-transparent border-0 hover:cursor-pointer"
            >
              {emoji.icon}
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <div
        text-gray-700
        dark:text-gray-200
        pa-0
        mx-auto
        class="w-xs h-xs flex justify-center items-center"
      >
        {$t("homepage.nodata")}
      </div>
    {/if}

    <Line />

    <PreviewEmoji {showCurrentEmoji} {currentEmoji} />
  </div>

  <div mt-4 text-gray-600 dark:text-gray-300>
    Made by
    <a
      border="0 b-1 dashed #aaa"
      hover:border="solid #000"
      dark:hover:border="solid #fff"
      class="page-title transition-colors"
      rel="noreferrer"
      href="https://www.guxuerui.cn"
      target="_blank"
      title="MyBlog"
    >
      guxuerui
    </a>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
  .page-title {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
      to right,
      #d16ba5,
      #c777b9,
      #ba83ca,
      #aa8fd8,
      #9a9ae1,
      #8aa7ec,
      #79b3f4,
      #69bff8,
      #52cffe,
      #41dfff,
      #46eefa,
      #5ffbf1
    );
  }
  section ul::-webkit-scrollbar {
    display: none;
  }
  .active {
    background-color: #d16ba5;
    color: #fff;
    border: none;
  }
</style>
