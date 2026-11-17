/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidasConForEach(comidas)
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];


  const comidaContainer = document.getElementById('comidaContainer');
  function mostrarComidasConForEach(lista = comidas){
  comidaContainer.innerHTML = "";


  lista.forEach(comida => {
    comidaContainer.innerHTML += `
    <article class="card">
      <h2>${comida.nombre}</h2>
      <p>${comida.provincia}</p>
      <span>${comida.categoria}</span>
      <ul>
      ${comida.ingredientes.map(ingrediente => 
        `<li> ${ingrediente}<li>`).join('')}
      </ul>
    </article>
    `
  })
}

mostrarComidasConForEach(comidas)

const agregarComida = document.getElementById("agregarComidaForm");


agregarComida.addEventListener("submit", (event) => { 
   event.preventDefault()
  alert("Comida agregada: " + event.target.nombre.value)


  let nuevaComida = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: event.target.ingredientes.value.split(",")
  }


  console.log(nuevaComida)
  comidas.push(nuevaComida)
  mostrarComidasConForEach()
  event.target.reset()
})

const buscador = document.getElementById("buscador")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("filtroProvincia")

function  filtrar () {
 

    let comidasFiltradas = comidas.filter (comida => {
      return comida.categoria.includes(filtroCategoria.value)
      && comida.provincia.includes(filtroProvincia.value)
    })
  }

  mostrarComidasConForEach(comidasFiltradas)

function buscar() {
  const texto = buscador.value.toLowerCase()
const comidasFiltradas = comidas.filter( comida => {
return comida.nombre.tolowerCase().includes(busqueda.value.tolowerCase())
||comida.provincia.tolowerCase().includes(busqueda.value.tolowerCase())
||comida.categoria.tolowerCase().includes(busqueda.value.tolowerCase())

})
mostrarComidasConForEach(comidasFiltradas)
}

filtroCategoria.addEventListener("change", filtrar)
filtroProvincia.addEventListener("change", filtrar)
buscador.addEventListener("input", buscar)
