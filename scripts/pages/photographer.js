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

// -------Cherche les infos du Photographe-------

function selectInfo(photographers, medias) {
  //let returnId = sessionStorage.selectId;
  let returnIndex = sessionStorage.selectIndex;
  let objetPhotographer = photographers[returnIndex];
  photographHeader(objetPhotographer);
  modalFormulaire(objetPhotographer);
  photographGallery(objetPhotographer, medias);
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

function photographGallery(data, medias) {
  const photographMain = document.getElementById("main");

  //------ Partie conteneur Gallery ------

  const galleryName = document.createElement("section");
  galleryName.classList.add("galleryPhotographer");
  photographMain.appendChild(galleryName);

  //------ Partie Trie ------
  const galleryTrie = document.createElement("div");
  galleryTrie.classList.add("galleryPhotographer__galleryTrie");
  galleryTrie.classList.add(`galleryPhotographer__galleryTrie--${medias.id}`);
  const labelTrie = document.createElement("label");
  labelTrie.textContent = "Trier par  ";
  labelTrie.setAttribute("for", "trie");
  const selectTrie = document.createElement("form");
  const selectBtn = document.createElement("select");
  selectBtn.setAttribute("id", "trie");
  selectBtn.setAttribute("name", "trie");
  const optionPopularite = document.createElement("option");
  optionPopularite.setAttribute("value", "popularite");
  optionPopularite.textContent = "Popularite";
  const optiondate = document.createElement("option");
  optiondate.setAttribute("value", "date");
  optiondate.textContent = "Date";
  const optiontitle = document.createElement("option");
  optiontitle.setAttribute("value", "title");
  optiontitle.textContent = "Title";
  galleryTrie.appendChild(labelTrie);
  galleryTrie.appendChild(selectTrie);
  selectTrie.appendChild(selectBtn);
  selectBtn.appendChild(optionPopularite);
  selectBtn.appendChild(optiondate);
  selectBtn.appendChild(optiontitle);

  galleryName.appendChild(galleryTrie);

  //------ Partie Gallery ------

  const galleryPicsId = document.createElement("nav-tabs");
  galleryPicsId.classList.add("galleryPhotographer__gallery");
  galleryPicsId.classList.add(`galleryPhotographer__gallery--${medias.id}`);
  galleryName.appendChild(galleryPicsId);

  //------ Partie cumul vote------

  const cumulVote = document.createElement("div");
  cumulVote.classList.add("galleryPhotographer__cumul");
  cumulVote.classList.add(`galleryPhotographer__cumulVote--${medias.id}`);
  galleryName.appendChild(cumulVote);
  const cumulTotal = document.createElement("p");
  cumulTotal.classList.add("cumulTotal");
  const cumulLikes = cumulLikesPhotographer(medias);
  const coeurlLikes =
    "<img src='assets/icons/coeurLikes.png' class='coeurLikes'/>";
  cumulTotal.innerHTML = `${cumulLikes} ${coeurlLikes}`;
  cumulVote.appendChild(cumulTotal);
  const prixJour = document.createElement("p");
  prixJour.classList.add("prixJour");
  prixJour.textContent = `${data.price}€/jour`;
  cumulVote.appendChild(prixJour);
}

// ------Initialisation des donnée et du code------

async function initPhotographer() {
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();
  selectInfo(photographers, medias);
  trieArrayGallerie(medias);
  selectTrieParOption(medias);
  customElements.define("nav-tabs", Tabs);
}

initPhotographer();
