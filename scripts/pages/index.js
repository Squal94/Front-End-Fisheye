//------------------ Affichage --------------------

//Récuperation des objets photographer du .json

async function getPhotographers() {
  let photographers = [];
  await fetch("data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers,
  };
}

//Création de la galerie des photographes de la page index
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    selectPhtographers(photographer, photographers);
  });
}
// initialisation de la page
async function init() {
  const photographersSection = document.querySelector(".photographer_section");
  const { photographers } = await getPhotographers();
  displayData(photographers);
  Tabs(photographersSection);
}

init();

//---------Selectionner Photographe---------

/**
 * fonction de récupération de photographerId et son index, et envoi pour la page photographer id et index dans le local storage.
 * @param {photographer} data
 * @param {photographers} arr
 */
function selectPhtographers(data, arr) {
  const photographerId = data.id;
  const selectId = document.getElementsByClassName(photographerId).item(0);
  selectId.addEventListener("click", () => {
    const indexPhotographer = arr.indexOf(data);
    sessionStorage.selectIndex = indexPhotographer;
    sessionStorage.selectId = photographerId;
    location.href = `photographer.html#${photographerId}`;
  });
}
