const btn = document.getElementById("button");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Enviando...";
    btn.disabled = true;

    const serviceID = "default_service";
    const templateID = "template_w7yxex8";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Correo enviado con éxito!";
        this.reset();
      },
      (err) => {
        btn.value = "Enviar";
        btn.disabled = false;
      }
    );
  });
