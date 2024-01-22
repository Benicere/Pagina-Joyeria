document.addEventListener("DOMContentLoaded", function () {
  const productsPerPage = 24;
  let page = 1;
  const productosJson = [];
  const galeriaFotosGrid = document.querySelector(".inicio_galeria_fotos_grid");
  console.log(productosJson);

  function cargarProductos() {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const productsToShow = productosJson.slice(startIndex, endIndex);

    productsToShow.forEach((product, index) => {
      const productCard = document.createElement("a");
      productCard.className = "product-card";
      productCard.id = `producto-${startIndex + index}`;
      productCard.href = `detalle-producto.html?id=${product.codigo}`;

      const productImage = document.createElement("img");
      productImage.className = "product-image";
      productImage.src = `./public/products-images${product.src}`;
      productImage.alt = product.titulo;

      const productDetails = document.createElement("div");
      productDetails.className = "product-details";

      const productType = document.createElement("p");
      productType.className = "product-type";
      productType.textContent = `${product.categoria.toUpperCase()} - #${
        product.codigo
      }`;

      const productTitle = document.createElement("h3");
      productTitle.className = "product-title";
      productTitle.textContent = product.titulo;

      const productDescription = document.createElement("p");
      productDescription.className = "product-description";
      productDescription.textContent = product.descripcion;

      productDetails.appendChild(productType);
      productDetails.appendChild(productTitle);
      productDetails.appendChild(productDescription);

      productCard.appendChild(productImage);
      productCard.appendChild(productDetails);

      galeriaFotosGrid.appendChild(productCard);
    });

    const lastProductCard = galeriaFotosGrid.lastElementChild;
    if (lastProductCard) {
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(lastProductCard);
    }
    page++;
  }

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (page <= Math.ceil(productosJson.length / productsPerPage)) {
          cargarProductos();
        }
      }
    });
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.9,
  };

  function getProducts() {
    fetch("./public/productos-joyeria.json")
      .then((response) => response.json())
      .then((data) => {
        productosJson.push(...data);
        cargarProductos();
      })
      .catch((error) => console.error("Error al cargar productos: ", error));
  }
  getProducts();

  const selectCategoria = document.querySelector(
    ".inicio_galeria_select_categoria"
  );
  selectCategoria.addEventListener("change", function () {
    // Limpia el contenido actual
    galeriaFotosGrid.innerHTML = "";
    // Filtra los productos según la categoría seleccionada
    const selectedCategoria = selectCategoria.value.toLowerCase();
    const filteredProducts = productosJson.filter(
      (product) =>
        product.categoria.toLowerCase() === selectedCategoria ||
        selectedCategoria === "todos"
    );
    // Muestra los productos filtrados
    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      const productImage = document.createElement("img");
      productImage.className = "product-image";
      productImage.src = `./public/products-images${product.src}`;
      productImage.alt = product.titulo;

      const productDetails = document.createElement("div");
      productDetails.className = "product-details";

      const productType = document.createElement("p");
      productType.className = "product-type";
      productType.textContent = `${product.categoria} - #${product.codigo}`;

      const productTitle = document.createElement("h3");
      productTitle.className = "product-title";
      productTitle.textContent = product.titulo;

      const productDescription = document.createElement("p");
      productDescription.className = "product-description";
      productDescription.textContent = product.descripcion;

      productDetails.appendChild(productType);
      productDetails.appendChild(productTitle);
      productDetails.appendChild(productDescription);

      productCard.appendChild(productImage);
      productCard.appendChild(productDetails);

      galeriaFotosGrid.appendChild(productCard);
    });
  });
});
