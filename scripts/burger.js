const burger = () => {
  const burger = document.querySelector(".header__burger");
  const aboutMeModalOpen = document.querySelector(".menu__link_aboutme");

  if (burger) {
    const menuBody = document.querySelector(".menu__body");
    burger.addEventListener("click", () => {
      document.body.classList.toggle("body_lock");
      burger.classList.toggle("header__burger_active");
      menuBody.classList.toggle("menu__body_active");
    });
    aboutMeModalOpen.addEventListener("click", () => {
      document.body.classList.remove("body_lock");
      burger.classList.remove("header__burger_active");
      menuBody.classList.remove("menu__body_active");
    });
  }
};

burger();
