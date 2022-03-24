// ---------------importation .JSON---------------
async function getPhotographers() {
  let photographers = [];
  await fetch("data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers,
  };
}

async function getMedias() {
  let medias = [];
  await fetch("data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (medias = data.media));
  return {
    medias,
  };
}

// -------Cherche les infos du Photographer-------

function selectInfo(photographers) {
  //let returnId = sessionStorage.selectId;
  let returnIndex = sessionStorage.selectIndex;
  let objetPhotographer = photographers[returnIndex];
  photographHeader(objetPhotographer);
  photographGallery(objetPhotographer);
}

// -------création du DOM page Photographer-------

// ---------création  Photographer_Header---------

function photographHeader(data) {
  const photographHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");

  //------ Partie photographer info ------

  const headerName = document.createElement("article");
  headerName.classList.add("info");
  photographHeader.insertBefore(headerName, contactBtn);

  const headerNameTitle = document.createElement("h2");
  headerNameTitle.textContent = data.name;
  headerName.appendChild(headerNameTitle);

  const headerCountry = document.createElement("p");
  headerCountry.classList.add("pInfo");
  headerCountry.textContent = `${data.city} , ${data.country}`;
  headerName.appendChild(headerCountry);

  const headerTagline = document.createElement("p");
  headerTagline.textContent = data.tagline;
  headerName.appendChild(headerTagline);

  //------ Partie photographer photo ------

  const headerPhoto = document.createElement("div");
  headerPhoto.classList.add("photo");
  photographHeader.appendChild(headerPhoto);

  const picturePhotographer = `assets/photographers/${data.portrait}`;
  const imgPhotographer = document.createElement("img");
  imgPhotographer.classList.add("imgPhotographer");
  imgPhotographer.setAttribute("src", picturePhotographer);
  headerPhoto.appendChild(imgPhotographer);
}

// ---------création  Photographer_Gallery---------

function photographGallery(data) {
  const photographMain = document.getElementById("main");

  //------ Partie conteneur Gallery ------

  const galleryName = document.createElement("section");
  galleryName.classList.add("galleryPhotographer");
  photographMain.appendChild(galleryName);

  //------ Partie Trie ------
  const galleryTrie = document.createElement("div");
  galleryTrie.classList.add("galleryPhotographer__galleryTrie");
  galleryTrie.classList.add(`galleryPhotographer__galleryTrie--${data.id}`);
  galleryName.appendChild(galleryTrie);

  //------ Partie Gallery ------

  const galleryPicsId = document.createElement("div");
  galleryPicsId.classList.add("galleryPhotographer__gallery");
  galleryPicsId.classList.add(`galleryPhotographer__gallery--${data.id}`);
  galleryName.appendChild(galleryPicsId);

  //------ Partie cumul vote------

  const cumulVote = document.createElement("div");
  cumulVote.classList.add("galleryPhotographer__cumul");
  cumulVote.classList.add(`galleryPhotographer__cumulVote--${data.id}`);
  galleryName.appendChild(cumulVote);
}

// ------Initialisation des donnée et du code------

async function initPhotographer() {
  const { photographers } = await getPhotographers();
  selectInfo(photographers);
  const { medias } = await getMedias();
  console.log(medias);
}

initPhotographer();
