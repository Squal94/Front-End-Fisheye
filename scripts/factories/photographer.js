/**
 * fonction template de création de carte par photographe pour la page index.html
 * @param {photographer} data
 *
 * @returns name, picture, city, country, tagline, id, price, getUserCardDOM
 */

function photographerFactory(data) {
  //Attribution des valeurs nécessaires à la navigation dans l'objet photographer
  const { name, portrait, city, country, tagline, id, price } = data;

  const picture = `assets/photographers/${portrait}`;

  // Fonction de création de la carte complète du photographe
  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("aria-label", `${name}`);
    const className = id;
    article.classList.add(className);
    article.classList.add("photographer");
    const img = document.createElement("img");
    img.classList.add("portrait");
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

    // génération dans le DOM des balises
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
