//------------------ Affichage --------------------

async function getPhotographers() {
  let photographers = [];
  await fetch("data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (photographers = data.photographers));
  return {
    photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    selectPhtographers(photographer, photographers);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
  customElements.define("nav-tabs", Tabs);
}

init();

//---------Selectionner Photographe---------

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
