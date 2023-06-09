const smoothScroll = () => {
  const menuLinks = document.querySelectorAll(".menu__link[data-goto]");

  const burger = document.querySelector(".header__burger");
  const menuBody = document.querySelector(".menu__body");

  const logoLink = document.querySelector(".header__logo");
  const allLinks = [...menuLinks, logoLink];

  if (allLinks.length > 0) {
    allLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", (event) => {
        event.preventDefault();

        if (burger.classList.contains("header__burger_active  ")) {
          resetBurgerState();
        }

        const menuLink = event.target;
        if (
          menuLink.dataset.goto &&
          document.querySelector(menuLink.dataset.goto)
        ) {
          const gotoBlock = document.querySelector(menuLink.dataset.goto);
          const gotoBlockValue =
            gotoBlock.getBoundingClientRect().top +
            pageYOffset -
            document.querySelector("header").offsetHeight -
            50;

          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
          });
        }
      });
    });
  }
  function resetBurgerState() {
    document.body.classList.remove("body_lock");
    burger.classList.remove("header__burger_active");
    menuBody.classList.remove("menu__body_active");
  }
};

smoothScroll();
