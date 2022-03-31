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

//------------ Factory Modal gallery----------------
// function selectionImage() {
//   window.addEventListener("click", () => {
//     let gallery = document.querySelector("#galleryPhotographer__gallery");
//   let lienPic = gallery.getElementsByTagName("figure");
//   console.log(lienPic);
//     //const test = galleryPhotographer.getAttribut("id");
//   });
// }
// selectionImage();
//- Factory pour le conteneur d'une image de la gallerie -

function picCard(data) {
  const { photographerId, title, image, likes, date, price, video, id } = data;
  const pictureSrc = `./assets/medias/${photographerId}/${image}`;
  const videoSrc = `./assets/medias/${photographerId}/${video}`;
  const galleryInsert = document.querySelector(".galleryPhotographer__gallery");

  function getUserCardGallery() {
    const figure = document.createElement("figure");
    figure.classList.add("picConteneur");
    figure.classList.add(photographerId);
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
      const aLink = document.createElement("a");
      const video = document.createElement("video");
      video.classList.add(`${id}`);
      video.setAttribute("src", videoSrc);
      video.setAttribute(
        "alt",
        `Titre de l'image : ${title} ,prise le ${date}.`
      );
      video.setAttribute("controls", "");
      figure.appendChild(aLink);
      aLink.appendChild(video);
    } else if (data.image) {
      const aLink = document.createElement("a");
      const pic = document.createElement("img");
      pic.classList.add(`${id}`);
      pic.setAttribute("src", pictureSrc);
      pic.setAttribute("alt", `Titre de l'image : ${title} ,prise le ${date}.`);
      figure.appendChild(aLink);
      aLink.appendChild(pic);
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

//----------Fonction de detection element au click---------

function selectionImageModal(data) {
  let gallery = document.querySelector(".galleryPhotographer__gallery");
  let figure = gallery.querySelectorAll(".picConteneur");
  for (let i = 0; i < figure.length; ++i) {
    figure[i].onclick = function () {
      let aLink = this.querySelector("a");
      let picLink = aLink.querySelector("img");
      picId = picLink.getAttribute("class");
      let returnId = sessionStorage.selectId;
      let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
      carrouselModal(picLink, arrayTemp);
    };
  }
}

//--------- fonction modal picture ------------

function carrouselModal(data, array) {
  //console.log(array);
  let indexOfPic = data.getAttribute("class");
  let titleInArray = array.filter((obj) => obj.id == indexOfPic);
  //console.log(positionInArray);
  let positionInArray = array.findIndex((element) => element.id == indexOfPic);
  console.log(positionInArray);
  //------------- Création de la modal-----------------
  const carrouselModal = document.querySelector(".carrousel");
  const carrouselConteneur = document.createElement("div");
  carrouselConteneur.classList.add("carrouselConteneur");
  const closeCarrousel = document.createElement("a");
  closeCarrousel.classList.add("closeCarrousel");
  const mainPicConteneur = document.createElement("div");
  mainPicConteneur.classList.add("mainPicConteneur");
  const left = document.createElement("img");
  left.classList.add("left");
  left.innerHTML = `<i class="fa-solid fa-angle-left"></i>`;
  const mainPic = document.createElement("img");
  mainPic.classList.add("mainPic");
  mainPic.setAttribute("src", data.src);
  const right = document.createElement("img");
  right.classList.add("right");
  right.innerHTML = `<i class="fa-solid fa-angle-right"></i>`;
  const mainPicTitle = document.createElement("h1");
  mainPicTitle.classList.add("mainPicTitle");
  mainPicTitle.innerHTML = titleInArray[0].title;
  carrouselModal.appendChild(carrouselConteneur);
  carrouselConteneur.appendChild(closeCarrousel);
  carrouselConteneur.appendChild(mainPicConteneur);
  mainPicConteneur.appendChild(left);
  mainPicConteneur.appendChild(mainPic);
  mainPicConteneur.appendChild(right);
  carrouselConteneur.appendChild(mainPicTitle);
  //------------- Fonctionnement de la modal-----------------

  right.addEventListener("click", () => {
    positionInArray = ++positionInArray;
    console.log(positionInArray);
    const picture = `assets/photographers/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    return positionInArray;
  });
  left.addEventListener("click", () => {
    positionInArray = --positionInArray;
    console.log(positionInArray);
    const picture = `assets/photographers/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    return positionInArray;
  });
}
