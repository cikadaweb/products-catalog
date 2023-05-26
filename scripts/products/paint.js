const paint = () => {
  const produtctsRowPaint = document.querySelector(".produtcts__row_paint");

  const changeTitle = (count) => {
    document.querySelector(
      ".produtcts__count_paint"
    ).textContent = `${count} позиции`;
  };

  const renderItems = (data) => {
    data.forEach(({ id, image, price, title }) => {
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
          <div class="product-card__date">
            Среда, 3 неделя Декабря 2021 года
          </div>
          <div class="product-card__price">${price} ₽</div>
        </div>
        <div class="product-card__footer">
          <a class="product-card__btn js-modal-open" href="#modal-1">
            Купить
          </a>
        </div>
      </div>
    `;
      produtctsRowPaint.append(div);
    });
  };

  const fetchData = async () => {
    const response = await fetch(
      "https://products-catalog-7b75d-default-rtdb.firebaseio.com/db/paint.json"
    );
    const data = await response.json();
    changeTitle(data.length);
    renderItems(data);
  };

  fetchData();
};

paint();
