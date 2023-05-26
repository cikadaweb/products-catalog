const themeMode = () => {
  const themeButtons = document.querySelectorAll(".theme__button");

  themeButtons.forEach((btnItem) => {
    btnItem.addEventListener("click", (event) => {
      document.documentElement.classList.remove("light", "dark");
      if (event.target.classList.contains("theme__button_dark-mode")) {
        document.documentElement.classList.add("light");
      }
      if (event.target.classList.contains("theme__button_light-mode")) {
        document.documentElement.classList.add("dark");
      }
    });
  });
};

themeMode();
