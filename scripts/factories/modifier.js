//-Factory pour recuperer toutes les images du photographer et les afficher

/**
 * Fonction de tri des arrays selon le filtre selectionné
 * @param {array} data
 *  la valeur de data est : "medias" qui est représenté par le tableau de toutes les images et vidéos d'un photographe récupéré dans la base de données(.json)
 */

function trieArrayGallerie(data) {
  const gallery = document.querySelector(".galleryPhotographer__gallery");
  const trieId = document.getElementById("trie");
  let returnId = sessionStorage.selectId;

  //Génération du tableau initial non trié selon le photographe
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);

  //Génération du tableau trié selon le filtre sélectionné dans le select (trieId)
  trieId.addEventListener("change", () => {
    const selectChoice = trieId.selectedIndex;
    const ValeurChoice = trieId.options[selectChoice].value;
    if (ValeurChoice == "popularite") {
      arrayTemp = arrayTemp.sort((a, b) => (a.likes > b.likes ? 1 : -1));

      // suppression du DOM des anciennes picCard après tri

      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayChoice(arrayTemp, gallery);
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
      arrayChoice(arrayTemp, gallery);
    } else if (ValeurChoice == "title") {
      arrayTemp = arrayTemp.sort(function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayChoice(arrayTemp, gallery);
    }
  });
  // fonction de génération des nouvelles picCard
  function arrayChoice(array, root) {
    array.forEach((element) => {
      picCard(element).getUserCardGallery(element);
    });
    selectionImageModal(arrayTemp);
    tabsPhotographer(root);
  }
  arrayChoice(arrayTemp, gallery);
}

//--------- fonction modal picture ------------
/**
 * Fonction de création de la Modal et aquisiton de l'array trié
 * @param {picLink} data
 * picLink = Image cliquée
 * @param {arrayTemp} array
 * arrayTemp tableau trié, lié
 */

