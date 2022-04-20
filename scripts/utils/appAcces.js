let modal = document.querySelector("aside");

function Tabs(root) {
  root.setAttribute("role", "tablist");
  const tabs = Array.from(root.children);
  const hash = window.location.hash.replace("#", "");
  let currentTab = tabs[0];
  tabs.forEach((tab, i) => {
    let id = tab.getAttribute("class");

    if (tab.getAttribute("aria-selected") === "true" && hash === "") {
      currentTab = tab;
    }
    if (id === hash) {
      currentTab = tab;
    }
    // On ajoute les attributs aria sur l'onglet
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
    tab.setAttribute("aria-controls", id);
    tab.setAttribute("hidden", "hidden");

    tab.addEventListener("keyup", (e) => {
      let index = null;
      if (e.key === "Enter") {
        currentTab = tab;
        currentTab.click();
      } else if (e.key === "ArrowRight") {
        index = i === tabs.length - 1 ? 0 : i + 1;
      } else if (e.key === "ArrowLeft") {
        index = i === 0 ? tabs.length - 1 : i - 1;
      } else if (e.key === "Home") {
        index = 0;
      } else if (e.key === "End") {
        index = tabs.length - 1;
      }
      if (index !== null) {
        activate(tabs[index]);
        tabs[index].focus();
      }
    });
    // Navigation à la souris
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      this.activate(tab);
    });
    // Initialisation de activate au tabs 0
    activate(tabs[0], false);
  });

  // Fonction de controle des aria et changement si necessaire sur action

  function activate(tab, changeHash = true) {
    let currentTab = document.querySelector('[aria-selected="true"]');
    if (currentTab !== null) {
      tab.getAttribute(currentTab.getAttribute("aria-controls"));
      currentTab.setAttribute("aria-selected", "false");
      currentTab.setAttribute("tabindex", "-1");
      currentTab.setAttribute("hidden", "hidden");
    }
    let id = tab.getAttribute("aria-controls");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.removeAttribute("hidden");
    if (changeHash) {
      window.history.replaceState({}, "", "#" + id);
    }
  }
}

function tabsPhotographer(root) {
  const linkLogo = document.querySelector(".linkLogo");
  root.setAttribute("role", "tablist");
  const arrayFigure = Array.from(root.children);
  let testarray = [];
  const hash = window.location.hash.replace("#", "");
  let currentTab = testarray[0];
  arrayFigure.forEach((figure) => {
    let testA = figure.querySelector("a");
    testarray.push(testA);
    let testCoeur = figure.querySelector(".coeur");
    testarray.push(testCoeur);
  });
  testarray.forEach((tab, i) => {
    let id = tab.getAttribute("class");

    if (tab.getAttribute("aria-selected") === "true" && hash === "") {
      currentTab = tab;
    }
    if (id === hash) {
      currentTab = tab;
    }
    // On ajoute les attributs aria sur l'onglet
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
    tab.setAttribute("aria-controls", id);

    tab.addEventListener("keydown", (e) => {
      let index = null;
      if (e.key === "Enter") {
        if (modal.getAttribute("aria-modal") === "true") {
        } else {
          currentTab = tab;
          currentTab.click();
        }
      } else if (e.key === "ArrowRight") {
        if (modal.getAttribute("aria-modal") === "true") {
        } else {
          index = i === testarray.length - 1 ? 0 : i + 1;
        }
      } else if (e.key === "Tab") {
        if (modal.getAttribute("aria-modal") === "true") {
        } else {
          if ((index = i === testarray.length - 1 ? 0 : i + 1)) {
            e.preventDefault();
          } else if ((index = testarray.length - 1)) {
            index = 0;
            linkLogo.focus();
          }
        }
      } else if (e.key === "ArrowLeft") {
        if (modal.getAttribute("aria-modal") === "true") {
        } else {
          index = i === 0 ? testarray.length - 1 : i - 1;
        }
      } else if (e.key === "Home") {
        index = 0;
      } else if (e.key === "End") {
        index = testarray.length - 1;
      }
      if (index !== null) {
        activate(testarray[index]);
        testarray[index].focus();
      }
    });
    // Initialisation de activate au tabs 0
    activate(testarray[0], false);
  });

  // Fonction de controle des aria et changement si necessaire sur action

  function activate(tab, changeHash = true) {
    let currentTab = document.querySelector('[aria-selected="true"]');
    if (currentTab !== null) {
      tab.getAttribute(currentTab.getAttribute("aria-controls"));
      currentTab.setAttribute("aria-selected", "false");
      currentTab.setAttribute("tabindex", "-1");
    }
    let id = tab.getAttribute("aria-controls");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    if (changeHash) {
      window.history.replaceState({}, "", "#" + id);
    }
  }
}

function tabsModalPics() {
  window.addEventListener("keydown", (e) => {
    const carrouselConteneur = document.querySelector("div.carrouselConteneur");
    const mainPicTitle = document.querySelector(".mainPicTitle");
    if (e.key === "Escape" || e.key === "Esc") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", true);
      modal.setAttribute("aria-modal", false);
      mainPicTitle.removeAttribute("tabindex");
      if (carrouselConteneur) modal.removeChild(carrouselConteneur);
    }

    if (e.key === "ArrowRight" && modal.getAttribute("aria-modal") === "true") {
      document.querySelector(".right").click();
    }
    if (e.key === "ArrowLeft" && modal.getAttribute("aria-modal") === "true") {
      document.querySelector(".left").click();
    }
  });
}

tabsModalPics();

function focusInModal(e) {
  const formulaireConteneur = document.querySelector("#contact_modal");
  e.preventDefault();
  let indexSelect = focusables.findIndex(
    (f) => f === formulaireConteneur.querySelector(":focus")
  );
  if (e.shiftKey === true) {
    indexSelect--;
  } else {
    indexSelect++;
  }
  if (indexSelect >= focusables.length) {
    indexSelect = 0;
  }
  if (indexSelect < 0) {
    indexSelect = focusables.length - 1;
  }
  focusables[indexSelect].focus();
}
function tabsModalFormulaire() {
  window.addEventListener("keydown", (e) => {
    const formModal = document
      .querySelector("#contact_modal")
      .getAttribute("aria-modal");
    if (e.key === "Escape" || (e.key === "Esc" && formModal === "true")) {
      closeModal();
    }
    if (e.key === "Tab" && formModal === "true") {
      focusInModal(e);
    }
  });
}

function tabsSelect() {
  window.addEventListener("keydown", (e) => {
    const selectTab = document.querySelector("#trie");
    if (e.key === "ArrowRight") {
      selectTab.click();
    }
    if (e.key === "ArrowLeft") {
      selectTab.click();
    }
  });
}

tabsSelect();
