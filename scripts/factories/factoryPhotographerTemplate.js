//---------Factory pour le cumul des likes photographer--------

/**
 * Fonction d'acquisition de la valeur de tous les likes et le calcul du cumul
 * @param {array} data
 * la valeur de data est : "medias" qui est représenté par le tableau de toutes les images et vidéos d'un photographe récupéré dans la base de données(.json)
 * @returns cumulLikes
 */

function cumulLikesPhotographer(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  let cumulLikes = arrayTemp.reduce((cumulLikes, arrayTemp) => {
    return cumulLikes + arrayTemp.likes;
  }, 0);
  return cumulLikes;
}

//------- Factory gallery création image par image -------

/**
 *fonction de création de chaque image, dans une balise figure et de son habillage titre ,coeur .
 * @param {array} data (arraytemp)
 * la valeur de data est : "arraytemp" qui est représenté par le tableau de toutes les images et vidéos d'un photographe (tableau medias) mais qui est récupéré soit tel quel soit après un tri déclenché par un event dans la fonction trieArrayGallerie.
 * @returns getUserCardGallery
 */

function picCard(data) {
  // déclaration de toutes les constantes qui vont permettre de générer la suite du code

  const { photographerId, title, image, likes, date, price, video, id } = data;
  const pictureSrc = `assets/medias/${photographerId}/thumbnail/${image}`;
  const videoSrc = `assets/medias/${photographerId}/thumbnail/${video}`;
  const galleryInsert = document.querySelector(".galleryPhotographer__gallery");

  function getUserCardGallery() {
    // Création de toutes les balises générées dans le code ainsi que leur class

    const figure = document.createElement("figure");
    figure.classList.add("picConteneur");
    const figcaption = document.createElement("figcaption");
    const picTitle = document.createElement("p");
    picTitle.classList.add("pInfo");

    // condition qui me permet d'ajouter le mot vidéo à côté du titre de l'image

    if (data.video) {
      picTitle.textContent = `${title} (Video)`;
    } else if (data.image) {
      picTitle.textContent = title;
    }

    // création de la partie du vote avec une image de coeur

    const coeurLike = document.createElement("div");
    coeurLike.classList.add("coeurLike");
    const like = document.createElement("div");
    like.classList.add(`like${id}`);
    like.classList.add("pInfo");
    like.textContent = likes;
    const coeur = document.createElement("div");
    coeur.classList.add("coeur");
    coeur.classList.add(`coeur${id}`);
    coeur.setAttribute("aria-label", "likes");
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

    // Détection dans le tableau : si image --> création d'une balise image
    //                           : si vidéo --> création d'une balise vidéo

    if (data.video) {
      const aLink = document.createElement("a");
      aLink.classList.add("link");
      const video = document.createElement("video");
      video.classList.add(`${id}`);
      video.setAttribute("src", videoSrc);
      video.setAttribute(
        "alt",
        `Titre de l'image : Video ${title} ,prise le ${date}, avec un nombre de likes de ${likes}.`
      );
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
        `Titre de l'image : Photo ${title} ,prise le ${date}, avec un nombre de likes de ${likes}. `
      );
      figure.appendChild(aLink);
      aLink.appendChild(pic);
    }
    // Génération dans le DOM grace au appendChild de toutes les balises

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

/**
 * Fonction de detection d'element au click et de lancement de la fonction carrouselModal à l'image cliqué
 * @param {arraytemp} data
 * la valeur de data est : "arraytemp" qui est représenté par le tableau de toutes les images et vidéos d'un photographe (tableau medias) mais qui est récupéré soit tel quel ,soit après un tri déclenché par un event dans la fonction trieArrayGallerie.
 */
function selectionImageModal(data) {
  let gallery = document.querySelector(".galleryPhotographer__gallery");
  let figure = gallery.querySelectorAll(".picConteneur");

  // recherche de l'element cliqué dans le tableau figure et création des balises dans le DOM

  for (let i = 0; i < figure.length; ++i) {
    let figureLink = figure[i].querySelector("a");
    figureLink.onclick = function () {
      let picLink;
      if (this.querySelector("img")) {
        picLink = this.querySelector("img");
        picId = picLink.getAttribute("class");
      } else {
        picLink = this.querySelector("video");
        picId = picLink.getAttribute("class");
      }

      // Récupération de l' ID du photographe dans le local storage et selection de ses medias

      let returnId = sessionStorage.selectId;
      let arrayTemp = data.filter((obj) => obj.photographerId == returnId);

      //------------Partie launch modal-------------

      let target = document.querySelector(".carrouselModal");
      target.style.display = null;
      target.removeAttribute("aria-hidden");
      target.setAttribute("aria-modal", true);
      carrouselModal(picLink, arrayTemp);
      target.setAttribute("tabindex", "0");
      target.focus();
    };
  }
}
