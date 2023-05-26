const burger = () => {
  const burger = document.querySelector(".header__burger");
  if (burger) {
    const menuBody = document.querySelector(".menu__body");
    burger.addEventListener("click", () => {
      document.body.classList.toggle("body_lock");
      burger.classList.toggle("header__burger_active");
      menuBody.classList.toggle("menu__body_active");
    });
  }
};

burger();
