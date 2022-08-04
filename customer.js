//donde se almacena todos los productos;
let Allproductos = document.querySelector(".products");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
//el array donde almacena
let compras = [];
let totalCard = 0;
let countProduct = 0;
//funciones
cargar();
function cargar() {
  Allproductos.addEventListener("click", (e) => {
    agregarprod(e);
  });
  containerBuyCart.addEventListener("click", (e) => {
    deleteProduct(e);
  });
}
//
deleteProduct = (e) => {
  if (e.target.classList.contains("delete-product")) {
    const deleteid = e.target.getAttribute("data-id");
    compras.forEach(value => {
      if (value.id == deleteid) {
          let priceReduce = parseFloat(value.precio) * parseFloat(value.amount);
          totalCard =  totalCard - priceReduce;
          totalCard = totalCard.toFixed(2);
      }
  });
    compras = compras.filter((comp) => comp.id !== deleteid);
    countProduct--;
  }
  cargarhtml();
};
agregarprod = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("btn-add-cart")) {
    const elemento = e.target.parentElement;
    leercontenido(elemento);
  }
};
leercontenido = (elemento) => {
  const product = {
    image: elemento.querySelector("div img").src,
    titulo: elemento.querySelector(".title").textContent,
    precio: elemento.querySelector("div p span").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
    amount: 1,
  };

  totalCard = parseFloat(totalCard) + parseFloat(product.precio);
    totalCard = totalCard.toFixed(2);
  const exist = compras.some(pr => pr.id === product.id);
  if (exist) {
      const pro = compras.map(comp => {
          if (comp.id === product.id) {
              comp.amount++;
              return comp;
          } else {
              return comp;
          }
      });
      compras = [...pro];
  } else {
      compras = [...compras,product]
      countProduct++;
  }

  cargarhtml();
  console.log(compras);
};
cargarhtml = () => {
  clearHtml();
  compras.forEach((comp) => {
    const { image, titulo, precio, id, amount } = comp;
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${titulo}</h5>
                <h5 class="cart-price">${precio}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
    containerBuyCart.appendChild(row);
    priceTotal.innerHTML = totalCard;

    amountProduct.innerHTML = countProduct;
  });
};
function calculartotal(){



  
}
function clearHtml() {
  containerBuyCart.innerHTML = "";
}
