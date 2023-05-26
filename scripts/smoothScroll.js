const smoothScroll = () => {
  const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", (event) => {
        event.preventDefault();
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
