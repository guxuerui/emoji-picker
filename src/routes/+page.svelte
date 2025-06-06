<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import toast from "svelte-french-toast";
  import Line from "$lib/components/Line.svelte";
  import PreviewEmoji from "$lib/components/PreviewEmoji.svelte";
  import HandleLocale from "$lib/components/HandleLocale.svelte";
  import HandleTheme from "$lib/components/HandleTheme.svelte";
  import NoResult from "$lib/components/NoResult.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { tooltip } from "svooltip";
  import "svooltip/styles.css";
  import type { IEmoji, ISignature, ICategory } from "$lib/types";
  import type { PageData } from "./$types";
  import { t, locale } from "$lib/translations/i18n";
  import { clipboard } from "$lib/actions/clipboard";

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

  function handleEmojiCategories(category: any) {
    let currCategoriesData: any[] = [];
    for (let i = 0; i < category.emojis.length; i++) {
      const currEmoji = emojisData.filter(
        (emoji) => emoji.name === category.emojis[i]
      );
      currCategoriesData = [...currCategoriesData, ...currEmoji];
    }
    return currCategoriesData;
  }

  const categoryIdMap: ISignature = {
    people: "Smileys & People",
    nature: "Animals & Nature",
  };
  let currentEmojiId = "";

  $: currentTheme = ''
  function handleThemeChanged(event: CustomEvent<{ currentTheme: string }>) {
    currentTheme = event.detail.currentTheme
  }

  // toast style
  $: toastBgColor = currentTheme === "dark" ? "#333" : "#fff";
  $: toastTextColor = currentTheme === "dark" ? "#fff" : "#333";

  function handleClickEmoji() {
    toast($t("homepage.copyToast"), {
      icon: currentEmoji.icon,
      position: "bottom-center",
      duration: 2000,
      style: `border-radius: 10px; background: ${toastBgColor}; color: ${toastTextColor};`,
    });
  }

  onMount(async () => {
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

    const emojisCategories: ICategory[] = fetchData.categories;
    for (let i = 0; i < emojisCategories.length; i++) {
      currentEmojiId =
        categoryIdMap[emojisCategories[i].id] ||
        emojisCategories[i].id.charAt(0).toUpperCase() +
          emojisCategories[i].id.slice(1);

      categoriesData = [
        ...categoriesData,
        ...[
          {
            id: currentEmojiId,
            emojis: handleEmojiCategories(emojisCategories[i]),
          },
        ],
      ];
    }

    // init data
    searchedEmojis = categoriesData[0].emojis;
  });
</script>

<svelte:head>
  <title>{$t("homepage.title")}</title>
  <meta name="description" content="search and pick github emoji" />
</svelte:head>

<section>
  <h1
    class="my-2 text-2.5rem dark:text-gray-200 page-title"
    class:!text-2.05rem={$locale === "cn"}
  >
    {$t("homepage.title")}
  </h1>

  <HandleLocale />

  <HandleTheme on:toggleTheme={handleThemeChanged} />

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
        on:keyup={() => searchEmojis(searchValue)}
        bind:value={searchValue}
        p="x-4 y-2"
        mt-3
        text="sm gray-900"
        dark:text="white"
        border="0 rounded-xl"
        class="ring-0 w-6/7 bg-gray-200 dark:bg-gray/30 dark:placeholder-gray-400"
        placeholder={$t("homepage.search")}
      />
    </div>
    {#if searchedEmojis.length}
      <ul pa-0 mt-2 mx-auto w-sm h-xs overflow-y-auto in:fade>
        {#each searchedEmojis as emoji}
          <li
            class="list-none w-8 h-8 rounded-50 transition-colors float-left text-center"
            hover="bg-gray-200"
            dark:hover="bg-gray-700"
            on:mouseenter={handleMouseOver(emoji)}
            on:mouseleave={() => (showCurrentEmoji = false)}
          >
            <button
              use:clipboard={{
                value: `:${emoji.name}:`,
                fn: handleClickEmoji,
              }}
              class="mt-0.1rem mx-auto pa-0 text-1.5rem bg-transparent border-0 hover:cursor-pointer"
            >
              {emoji.icon}
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <NoResult />
    {/if}

    <Line />

    <PreviewEmoji {showCurrentEmoji} {currentEmoji} />
  </div>

  <Footer />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
  section ul::-webkit-scrollbar {
    display: none;
  }
</style>
