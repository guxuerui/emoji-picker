import { browser } from "$app/environment"
import { writable } from "svelte/store";

const defaultTheme = "auto";
const initialTheme = browser ? window.localStorage.getItem("color-schema") ?? defaultTheme : defaultTheme
export const currentTheme = writable<string>(initialTheme);

currentTheme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("color-schema", value);
    toggleTheme(value);
  }
})

function toggleTheme(value: string) {
  if (value === "light" || value === "auto") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
}
