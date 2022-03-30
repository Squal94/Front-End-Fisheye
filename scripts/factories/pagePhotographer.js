//-Factory pour recuperer toutes les images du photographer et les afficher-

function trieArrayGallerie(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  arrayTemp.forEach((element) => {
    picCard(element).getUserCardGallery(element);
  });
}

//---------Factory pour le cumul des likes photographer--------

function cumulLikesPhotographer(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  let cumulLikes = arrayTemp.reduce((cumulLikes, arrayTemp) => {
    return cumulLikes + arrayTemp.likes;
  }, 0);
  return cumulLikes;
}

//- Factory pour le conteneur d'une image de la gallerie -

function picCard(data) {
  const { photographerId, title, image, likes, date, price, video } = data;
  const pictureSrc = `assets/medias/${photographerId}/${image}`;
  const videoSrc = `assets/medias/${photographerId}/${video}`;
  const galleryInsert = document.querySelector(".galleryPhotographer__gallery");

  function getUserCardGallery() {
    const figure = document.createElement("figure");
    figure.classList.add("picConteneur");
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
    const coeurFirst = document.createElement("div");
    coeurFirst.classList.add("coeurFirst");
    const coeurlLike = `<i class="far fa-heart"></i>`;
    coeurFirst.innerHTML = coeurlLike;
    const coeurSecond = document.createElement("div");
    coeurSecond.classList.add("coeurSecond");
    const coeurlLikeSecond = `<i class="fas fa-heart"></i>`;
    coeurSecond.innerHTML = coeurlLikeSecond;
    if (data.video) {
      const video = document.createElement("video");
      video.setAttribute("src", videoSrc);
      video.setAttribute(
        "alt",
        `Titre de l'image : ${title} ,prise le ${date}.`
      );
      video.setAttribute("controls", "");
      figure.appendChild(video);
    } else if (data.image) {
      const pic = document.createElement("img");
      pic.setAttribute("src", pictureSrc);
      pic.setAttribute("alt", `Titre de l'image : ${title} ,prise le ${date}.`);
      figure.appendChild(pic);
    }
    galleryInsert.appendChild(figure);
    figure.appendChild(figcaption);
    figcaption.appendChild(picTitle);
    figcaption.appendChild(coeurLike);
    coeurLike.appendChild(like);
    coeurLike.appendChild(coeur);
    coeur.appendChild(coeurFirst);
    coeur.appendChild(coeurSecond);
  }
  return {
    getUserCardGallery,
  };
}
