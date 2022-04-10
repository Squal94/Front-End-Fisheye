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
