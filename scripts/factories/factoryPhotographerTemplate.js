//---------Factory pour le cumul des likes photographer--------

function cumulLikesPhotographer(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  let cumulLikes = arrayTemp.reduce((cumulLikes, arrayTemp) => {
    return cumulLikes + arrayTemp.likes;
  }, 0);
  return cumulLikes;
}

//------- Factory gallery création image par image -------

function picCard(data) {
  const { photographerId, title, image, likes, date, price, video, id } = data;
  const pictureSrc = `assets/medias/${photographerId}/thumbnail/${image}`;
  const videoSrc = `assets/medias/${photographerId}/thumbnail/${video}`;
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
    like.classList.add(`like${id}`);
    like.classList.add("pInfo");
    like.textContent = likes;
    const coeur = document.createElement("div");
    coeur.classList.add("coeur");
    coeur.classList.add(`coeur${id}`);
    const coeurFirst = document.createElement("div");
    coeurFirst.classList.add("coeurFirst");
    coeurFirst.classList.add(`coeurFirst${id}`);
    const coeurlLike = `<i class="far fa-heart"></i>`;
    coeurFirst.innerHTML = coeurlLike;
    const coeurSecond = document.createElement("div");
    coeurSecond.classList.add("coeurSecond");
    coeurSecond.classList.add(`coeurSecond${id}`);
    const coeurlLikeSecond = `<i class="fas fa-heart"></i>`;
    coeurSecond.innerHTML = coeurlLikeSecond;
    if (data.video) {
      const aLink = document.createElement("a");
      aLink.classList.add("link");
      const video = document.createElement("video");
      video.classList.add(`${id}`);
      video.setAttribute("src", videoSrc);
      video.setAttribute(
        "alt",
        `Titre de l'image : ${title} ,prise le ${date}, avec un nombre de likes de ${likes}.`
      );
      video.setAttribute("controls", "");
      figure.appendChild(aLink);
      aLink.appendChild(video);
    } else if (data.image) {
      const aLink = document.createElement("a");
      aLink.classList.add("link");
      const pic = document.createElement("img");
      pic.classList.add(`${id}`);
      pic.setAttribute("src", pictureSrc);
      pic.setAttribute(
        "alt",
        `Titre de l'image : ${title} ,prise le ${date}, avec un nombre de likes de ${likes}. `
      );
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
    coeurVote(data);
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
    let figureLink = figure[i].querySelector("a");
    figureLink.onclick = function () {
      let picLink = this.querySelector("img");
      picId = picLink.getAttribute("class");
      let returnId = sessionStorage.selectId;
      let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
      //------------Partie launch modal-------------
      let target = document.querySelector(".carrouselModal");
      target.style.display = null;
      target.removeAttribute("aria-hidden");
      target.setAttribute("aria-modal", true);
      carrouselModal(picLink, arrayTemp);
    };
  }
}
