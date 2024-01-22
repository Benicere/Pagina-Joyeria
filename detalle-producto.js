console.log("aaaaaaaaa");

document.addEventListener("DOMContentLoaded", function () {
  console.log("bbbbbbbbbbbbbb");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  let productDetail;

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
    })
    .catch((error) => console.error("Error al cargar productos: ", error));
});