function carrouselModal(data, array) {
  // Attribution de la class de l'image de son titre  et de son index dans le tableau
  let indexOfPic = data.getAttribute("class");
  let titleInArray = array.filter((obj) => obj.id == indexOfPic);
  let positionInArray = array.findIndex((element) => element.id == indexOfPic);

  //------------- Création de la modal (balise et class)-----------------

  const carrouselModal = document.querySelector(".carrouselModal");
  const carrouselConteneur = document.createElement("div");
  carrouselConteneur.classList.add("carrouselConteneur");
  const closeCarrousel = document.createElement("img");
  closeCarrousel.classList.add("closeCarrousel");
  closeCarrousel.setAttribute("src", "assets/icons/xmark-solid.svg");
  const mainPicConteneur = document.createElement("div");
  mainPicConteneur.classList.add("mainPicConteneur");
  const left = document.createElement("img");
  left.classList.add("left");
  left.setAttribute("src", "assets/icons/chevron-left-solid.svg");
  const mainPic = document.createElement("div");
  mainPic.classList.add("mainPic");
  const right = document.createElement("img");
  right.classList.add("right");
  right.setAttribute("src", "assets/icons/chevron-right-solid.svg");
  const mainPicTitle = document.createElement("h1");
  mainPicTitle.classList.add("mainPicTitle");
  mainPicTitle.setAttribute("aria-live", "polite");
  mainPicTitle.innerHTML = titleInArray[0].title;
  // création des balises dans le DOM
  carrouselModal.appendChild(carrouselConteneur);
  carrouselConteneur.appendChild(closeCarrousel);
  carrouselConteneur.appendChild(mainPicConteneur);
  mainPicConteneur.appendChild(left);
  mainPicConteneur.appendChild(mainPic);
  if (titleInArray[0].image) {
    const pic = document.createElement("img");
    pic.classList.add("pic");
    pic.setAttribute("src", data.src);
    mainPic.appendChild(pic);
  } else {
    const video = document.createElement("video");
    video.classList.add("video");
    video.setAttribute("src", data.src);
    video.setAttribute("controls", "");
    mainPic.appendChild(video);
  }
  mainPicConteneur.appendChild(right);
  carrouselConteneur.appendChild(mainPicTitle);
  //------------- Fonctionnement de la modal-----------------
  // création des events au click pour navigation et ajout de buter et de aria sur la modal.

  right.addEventListener("click", () => {
    const mainPic = document.querySelector(".mainPic");

    // ajout de aria pour indiquer la fin de la galerie

    if (positionInArray == array.length - 1) {
      right.classList.add("opacity");
      mainPicTitle.setAttribute(
        "aria-label",
        "fin de la galerie ,vous pouvez faire un retour sur la touche gauche ou quitter avec echap"
      );
    } else {
      // Déplacement dans la galerie sur la droite et remove et ajout du nouvel element

      positionInArray = ++positionInArray;
      mainPic.removeChild(mainPic.childNodes[0]);
      if ("image" in array[positionInArray]) {
        const pic = document.createElement("img");
        const source = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
        pic.classList.add("pic");
        pic.setAttribute("src", source);
        mainPic.appendChild(pic);
        mainPicTitle.innerHTML = array[positionInArray].title;
      } else {
        const video = document.createElement("video");
        const source = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].video}`;
        video.classList.add("video");
        video.setAttribute("src", source);
        video.setAttribute("controls", "");
        mainPic.appendChild(video);
        mainPicTitle.innerHTML = `${array[positionInArray].title} (Video) `;
      }
    }

    // Suppression des arias et de l'opacité

    if (left.classList.contains("opacity") == true) {
      left.classList.remove("opacity");
      mainPicTitle.removeAttribute("aria-label");
    }
  });
  left.addEventListener("click", () => {
    const mainPic = document.querySelector(".mainPic");
    // ajout de aria pour indiquer le début de la galerie

    if (positionInArray == 0) {
      left.classList.add("opacity");
      mainPicTitle.setAttribute(
        "aria-label",
        "début de la galerie ,vous pouvez avancer sur la touche droite ou quitter avec echap"
      );
    } else {
      // Déplacement dans la galerie sur la gauche et remove et ajout du nouvel element

      positionInArray = --positionInArray;
      mainPic.removeChild(mainPic.childNodes[0]);
      if ("image" in array[positionInArray]) {
        const pic = document.createElement("img");
        const source = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
        pic.classList.add("pic");
        pic.setAttribute("src", source);
        mainPic.appendChild(pic);
        mainPicTitle.innerHTML = array[positionInArray].title;
      } else {
        const video = document.createElement("video");
        const source = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].video}`;
        video.classList.add("video");
        video.setAttribute("src", source);
        video.setAttribute("controls", "");
        mainPic.appendChild(video);
        mainPicTitle.innerHTML = `${array[positionInArray].title} (Video) `;
      }
    }
    // Suppression des arias et de l'opacité

    if (right.classList.contains("opacity") == true) {
      right.classList.remove("opacity");
      mainPicTitle.removeAttribute("aria-label");
    }
  });
  //Fermeture de la modal au click
  closeCarrousel.addEventListener("click", () => {
    let target = document.querySelector(".carrouselModal");
    target.style.display = "none";
    target.setAttribute("aria-hidden", true);
    target.setAttribute("aria-modal", false);
    target.removeChild(carrouselConteneur);
    target.removeAttribute("tabindex");
  });
}

//-----------------Fonction pour selection du coeur et changement du like et Cumul Likes

/**
 * Fonction de tri des arrays selon le filtre selectionné
 * @param {array} data
 *  la valeur de data est : "medias" qui est représenté par le tableau de toutes les images et vidéos d'un photographe récupéré dans la base de données(.json) ou arreyTemp si un tri a été effectué
 */
async function coeurVote(data) {
  let vote = false;
  let voteLike = data.likes;
  let coeurSecondOpacity = document.querySelector(`.coeurSecond${data.id}`);
  let coeurId = document.querySelector(`.coeur${data.id}`);

  coeurId.addEventListener("click", () => {
    const coeurlLikes =
      "<img src='assets/icons/coeurLikes.png' class='coeurLikes'/>";
    let cumulTotal = document.querySelector(".cumulTotal");

    // Incrémentation de 1 au click

    if (vote == false) {
      vote = true;
      voteLike = data.likes + 1;
      data.likes = voteLike;
      coeurSecondOpacity.style.opacity = "1";
      cumulTotalModifier = ++cumulTotal.textContent;
      //Décrémentation de 1 au click
    } else {
      vote = false;
      voteLike = data.likes - 1;
      data.likes = voteLike;
      coeurSecondOpacity.style.opacity = "0";
      cumulTotalModifier = --cumulTotal.textContent;
    }
    // Ajout de la nouvelle valeur du cumul
    let likeModifier = document.querySelector(`.like${data.id}`);
    likeModifier.textContent = data.likes;
    cumulTotal.innerHTML = `${cumulTotalModifier} ${coeurlLikes}`;
  });
}
