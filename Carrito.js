const CajaProductos = document.querySelector(".Productos");
let compras = [];

Cargar();
function Cargar() {
  CajaProductos.addEventListener("click", AgregarProducto);
}
function AgregarProducto(e) {
  if (e.target.classList.contains("btns")) {
    const prod = e.target.parentElement.parentElement;
    LeerProducto(prod);
  }
}
function LeerProducto(elemento) {
  const producto = {
    id: elemento.querySelector(".btns").getAttribute("id"),
    product: elemento.querySelector("h5").textContent,

    price: elemento.querySelector("h3").textContent,
    image: elemento.querySelector("img").src,
    quantity: 1,
    categorias: elemento
      .querySelector(".items-compra")
      .getAttribute("data-categoria"),
  };
  compras.push(producto);
  console.log(compras);
  MostrarProductoscarrito();
}

function MostrarProductoscarrito() {
  compras.forEach((x) => {
    const{id,product,price,image,quantity,categorias}=x;
    
  });
}
