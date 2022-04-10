function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
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
