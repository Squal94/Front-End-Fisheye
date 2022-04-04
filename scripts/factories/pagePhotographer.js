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

//------- Factory gallery création image par image -------

function picCard(data) {
  const { photographerId, title, image, likes, date, price, video, id } = data;
  const pictureSrc = `./assets/medias/${photographerId}/thumbnail/${image}`;
  const videoSrc = `./assets/medias/${photographerId}/thumbnail/${video}`;
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
      //------------Partie launch modal-------------
      let target = document.querySelector(".carrouselModal");
      target.style.display = null;
      target.removeAttribute("aria-hidden");
      target.setAttribute("aria-modal", true);
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
  const mainPic = document.createElement("img");
  mainPic.classList.add("mainPic");
  mainPic.setAttribute("src", data.src);
  const right = document.createElement("img");
  right.classList.add("right");
  right.setAttribute("src", "assets/icons/chevron-right-solid.svg");
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
    const picture = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    mainPicTitle.innerHTML = array[positionInArray].title;
    return positionInArray;
  });
  left.addEventListener("click", () => {
    positionInArray = --positionInArray;
    console.log(positionInArray);
    const picture = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    mainPicTitle.innerHTML = array[positionInArray].title;
    return positionInArray;
  });

  closeCarrousel.addEventListener("click", () => {
    console.log("YouHou");
    let target = document.querySelector(".carrouselModal");
    target.style.display = "none";
    target.setAttribute("aria-hidden", true);
    target.setAttribute("aria-modal", false);
    target.removeChild(carrouselConteneur);
  });
}

//---------------------- Modal formulaire ----------------------

function modalFormulaire(data) {
  //-------------- Query selector fixe ---------------

  const headerFormulaire = document.querySelector("header");
  const formulaire = document.querySelector("form");
  const formFirstName = document.querySelector("label");
  const formFirstNameInput = document.querySelector("input");
  const btnClassButton = document.querySelector("form button");

  //------- Creation des elements du formulaire --------

  //------ Formulaire ajourt d'attribut ------

  formulaire.setAttribute("action", "#");
  formulaire.setAttribute("method", "post");

  //---------- Nom du photographe ------------
  const formPhotographerName = document.createElement("h2");
  formPhotographerName.textContent = data.name;
  headerFormulaire.appendChild(formPhotographerName);

  //--------------- First Name ---------------

  formFirstName.setAttribute("for", "firstName");
  formFirstNameInput.setAttribute("type", "text");
  formFirstNameInput.setAttribute("id", "firstName");
  formFirstNameInput.setAttribute("name", "firstName");

  //---------------- Last Name ----------------

  const formLastName = document.createElement("label");
  formLastName.textContent = "Nom";
  const formLastNameInput = document.createElement("input");
  formLastName.setAttribute("for", "lastName");
  formLastNameInput.setAttribute("type", "text");
  formLastNameInput.setAttribute("id", "lastName");
  formLastNameInput.setAttribute("name", "lastName");
  formulaire.appendChild(formLastName);
  formulaire.appendChild(formLastNameInput);

  //------------------ Email ------------------

  const formEmail = document.createElement("label");
  formEmail.textContent = "Email";
  const formEmailInput = document.createElement("input");
  formEmail.setAttribute("for", "email");
  formEmailInput.setAttribute("type", "email");
  formEmailInput.setAttribute("id", "email");
  formEmailInput.setAttribute("name", "email");
  formulaire.appendChild(formEmail);
  formulaire.appendChild(formEmailInput);

  //----------------- Text Area -----------------

  const formTextArea = document.createElement("label");
  formTextArea.textContent = "Votre message";
  const formTextAreaInput = document.createElement("textarea");
  formTextArea.setAttribute("for", "message");
  formTextAreaInput.setAttribute("id", "message");
  formTextAreaInput.setAttribute("name", "message");
  formulaire.appendChild(formTextArea);
  formulaire.appendChild(formTextAreaInput);

  //----- Mettre bouton en fin de formulaire -----

  formulaire.insertBefore(btnClassButton, formTextAreaInput.nextSibling);

  //---------- Accessibilité formulaire ----------

  const BtnContactMoi = document.querySelector(".photograph-header button");
  const BtnContactMoiClose = document.querySelector("header img");

  BtnContactMoi.addEventListener("click", () => {
    target = document.querySelector("#contact_modal");
    target.setAttribute("aria-hidden", false);
    target.setAttribute("aria-modal", true);
  });

  BtnContactMoiClose.addEventListener("click", () => {
    target = document.querySelector("#contact_modal");
    target.setAttribute("aria-hidden", true);
    target.setAttribute("aria-modal", false);
  });
}

//--------------- Trie par date , popularité, titre ---------------

function selectTrieParOption(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  console.log(arrayTemp);
  const selectId = document.getElementById("trie");
  selectId.addEventListener("click", () => {
    const selectChoice = selectId.selectedIndex;
    const ValeurChoice = selectId.options[selectChoice].value;
    if (ValeurChoice == "popularite") {
      arrayTemp = arrayTemp.sort((a, b) => (a.likes > b.likes ? 1 : -1));
      console.log(arrayTemp);
    } else if (ValeurChoice == "date") {
      arrayTemp = arrayTemp.sort(function (a, b) {
        var key1 = new Date(a.date);
        var key2 = new Date(b.date);
        if (key1 < key2) {
          return -1;
        } else if (key1 == key2) {
          return 0;
        } else {
          return 1;
        }
      });
      console.log(arrayTemp);
    } else if (ValeurChoice == "title") {
      arrayTemp = arrayTemp.sort(function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      console.log(arrayTemp);
    }
  });
  console.log(arrayTemp);
}
