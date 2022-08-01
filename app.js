const FrutasShop = document.querySelector(".Productos");
const Busqueda = document.querySelector(".barra-busqueda");
const Filtros = document.querySelectorAll(".btn");

window.addEventListener("load", Inicio);
function Inicio() {
  MostrarFrutas();
  SellecionarFiltro();
  //BusquedaFrutas();
}
Busqueda.addEventListener("keyup", buscarfruta);

function buscarfruta() {
  let busqueda = Busqueda.value.toLowerCase();
  const CajasFrutas = FrutasShop.querySelectorAll(".grid");
  Array.from(CajasFrutas).forEach((ele) => {
    console.log(ele);
    let valor = ele.querySelector(".items-compra").dataset.nombre;
    if (valor.toLowerCase().indexOf(busqueda) !== -1) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
  Verificartotal(CajasFrutas);
}
function Verificartotal(elemento){
  let contador=0;
  for (let index = 0; index < elemento.length; index++) {
        if(elemento[index].style.display==='block'){
          contador++;
        }
    
  }
  if(contador===0){
  document.querySelector(".total").textContent='No se puede encontrar';
  }else{
    document.querySelector(".total").textContent='';
  }
}
// function BusquedaFrutas() {
//   //cada vez que escribamos algo Mostrara resultados
//   // Busqueda.addEventListener("input", (e) => {

//   //   e.preventDefault();

//   //   const especifica = document.querySelectorAll(".grid .items-compra");
//   //   const busqueda = e.target.value;
//   //   for (let index = 0; index < especifica.length - 1; index++) {
//   //     if (
//   //       especifica[index].dataset.categoria === busqueda ||
//   //       especifica[index].dataset.nombre === busqueda
//   //     ) {
//   //       const fruta = especifica[index].parentNode;
//   //       const f = {
//   //         id: fruta.querySelector(".btns").getAttribute("id"),
//   //         product: fruta.querySelector("h5").textContent,
//   //         price: fruta.querySelector("h3").textContent,
//   //         image: fruta.querySelector("img").src,
//   //         categorias: fruta
//   //           .querySelector(".items-compra")
//   //           .getAttribute("data-categoria"),
//   //       };

//   //      FrutasShop.innerHTML = "";

//   //       MostrarFrutaF(f);

//   //     } else {
//   //       //mostrar();

//   //       //SellecionarFiltro();
//   //     }
//   //     //id: producto.querySelector('a').getAttribute('data-id'),
//   //   }

//   //   //  prueba.map(fx=>MostrarFrutaF(fx));
//   // });
// }
function mostrar() {
  frutas.map((f) => MostrarFrutaF(f));
}
function MostrarFrutas() {
  // let frutas=ModificarArray();
  frutas.forEach((x) => {
    let { id, product, price, image, quantity, categorias } = x;
    const div = document.createElement("div");
    div.classList.add("grid");
    div.innerHTML += `
    <img width="220" height="120" src=${image} alt="">
    <h5 class="Fruta-nombre">${product}</h5>
    <div class="items-compra" data-nombre="${product}" data-categoria="${categorias}">
    <h3 class="Fruta-precio">${price}</h3>
    <button class="btns" id=${id}>Agregar Carrito</button>
    </div>
    `;
    FrutasShop.appendChild(div);
  });
}
function MostrarFrutaF(x) {
  let { id, product, price, image, quantity, categorias } = x;
  const div = document.createElement("div");
  div.classList.add("grid");

  div.innerHTML = `
      <img width="220" height="120" src=${image} alt="">
      <h5 class="Fruta-nombre">${product}</h5>
      <div class="items-compra" data-nombre="${product}" data-categoria="${categorias}">
      <h3 class="Fruta-precio">${price}</h3>
      <button class="btns" id=${id}>Agregar Carrito</button>
      </div>
      `;
  FrutasShop.appendChild(div);
}
function SellecionarFiltro() {
  Filtros.forEach((f) => {
    // console.log(f)
    f.addEventListener("click", (e) => {
      FrutasShop.innerHTML = "";
      e.preventDefault();
      console.log(e.target);
      const filtra =
        e.target.textContent === "Frutas Acidas"
          ? frutas.filter((ff) => ff.categorias === "Fruta Acida")
          : e.target.textContent === "Frutas Dulces"
          ? frutas.filter((ff) => ff.categorias === "Fruta dulce")
          : e.target.textContent === "Frutas Neutras"
          ? frutas.filter((ff) => ff.categorias === "Fruta neutra")
          : e.target.textContent === "Todos"
          ? frutas.filter((ff) => ff)
          : null;
      filtra.map((fx) => MostrarFrutaF(fx));
    });
  });
}
