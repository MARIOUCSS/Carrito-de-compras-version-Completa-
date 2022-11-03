
const listaCompra = document.querySelector("#carritos tbody");
CargarEventos();


function CargarEventos(){
document.addEventListener("DOMContentLoaded",LeerProductocomprar);
}
//window.onload=LeerProductocomprar;
function LeerProductocomprar(){
  
    compras.forEach((el)=>{
      const { id, product, price, image, quantity, categorias } = el;
      const row = document.createElement('tr');
      row.innerHTML=`
      <td>
      <img src="${image}" width=100>
      <td>
      <td>${product}</td>
      <td>${price}</td>
      <td>
      <input type="number" class="form-control cantidad" min="1" value=${quantity}>
      </td>
      <td>
      <td id='subtotales'>${price *quantity}</td>
      </td>
      <td>
      <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${id}"></a>
      </td>
      `;
      listaCompra.appendChild(row)
    });


}