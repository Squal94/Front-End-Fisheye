//-Factory pour recuperer toutes les images du photographer affiché-

//- Factory pour le conteneur d'une image de la gallerie -

function picCard(data) {
  const { photographerId, title, image, likes, date, price } = data;
  const pictureSrc = `assets/medias/${photographerId}/${image}`;
  const galleryInsert = document.querySelector(".galleryPhotographer__gallery");

  function getUserCardGallery() {
    const figure = document.createElement("figure");
    figure.classList.add("picConteneur");
    const pic = document.createElement("img");
    pic.setAttribute("src", pictureSrc);
    pic.setAttribute("alt", `Titre de l'image : ${title} ,prise le ${date}.`);
    const figcaption = document.createElement("figcaption");
    const picTitle = document.createElement("p");
    picTitle.classList.add("pInfo");
    picTitle.textContent = title;
    const coeurLike = document.createElement("div");
    coeurLike.classList.add("coeurLike");
    const like = document.createElement("div");
    like.classList.add("like");
    like.classList.add("pInfo");
    like.textContent = likes;
    const coeur = document.createElement("div");
    coeur.classList.add("coeur");
    galleryInsert.appendChild(figure);
    figure.appendChild(pic);
    figure.appendChild(figcaption);
    figcaption.appendChild(picTitle);
    figcaption.appendChild(coeurLike);
    coeurLike.appendChild(like);
    coeurLike.appendChild(coeur);

    return figure;
  }
  return {
    photographerId,
    pictureSrc,
    title,
    image,
    likes,
    date,
    price,
    getUserCardGallery,
  };
}
