function photographerFactory(data) {
  const { name, portrait, city, country, tagline, id, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const className = id;
    article.classList.add(className);
    const img = document.createElement("img");
    const boxInfo = document.createElement("div");
    boxInfo.classList.add("boxInfo");
    const pInfo = document.createElement("p");
    pInfo.classList.add("pInfo");
    const pTag = document.createElement("p");
    const pPrice = document.createElement("p");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    pInfo.textContent = `${city} , ${country}`;
    pTag.textContent = tagline;
    pPrice.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(boxInfo);
    boxInfo.appendChild(pInfo);
    boxInfo.appendChild(pTag);
    boxInfo.appendChild(pPrice);
    return article;
  }
  return { name, picture, city, country, tagline, id, price, getUserCardDOM };
}
