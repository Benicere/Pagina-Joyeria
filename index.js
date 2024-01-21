document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.getElementById("menu-toggle");
  var menuEmergente = document.querySelector(".menu-emergente");

  menuToggle.addEventListener("change", function () {
    menuEmergente.style.display = this.checked ? "block" : "none";
  });

  // Cierra el menú emergente si se hace clic en un enlace
  menuEmergente.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      menuToggle.checked = false;
      menuEmergente.style.display = "none";
    }
  });
});
