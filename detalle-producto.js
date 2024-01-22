document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  let productDetail;
  let productRecomendations = [];
  const galeriaFotosGrid = document.querySelector(".inicio_galeria_fotos_grid");

  fetch("./public/productos-joyeria.json")
    .then((response) => response.json())
    .then((data) => {
      productDetail = data.find((product) => product.codigo === productId);
      console.log(productDetail);

      const productDetailImg = document.getElementById("detalle-producto-img");
      productDetailImg.src = `./public/products-images${productDetail.src}`;
      productDetailImg.alt = productDetail.titulo;

      const productDetailCodigo = document.getElementById(
        "detalle-producto-codigo"
      );
      productDetailCodigo.textContent = `${productDetail.categoria.toUpperCase()} -#${
        productDetail.codigo
      }`;

      const productDetailTitulo = document.getElementById(
        "detalle-producto-titulo"
      );
      productDetailTitulo.textContent = productDetail.titulo;

      const productDetailDescripcion = document.getElementById(
        "detalle-producto-descripcion"
      );
      productDetailDescripcion.textContent = productDetail.descripcion;

      const getRandomProducts = (dataArray, numProducts, excludeProduct) => {
        const shuffledArray = dataArray
          .filter((data) => data !== excludeProduct)
          .sort(() => 0.5 - Math.random());
        return shuffledArray.slice(0, numProducts);
      };

      productRecomendations = getRandomProducts(data, 4, productDetail);
      console.log(productRecomendations);

      productRecomendations.forEach((product, index) => {
        const productCard = document.createElement("a");
        productCard.className = "product-card";
        productCard.id = `producto-${index}`;
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
    })
    .catch((error) => console.error("Error al cargar productos: ", error));
});
