const modal = () => {
  let resizeObserver = null;

  const CLASS_LIST = {
    MODAL: "modal",
    MODAL_ACTIVE: "modal_active",
    MODAL_HAS_SCROLL: "modal_has-scroll",
    MODAL_DIALOG_BODY: "modal__body",
    TRIGGER_OPEN: "js-modal-open",
    TRIGGER_CLOSE: "js-modal-close",
  };

  const showScroll = (event) => {
    if (event.propertyName === "transform") {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "visible";

      event.target
        .closest(`.${CLASS_LIST.MODAL}`)
        .removeEventListener("transitionend", showScroll);
    }
  };

  document.addEventListener("click", (event) => {
    //open
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
      event.preventDefault();

      const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
      const modalId = target.getAttribute("href").replace("#", "");
      const modal = document.getElementById(modalId);

      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      document.body.style.overflow = "hidden";

      modal.classList.add(CLASS_LIST.MODAL_ACTIVE);

      bindResizeOserver(modal);
    }

    //close
    if (
      event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
      event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
    ) {
      event.preventDefault();

      const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);

      modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);

      unbindResizeOserver(modal);

      modal.addEventListener("transitionend", showScroll);
    }
  });

  const getScrollbarWidth = () => {
    const item = document.createElement("div");

    item.style.position = "absolute";
    item.style.top = "-9999px";
    item.style.width = "50px";
    item.style.height = "50px";
    item.style.overflow = "scroll";
    item.style.visibility = "hidden";

    document.body.appendChild(item);
    const scrollBarWidth = item.offsetWidth - item.clientWidth;
    document.body.removeChild(item);

    return scrollBarWidth;
  };

  const bindResizeOserver = (modal) => {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);

    const toggleShadows = () => {
      modal.classList.toggle(
        CLASS_LIST.MODAL_HAS_SCROLL,
        content.scrollHeight > content.clientHeight
      );
    };

    resizeObserver = new ResizeObserver(toggleShadows);

    resizeObserver.observe(content);
  };

  const unbindResizeOserver = (modal) => {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);
    resizeObserver.unobserve(content);
    resizeObserver = null;
  };

  // document
  //   .getElementById("js-add-content-temp")
  //   .addEventListener("click", (event) => {
  //     const div = document.createElement("div");
  //     div.textContent = "Text content";
  //     div.style.height = "1000px";
  //     document.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`).appendChild(div);
  //   });

  // modal form

  const quantityInput = document.querySelector(".modal-form__input");
  const modalPlusButton = document.querySelector(".modal-form__btn_green");
  const modalMinusButton = document.querySelector(".modal-form__btn_red");

  modalPlusButton.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 0) {
      quantityInput.value = currentValue + 1;
    }
  });

  modalMinusButton.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  quantityInput.addEventListener("input", () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 1 || isNaN(currentValue)) {
      quantityInput.value = 1;
    }
  });

  const radioButtons = document.querySelectorAll(".radio__input");
  let activeRadioButton;

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
      activeRadioButton = event.target.value;
    });
  });

  const textarea = document.querySelector(".modal-form__textarea");
  const charCount = document.querySelector(".modal-form__textarea-counter");

  textarea.addEventListener("input", (event) => {
    const textareValue = event.target.value;

    const maxLength = 2000;

    if (textareValue.length > maxLength) {
      event.target.value = textareValue.slice(0, maxLength);
    }

    charCount.textContent = `Количетво символов: ${textareValue.length}`;
  });

  const modalBuyBtn = document.querySelector(".modal__btn-buy-footer");
  modalBuyBtn.addEventListener("click", (event) => {
    let orderInfo = "";
    if (activeRadioButton !== undefined) {
      orderInfo += `Вы выбрали цвет: ${activeRadioButton}, в количестве ${quantityInput.value}\n`;
    } else {
      orderInfo += `Вы выбрали ${quantityInput.value} позиций\n`;
    }
    orderInfo += `Комментарий: ${textarea.value}`;
    alert(`Заказ офомрлен!\n${orderInfo}`);
    event.preventDefault();
    const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);
    modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    unbindResizeOserver(modal);
    modal.addEventListener("transitionend", showScroll);
  });
};

modal();
