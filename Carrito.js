
const CajaProductos = document.querySelector(".Productos");
const Carritos = document.querySelector(".cart-items");
const contadorPro = document.querySelector("#item-count");
const total = document.querySelector(".cart-total-price");
const Eliminar = document.querySelector(".delete-product");
const item = document.querySelector("item");
const vaciar = document.querySelector("#VaciarCarrito");
const comprar = document.querySelector("#comprare");
//const listaCompra = document.querySelector("#carritos tbody");

// const listaCompra = document.querySelector("#carritos tbody");
///////////////////////
 //const comprare = document.querySelector("#comprare"); 
// const listaCompra = document.querySelector("#carritos tbody");
//////////
let compras = [];
let contadorproductos = 0;
let totalpagar = 0;

//Cargar();//
window.onload=Cargar;
function Cargar() {
 
  CajaProductos.addEventListener("click", AgregarProducto);
  Carritos.addEventListener("click", eliminarpro);
  vaciar.addEventListener("click", vaciarcarrito);
  comprar.addEventListener('click', Comprarproductos);

}
 
function Comprarproductos(e) {
  e.preventDefault();
 

  if(compras.length === 0){
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'El carrito está vacío, agrega algún producto',
          showConfirmButton: false,
          timer: 2000
      })
  }
  else {
     console.log(compras)
   
      // LeerProductocomprar(compras);
    //  location.href = "Compras.html";
    //  console.log(CajaProductos)
   
      
  }
}

function vaciarcarrito(e) {
  e.preventDefault();
  if (compras.length === 0) {
    Swal.fire({
      type: "info",
      title: "Opss...",
      text: "El carrito esta vacio,agrega Idiota",
      timer: 2500,
      showConfirmButton: false,
    });

  } else {
    const caja = e.target.parentElement.children[2];
    while (caja.firstChild) {
      caja.removeChild(caja.firstChild);
      // listaProductos.removeChild(listaProductos.firstChild);
    }
    compras = [];
    totalpagar = 0;
    total.innerHTML = totalpagar;
  }
}

function eliminarpro(e) {
  totalpagar = 0;
  if (e.target.classList.contains("borrar-producto")) {
    const Eliminar = e.target.getAttribute("data-id");
    compras.forEach((c, i) => {
      if (c.id === Eliminar) {
        compras.splice(i, 1);
        contadorproductos--;
      }
    });
  }
  MostrarProductoscarrito();
  calculartotal();
}
function AgregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("btns")) {
    const prod = e.target.parentElement.parentElement;
    LeerProducto(prod);
  }
}
function LeerProducto(elemento) {
  totalpagar = 0;
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
  const existe = compras.some((p) => p.id === producto.id);
  if (existe) {
    const com = compras.map((co) => {
      if (co.id === producto.id) {
        co.quantity++;
        return co;
      } else {
        return co;
      }
    });
    compras = [...com];
  } else {
    compras = [...compras, producto];
    contadorproductos++;
  }
 
  MostrarProductoscarrito();
   calculartotal();
}

function MostrarProductoscarrito() {
  Limpiarcajacompras();
  compras.forEach((x) => {
    const { id, product, price, image, quantity, categorias } = x;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
    <td>
    <img src="${image}" width=20 height=20>
    </td>
    <td>${product}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td>
    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${id}"></a>
    </td>
    `;
    Carritos.appendChild(row);
  });
  contadorPro.innerHTML = contadorproductos;
}
function calculartotal() {
  for (let index = 0; index < compras.length; index++) {
    totalpagar += Number(compras[index].price * compras[index].quantity);
  }
  total.innerHTML = Math.round(totalpagar);
}

function Limpiarcajacompras() {
  Carritos.innerHTML = "";
}

// function LeerProductocomprar(){
  
//     compras.forEach((el)=>{
//       const { id, product, price, image, quantity, categorias } = el;
//       const row = document.createElement('tr');
//       row.innerHTML=`
//       <td>
//       <img src="${image}" width=100>
//       <td>
//       <td>${product}</td>
//       <td>${price}</td>
//       <td>
//       <input type="number" class="form-control cantidad" min="1" value=${quantity}>
//       </td>
//       <td>
//       <td id='subtotales'>${price *quantity}</td>
//       </td>
//       <td>
//       <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${id}"></a>
//       </td>
//       `;
//       listaCompra.appendChild(row)
//     });


// }