//-Factory pour recuperer toutes les images du photographer et les afficher-

function trieArrayGallerie(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  const gallery = document.querySelector(".galleryPhotographer__gallery");
  const trieId = document.getElementById("trie");
  trieId.addEventListener("change", () => {
    const selectChoice = trieId.selectedIndex;
    const ValeurChoice = trieId.options[selectChoice].value;
    if (ValeurChoice == "popularite") {
      arrayTemp = arrayTemp.sort((a, b) => (a.likes > b.likes ? 1 : -1));
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayTemp.forEach((element) => {
        picCard(element).getUserCardGallery(element);
      });
      selectionImageModal(data);
      Tabs(gallery);
    } else if (ValeurChoice == "date") {
      arrayTemp = arrayTemp.sort(function (a, b) {
        let key1 = new Date(a.date);
        let key2 = new Date(b.date);
        if (key1 < key2) {
          return -1;
        } else if (key1 == key2) {
          return 0;
        } else {
          return 1;
        }
      });
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayTemp.forEach((element) => {
        picCard(element).getUserCardGallery(element);
      });
      selectionImageModal(data);
      Tabs(gallery);
    } else if (ValeurChoice == "title") {
      arrayTemp = arrayTemp.sort(function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayTemp.forEach((element) => {
        picCard(element).getUserCardGallery(element);
      });
      selectionImageModal(data);
      Tabs(gallery);
    }
  });
  arrayTemp.forEach((element) => {
    picCard(element).getUserCardGallery(element);
  });
  selectionImageModal(data);
  Tabs(gallery);
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
