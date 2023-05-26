const glue = () => {
  const produtctsRowGlue = document.querySelector(".produtcts__row_glue");

  const changeTitle = (count) => {
    document.querySelector(
      ".produtcts__count_glue"
    ).textContent = `${count} позиции`;
  };

  const getDayInfo = (dateString) => {
    const [day, month, year] = dateString.split(".").map(Number);
    const createdDate = new Date(year, month - 1, day);

    let months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Ноября",
      "Декабря",
    ];
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];

    const productDayName = days[createdDate.getDay()];
    const productWeek = createdDate.getWeekOfMonth();
    const productMonthName = months[createdDate.getMonth()];
    const productYear = createdDate.getFullYear();

    const dayInfo = `${productDayName}, ${productWeek} неделя ${productMonthName} ${productYear} года`;
    return dayInfo;
  };

  const renderItems = (data) => {
    data.forEach(({ id, image, price, title, date }) => {
      const div = document.createElement("div");
      div.classList.add("produtcts__column");
      div.innerHTML = `
        <div class="produtct-card">
          <div class="product-card__body">
            <picture class="product-card__picture">
              <img
                class="produtct-card__img"
                src="${image}"
                alt="${title}"
              />
            </picture>
            <div class="produtct-card__title">
              ${title}
            </div>
          </div>
          <div class="product-card__footer">
            <div class="product-card__date">
              ${getDayInfo(date)}
            </div>
          <div class="product-card__price">${price} ₽</div>
            <a class="product-card__btn js-modal-open" href="#modal-1">
              Купить
            </a>
          </div>
        </div>
      `;
      produtctsRowGlue.append(div);
    });
  };

  const fetchData = async () => {
    const response = await fetch(
      "https://products-catalog-7b75d-default-rtdb.firebaseio.com/db/glue.json"
    );
    const data = await response.json();
    changeTitle(data.length);
    renderItems(data);
  };

  fetchData();
};

glue();
