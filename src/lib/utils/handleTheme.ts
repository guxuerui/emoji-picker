let currentTheme = "";

function loadTheme() {
  currentTheme = localStorage.getItem("color-schema") || "auto";
}

function toggleTheme() {
  if (currentTheme === "light" || currentTheme === "auto") {
    localStorage.setItem("color-schema", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("color-schema", "light");
    document.documentElement.classList.remove("dark");
  }
  loadTheme();
}

export { currentTheme, toggleTheme, loadTheme }