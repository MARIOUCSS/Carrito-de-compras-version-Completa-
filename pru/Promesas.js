const FrutasShop = document.querySelector(".Productos");
const Busqueda = document.querySelector(".barra-busqueda");
const Filtros = document.querySelectorAll(".btn");
//MODAL CARRITO
//const Carritos = document.querySelector(".cart-items");
const CajaProducto = document.querySelector(".Productos");
const Cajamoda = document.querySelector(".cart-items");
const total = document.querySelector(".cart-total-price");
const contadorPro = document.querySelector("#item-count");
const vaciar = document.querySelector("#VaciarCarrito");
const comprar = document.querySelector("#comprare");
//Compras
const activarf = document.querySelector("#activarfuncion");
if (activarf === true) {
  activarf.addEventListener("click", ProcesarPedido);
}
//Carrito
export let Compras = [];
export let CopiarCompras = [];
let totalpagar = 0;
let contadorProductos = 0;

//Mostrar Frutas Inicio
document.addEventListener("DOMContentLoaded", () => {
  
    MostrarFrutas();
  
  
  SeleccionarFiltro();
  // document.querySelector("#activarFuncion").onclick(ProcesarPedido);
});
//document.addEventListener("click",SeleccionarFiltro)
function MostrarFrutas() {
  const jaja = fetch("pru/FRU.json")
    .then((res) => res.json())
    .then((ap) => {
      MostrarFruta(ap);
    });
}

function MostrarFruta(ap) {


  ap.forEach((x) => {
    let { id, product, price, image, quantity, categorias } = x;
    const div = document.createElement("div");
    div.classList.add("grid");
    div.innerHTML += `
      <img width="220" height="120" src=${image} alt="">
      <h5 class="Fruta-nombre">${product}</h5>
      <div class="items-compra" data-nombre="${product}" data-categoria="${categorias}">
      <h3 class="Fruta-precio">${price}</h3>
      <button class="btns" id=${id} >Agregar Carrito</button>
      </div>
      `;
    FrutasShop.appendChild(div);
  });
}


  Busqueda.addEventListener("keyup", buscarfruta);



  CajaProducto.addEventListener("click", AgregarProducto);



  Cajamoda.addEventListener("click", EliminarProductos);



  vaciar.addEventListener("click", vaciarcarrito);




  comprar.addEventListener("click", ComprarProductos);


// if(activarf){
//   activarf.addEventListener("click",()=>{
//     CopiarCompras=[2,5,6,7,8,9]
//   })
// }

function ComprarProductos(e) {
  e.preventDefault();
  if (Compras.length === 0) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "El carrito está vacío!!!!!!!!!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    location.href = "Compras.html";

    //ProcesarPedido();
  }
}

function vaciarcarrito(e) {
  if (Compras.length === 0) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "El carrito está vacío, agrega algún producto",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    const caja = e.target.parentElement.children[2];
    while (caja.firstChild) {
      caja.removeChild(caja.firstChild);
    }
    Compras = [];
    totalpagar = 0;
    contadorProductos = 0;
    total.innerHTML = totalpagar;
    contadorPro.innerHTML = contadorProductos;
  }
}
function EliminarProductos(e) {
  totalpagar = 0;
  e.preventDefault();
  if (e.target.classList.contains("borrar-producto")) {
    const eliminar = e.target.getAttribute("data-id");
    Compras.forEach((t, i) => {
      if (t.id === eliminar) {
        Compras.splice(i, 1);
        contadorProductos--;
      }
    });
  }
  MostrarProductoscarrito();
  calculartotal();
  contadorPro.innerHTML = contadorProductos;
}
function AgregarProducto(e) {
  if (e.target.classList.contains("btns")) {
    const Produc = e.target.parentElement.parentElement;
    LeerProducto(Produc);
  }
}

