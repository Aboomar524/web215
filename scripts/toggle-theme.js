const button = document.querySelector("[data-theme-toggle]");

button.addEventListener("click", (event) => {
  const htmlElement = document.querySelector("html");
  console.log("theme: ", htmlElement.getAttribute("data-theme"));
  const newTheme =
    htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

  document.querySelector("html").setAttribute("data-theme", newTheme);

  currentThemeSetting = newTheme;
});
