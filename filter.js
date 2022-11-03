const frutas = [
  {
    id: 1,
    nombre: "pera",
    precio: 1.5,
  },
  {
    id: 2,
    nombre: "manzana",
    precio: 2.5,
  },
  {
    id: 3,
    nombre: "platano",
    precio: 3.5,
  },
  {
    id: 4,
    nombre: "melocoton",
    precio: 4.5,
  },
];
function pera(fr,n) {
 const ppp=fr.map((ae)=>{
  if(ae.id===n){
     ae.precio++;
     return ae;
  }else{
    return ae;
  }

 })
 return ppp;
}
console.log(pera(frutas,1));
