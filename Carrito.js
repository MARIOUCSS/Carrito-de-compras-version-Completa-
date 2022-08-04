const CajaProductos = document.querySelector(".Productos");
const Carritos = document.querySelector(".cart-items");
const contadorPro = document.querySelector("#item-count");
const total = document.querySelector(".cart-total-price");
const Eliminar=document.querySelector('.delete-product');
const item=document.querySelector('item');
const vaciar=document.querySelector('#VaciarCarrito');
const comprar=document.querySelector('#comprar');
let compras = [];
let contadorproductos = 0;
let totalpagar = 0;

Cargar();
function Cargar() {
 
  CajaProductos.addEventListener("click", AgregarProducto);
  Carritos.addEventListener("click",eliminarpro);
  vaciar.addEventListener('click', vaciarcarrito)
  comprar.addEventListener('click',Comprarproductos)
}
function Comprarproductos(){
  if(compras.length===0){
    alert('Tiene que comprar');
  }else{
    alert('Felicitaciones por la compra')
  }
}
function vaciarcarrito(e){
  e.preventDefault();
  const caja=e.target.parentElement.children[2];
  while(caja.firstChild){
    caja.removeChild(caja.firstChild);
    // listaProductos.removeChild(listaProductos.firstChild);
  }
  compras=[];
  totalpagar=0;
  total.innerHTML = totalpagar;
}

function eliminarpro(e){
  totalpagar=0;
   if(e.target.classList.contains('borrar-producto')){
     const Eliminar=e.target.getAttribute('data-id');
     compras.forEach((c,i)=>{
      if(c.id===Eliminar){
        compras.splice(i,1);
         contadorproductos--;
      }
     })
   }
   MostrarProductoscarrito();
   calculartotal()
  
}
function AgregarProducto(e) {
  if (e.target.classList.contains("btns")) {
    const prod = e.target.parentElement.parentElement;
    LeerProducto(prod);
  }
}
function LeerProducto(elemento) {
  totalpagar=0;
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
 calculartotal() ;
  MostrarProductoscarrito();

 
}

function MostrarProductoscarrito() {
  Limpiarcajacompras();
  compras.forEach((x) => {
    const { id, product, price, image, quantity, categorias } = x;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
    <td>
    <img src="${image}" width=100>
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
  total.innerHTML = totalpagar;
}

function Limpiarcajacompras() {
  Carritos.innerHTML = "";
}

