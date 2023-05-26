const smoothScroll = () => {
  const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
  const burger = document.querySelector(".header__burger");
  const menuBody = document.querySelector(".menu__body");

  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", (event) => {
        event.preventDefault();

        document.body.classList.toggle("body_lock");
        burger.classList.toggle("header__burger_active");
        menuBody.classList.toggle("menu__body_active");

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
            50; // положение с учетом header

          window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
          });
        }
      });
    });
  }
};

smoothScroll();
