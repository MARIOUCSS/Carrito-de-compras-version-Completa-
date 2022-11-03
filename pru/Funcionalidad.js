const carrito = document.querySelector(".cart-info");
const carro=document.querySelector(".cart");
carrito.addEventListener("click", () => {
  carro.classList.toggle('show-cart')
});

// const infocarrito=document.querySelector('.cart-info');
// const carrito=document.querySelector('.cart');

// infocarrito.addEventListener('click',()=>{
// carrito.classList.toggle('show-cart');
// })