//--------------- Trie par date , popularité, titre ---------------

function selectTrieParOption(data) {
  let returnId = sessionStorage.selectId;
  let arrayTemp = data.filter((obj) => obj.photographerId == returnId);
  const selectId = document.getElementById("trie");
  selectId.addEventListener("change", () => {
    const gallery = document.querySelector(".galleryPhotographer__gallery");
    const selectChoice = selectId.selectedIndex;
    const ValeurChoice = selectId.options[selectChoice].value;
    if (ValeurChoice == "popularite") {
      arrayTemp = arrayTemp.sort((a, b) => (a.likes > b.likes ? 1 : -1));
      while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
      }
      arrayTemp.forEach((element) => {
        picCard(element).getUserCardGallery(element);
      });
      selectionImageModal(arrayTemp);
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
      selectionImageModal(arrayTemp);
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
      selectionImageModal(arrayTemp);
      customElements.define("nav-tabs", Tabs);
    }
  });
}

//--------- fonction modal picture ------------

function carrouselModal(data, array) {
  let indexOfPic = data.getAttribute("class");
  let titleInArray = array.filter((obj) => obj.id == indexOfPic);
  let positionInArray = array.findIndex((element) => element.id == indexOfPic);
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
    const picture = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    mainPicTitle.innerHTML = array[positionInArray].title;
    return positionInArray;
  });
  left.addEventListener("click", () => {
    positionInArray = --positionInArray;
    const picture = `assets/medias/${array[positionInArray].photographerId}/${array[positionInArray].image}`;
    mainPic.setAttribute("src", picture);
    mainPicTitle.innerHTML = array[positionInArray].title;
    return positionInArray;
  });

  closeCarrousel.addEventListener("click", () => {
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

//-----------------Fonction pour selection du coeur et changement du like et Cumul Likes

async function coeurVote(data) {
  let vote = false;
  let voteLike = data.likes;
  let coeurSecondOpacity = document.querySelector(`.coeurSecond${data.id}`);
  let coeurId = document.querySelector(`.coeur${data.id}`);

  coeurId.addEventListener("click", () => {
    const coeurlLikes =
      "<img src='assets/icons/coeurLikes.png' class='coeurLikes'/>";
    let cumulTotal = document.querySelector(".cumulTotal");
    if (vote == false) {
      vote = true;
      voteLike = data.likes + 1;
      data.likes = voteLike;
      coeurSecondOpacity.style.opacity = "1";
      cumulTotalModifier = ++cumulTotal.textContent;
    } else {
      vote = false;
      voteLike = data.likes - 1;
      data.likes = voteLike;
      coeurSecondOpacity.style.opacity = "0";
      cumulTotalModifier = --cumulTotal.textContent;
    }
    let likeModifier = document.querySelector(`.like${data.id}`);
    likeModifier.textContent = data.likes;
    cumulTotal.innerHTML = `${cumulTotalModifier} ${coeurlLikes}`;
  });
}
