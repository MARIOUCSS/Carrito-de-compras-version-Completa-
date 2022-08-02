const infocarrito=document.querySelector('.cart-info');
const carrito=document.querySelector('.cart');

infocarrito.addEventListener('click',()=>{
carrito.classList.toggle('show-cart');
})