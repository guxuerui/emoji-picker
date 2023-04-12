<script lang="ts">
  import { onMount } from "svelte";
  import Line from '$lib/components/Line.svelte';
  import type { IEmoji } from "$lib/types";
  import { currentTheme, toggleTheme, loadTheme } from "$lib/utils/handleTheme";

  async function fetchEmojis() {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
    );
    return response.json();
  }

  let pageTitle = "Search Github Emojis";
  let emojisData: IEmoji[] = [];
  let searchedEmojis: IEmoji[] = [];
  let categoriesData: any[] = [];
  let searchValue = "";
  let activeIcon = 0;
  let lightActiveIcon = 0;
  let currentEmoji: IEmoji = {
    name: '',
    icon: '',
    keywords: [],
    title: '',
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
    console.log("emoji: ", emoji);
    currentEmoji = emoji;
    showCurrentEmoji = true;
  }

  onMount(async () => {
    loadTheme();

    // handle emojis data
    const data = await fetchEmojis();
    emojisData = Object.entries(data.emojis as any[]).map(([key, value]) => {
      return {
        name: key,
        icon: value?.skins[0].native,
        keywords: value?.keywords,
        title: value?.name,
      };
    });

    const emojisCategories: any[] = data.categories;
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
      categoriesData = [
        ...categoriesData,
        ...[
          {
            id: emojisCategories[i].id,
            emojis: handleEmojiCaegories(emojisCategories[i]),
          },
        ],
      ];
    }

    searchedEmojis = categoriesData[0].emojis;
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content="search and pick github emoji" />
</svelte:head>

<section>
  <h1 class="my-0 text-2.5rem dark:text-gray-200 page-title">{pageTitle}</h1>
  <div class="my-3">
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
  <input
    type="text"
    on:keyup={searchEmojis(searchValue)}
    bind:value={searchValue}
    class="bg-gray-50 border-0 ring-0 text-gray-900 text-sm rounded-lg px-4 py-2 w-1/2 dark:bg-gray/10 dark:placeholder-gray-400 dark:text-white"
    my-4
    placeholder="search emoji..."
  />
  <div bg-white dark:bg-black rounded-2xl pt-4>
    {#if categoriesData.length}
      <div pl-4 flex="~ gap-x-4">
        {#each categoriesData as category, index}
          <button
            on:click={() => handleClickCategory(index)}
            class:!bg-gray-200={lightActiveIcon === index}
            class:dark:!bg-gray-700={activeIcon === index}
            class="pa-0 border-0 w-6 h-6 bg-transparent scale-150 rounded-50 transition-colors"
            hover="cursor-pointer bg-gray-200"
            dark:hover="bg-gray-700"
          >
            <span class="relative left-0.5 bottom-0.38">
              {category.emojis[0].icon}
            </span>
          </button>
        {/each}
      </div>
    {/if}

    <Line />

    {#if searchedEmojis.length}
      <ul
        pa-0 mt-2 mx-auto
        w-sm h-xs
        overflow-y-auto
      >
        {#each searchedEmojis as emoji}
          <li
            class="list-none w-8 h-8 rounded-50 transition-colors float-left text-center"
            hover="cursor-pointer bg-gray-200"
            dark:hover="bg-gray-700"
            on:mouseenter={handleMouseOver(emoji)}
            on:mouseleave={() => showCurrentEmoji = false}
          >
            <div class="mt-0.2rem text-1.5rem">{emoji.icon}</div>
          </li>
        {/each}
      </ul>
    {:else}
      <div
        text-gray-700
        dark:text-gray-200
        p="l-0 t-0 r-1 b-1"
        m="y-3 x-2"
        class="w-xs h-xs flex justify-center items-center"
      >
        No results...
      </div>
    {/if}

    <Line />

    <div text-gray-700 dark:text-gray-400 min-h-3rem pl-4 w-sm overflow-x-hidden class="flex items-center justify-between">
      {#if showCurrentEmoji}
        <div class="flex">
          <div class="text-2xl">{currentEmoji.icon}</div>
          <div class="px-2">
            <div>{currentEmoji.title}</div>
            <div>{currentEmoji.name}</div>
          </div>
        </div>
      {:else}
        Click to pick a emoji...
      {/if}
    </div>
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
    background-image: linear-gradient(to right, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  }
  section ul::-webkit-scrollbar {
    display: none;
  }
</style>
