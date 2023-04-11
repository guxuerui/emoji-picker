<script lang="ts">
  import { onMount } from "svelte";
  import type { IEmoji } from "$lib/types";

  async function fetchEmojis() {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
    );
    // const response = await fetch("https://api.github.com/emojis");
    return response.json();
  }

  let emojisData: IEmoji[] = [];
  let emojisArr: IEmoji[] = [];
  let filter = "";
  let searchValue = "";

  function searchEmojis(filter: string) {
    emojisArr = emojisData.filter((emoji) => emoji.name.includes(filter));
  }

  function filterEmojis(category?: string) {
    switch (category) {
      case "people":
        filter = "smile";
        break;
      case "animals":
        filter = "cat";
        break;
      case "food":
        filter = "hamburger";
        break;
      case "nature":
        filter = "tree";
        break;
      case "weather":
        filter = "rain";
        break;
      case "travel":
        filter = "car";
        break;
      case "objects":
        filter = "phone";
        break;
      case "music":
        filter = "music";
        break;
      default:
        filter = "undefined";
        break;
    }
    searchEmojis(filter);
  }

  onMount(async () => {
    const data = await fetchEmojis();
    console.log("[src/routes/+page.svelte:55] data: ", data);
    // emojisData = Object.entries(data).map(([key, value]) => {
    //   return { name: key, url: `${value}` };
    // });

    console.log("[src/routes/+page.svelte:13] emojis: ", emojisData);
    filterEmojis();
  });
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="home page" />
</svelte:head>

<section>
  <h1 my-0>Pick Github Emojis</h1>
  <input
    type="text"
    bind:value={searchValue}
    on:keyup={searchEmojis(searchValue)}
    placeholder="search emoji..."
    my-6
  />

  <div>
    <button on:click={() => filterEmojis("people")}>People</button>
    <button on:click={() => filterEmojis("animals")}>Animals</button>
    <button on:click={() => filterEmojis("food")}>Food</button>
    <button on:click={() => filterEmojis("nature")}>Nature</button>
    <button on:click={() => filterEmojis("weather")}>Weather</button>
    <button on:click={() => filterEmojis("travel")}>Travel</button>
    <button on:click={() => filterEmojis("objects")}>Sports</button>
    <button on:click={() => filterEmojis("music")}>Music</button>
  </div>

  {#if emojisArr.length}
    <ul>
      {#each emojisArr as emoji}
        <li>
          <img src={emoji.url} alt={emoji} />
          {emoji.name}
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
