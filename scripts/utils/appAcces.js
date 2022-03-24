//------------Ajout accessibilité controls-----------

// function ariaDefault() {
//   const ariaD = document.querySelector("article");
//   ariaD.setAttribute("aria-selected", "true");
// }

class Tabs extends HTMLElement {
  connectedCallback() {
    this.setAttribute("role", "tablist");
    const tabs = Array.from(this.children);
    const hash = window.location.hash.replace("#", "");
    let currentTab = tabs[0];

    tabs.forEach((tab, i) => {
      const id = tab.getAttribute("class");
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
        if (e.key === "ArrowRight") {
          index = i === tabs.length - 1 ? 0 : i + 1;
        } else if (e.key === "ArrowLeft") {
          index = i === 0 ? tabs.length - 1 : i - 1;
        } else if (e.key === "Home") {
          index = 0;
        } else if (e.key === "End") {
          index = tabs.length - 1;
        }
        if (index !== null) {
          this.activate(tabs[index]);
          tabs[index].focus();
        }
      });
      // Navigation à la souris
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.activate(tab);
      });
    });

    // On active l'onglet qui est censé être actif
    this.activate(currentTab, false);
    if (currentTab.getAttribute("aria-controls") === hash) {
      window.requestAnimationFrame(() => {
        currentTab.scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }

  /**
   * @param {HTMLElement} tab
   * @param {boolean} changeHash
   */
  activate(tab, changeHash = true) {
    const currentTab = this.querySelector('[aria-selected="true"]');
    if (currentTab !== null) {
      tab.getAttribute(currentTab.getAttribute("aria-controls"));
      currentTab.setAttribute("aria-selected", "false");
      currentTab.setAttribute("tabindex", "-1");
      currentTab.setAttribute("hidden", "hidden");
    }
    const id = tab.getAttribute("aria-controls");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.removeAttribute("hidden");
    if (changeHash) {
      window.history.replaceState({}, "", "#" + id);
    }
  }
}

//------------Ajout accessibilité lecteur-----------