function LeerProducto(Pro) {
  totalpagar = 0;
  const Fruta = {
    id: Pro.querySelector(".btns").getAttribute("id"),
    product: Pro.querySelector("h5").textContent,
    price: Pro.querySelector("h3").textContent,
    image: Pro.querySelector("img").src,
    quantity: 1,
    categorias: Pro.querySelector(".items-compra").dataset.categoria,
  };
  const Existe = Compras.some((co) => co.id === Fruta.id);
  if (Existe) {
    const cop = Compras.map((c) => {
      if (c.id === Fruta.id) {
        c.quantity++;
        return c;
      } else {
        return c;
      }
    });
    Compras = [...cop];
  } else {
    Compras = [...Compras, Fruta];

    contadorProductos++;
  }

  MostrarProductoscarrito();
  calculartotal();
}

function calculartotal() {
  for (let index = 0; index < Compras.length; index++) {
    totalpagar += Number(Compras[index].price * Compras[index].quantity);
  }
  total.innerHTML = totalpagar;
}
function MostrarProductoscarrito() {
  Cajamoda.innerHTML = "";
  Compras.forEach((co) => {
    let { id, product, price, image, quantity, categorias } = co;
    // console.log(co)
    const row = document.createElement("tr");
    row.classList.add("item");
    row.innerHTML = `
    <td style='object-fit: cover'>
    <img src="${image}" width=80 >
    </td>
    <td>${product}</td>
    <td>${price}</td>
    <td>${quantity}</td>
    <td>
    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${id}"></a>
    </td>
    `;
    Cajamoda.appendChild(row);
    contadorPro.innerHTML = contadorProductos;
  });
}
function SeleccionarFiltro() {
  Filtros.forEach((fr) => {
    if (fr) {
      fr.addEventListener("click", async (e) => {
        const categoria1 = e.currentTarget.dataset.id;

        const datos = await Traerdatos();
        const pppp = datos.filter((rr) => {
          if (rr.categorias === categoria1) {
            return rr;
          }
        });
        if (categoria1 === "Todos") {
          Mostrar(datos);
        } else {
          Mostrar(pppp);
        }
      });
    }
  });
}
function Mostrar(fr) {
  FrutasShop.innerHTML = "";
  // let frutas=ModificarArray();
  fr.forEach((x) => {
    let { id, categorias, imagen, producto, precio } = x;
    const div = document.createElement("div");
    div.classList.add("grid");
    div.innerHTML += `
   <img width="220" height="120" src=${imagen} alt="">
   <h5 class="Fruta-nombre">${producto}</h5>
   <div class="items-compra" data-nombre="${producto}" data-categoria="${categorias}">
   <h3 class="Fruta-precio">${precio}</h3>
   <button class="btns" id=${id} >Agregar Carrito</button>
   </div>
   `;
    FrutasShop.appendChild(div);
  });
}
//Mostrar por Barra
async function Traerdatos() {
  try {
    const data = await fetch("pru/FRU.json");
    const frut = await data.json();
    const dats = frut.map((fr) => ({
      id: fr.id,
      categorias: fr.categorias,
      imagen: fr.image,
      producto: fr.product,
      precio: fr.price,
    }));
    return dats;
  } catch (error) {
    console.log(error);
  }
}
function buscarfruta() {
  let Fruta = Busqueda.value.toLowerCase();
  const cajasFrutas = document.querySelectorAll(".grid");
  Array.from(cajasFrutas).forEach((el) => {
    let valor = el.querySelector(".items-compra").dataset.nombre;
    if (valor.toLowerCase().indexOf(Fruta) !== -1) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
  Verificartotal(cajasFrutas);
}
function Verificartotal(elemento) {
  let contador = 0;
  for (let index = 0; index < elemento.length; index++) {
    if (elemento[index].style.display === "block") {
      contador++;
    }
  }
  if (contador === 0) {
    document.querySelector(".total").textContent = "No se puede encontrar";
  } else {
    document.querySelector(".total").textContent = "";
  }
}

function ProcesarPedido() {
  Compras.forEach((prod) => {
    const listacompra = document.querySelector("#Listompraca tbody");
    const { id, product, price, image, quantity, categorias } = prod;
    const row = document.createElement("tr");
    row.innerHTML += `
    <td>
    <img width="220" height="120" src=${image} alt="">
    </td>
    <td>
    ${product}
    </td>
    `;
    listacompra.appendChild(row);
  });
  //  console.log("hola");
}
