const productoAPI = "https://api.yumserver.com/15273/generic/productos";
const categoriaAPI = "https://api.yumserver.com/15273/generic/categorias";

fetch(productoAPI)
.then(response => response.json())
.then(verProductos)
.catch(error => console.error('Error:', error));

function verProductos (productos){
    let html='';
    for (let i = 0; i < productos.length; i++)
         {
        html +=`<tr>
        <td>${productos[i].param1} </td>
        <td>${productos[i].param2} </td>
        <td>${productos[i].param3} </td>
        <td>${productos[i].param4} </td>
        <td><button onclick="abrirFormulario('${productos[i].idcod}')">Editar</button></td>
        <td><button onclick="eliminarProducto('${productos[i].idcod}')">Eliminar</button></td>
        </tr> `;
        
    }
    document.getElementById('identificador').innerHTML=html;
}

function verCategorias() {
    fetch(categoriaAPI)
        .then(response => response.json())
        .then(categorias => {
            let categoriaSelect = document.getElementById("categoriaProducto");
            categoriaSelect.innerHTML = `<option value="">Seleccionar Categoría</option>`;
            categorias.forEach(categoria => {
                categoriaSelect.innerHTML += `<option value="${categoria.param1}">${categoria.param1}</option>`;
            });
        })
        .catch(error => console.log("Error al cargar categorías: ", error));
}

// Función para cargar categorías en el select de edición
function cargarCategoriasEnEdicion() {
  fetch(categoriaAPI)
    .then(response => response.json())
    .then(categorias => {
      let categoriaSelect = document.getElementById("categoriaSelectEditado");
      categoriaSelect.innerHTML = `<option value="">Seleccione una categoría</option>`;
      categorias.forEach(categoria => {
        categoriaSelect.innerHTML += `<option value="${categoria.idcod}">${categoria.param1}</option>`;
      });
    })
    .catch(error => console.log("Error al cargar categorías: ", error));
}



function agregarProductos() {
        fetch(productoAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                param1: document.getElementById("tituloProducto").value.trim(),
                param2: document.getElementById("precioPeso").value.trim(),
                param3: document.getElementById("precioDolar").value.trim(),
                param4: document.getElementById("categoriaProducto").value.trim()
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === "OK") {
                verProductos();
                document.getElementById("tituloProducto").value = "";
                document.getElementById("precioPeso").value = "";
                document.getElementById("precioDolar").value = "";
                document.getElementById("categoriaProducto").value = "";
            } else {
                alert("Error al agregar producto: " + data);
            }
        })
        .catch(error => console.log("Error: ", error));
}
function cerrarDialog(id) {
  document.getElementById(id).close();
}

function eliminarProducto(Idcod){
  if(confirm("¿Quieres eliminar el producto?")){
      fetch(productoAPI, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          idcod: Idcod  
          })
          })
          .then(response => response.text())
          .then(function (respuesta){
              if (respuesta == "OK"){
                  alert ("Producto Eliminado")
              }
              else {
                  alert (respuesta)
              }
          
          })
          .catch(error => console.error('Error:', error));
  }
 
  }

  function editarProducto(Idcod){
    fetch(productoAPI, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    idcod:Idcod,         
    idcod: document.getElementById("id").value,
    param1: document.getElementById("tituloProductoEditado").value,
    param2: document.getElementById("precioPesoEditado").value,
    param3: document.getElementById("precioDolarEditado").value,
    param4: document.getElementById("categoriaSelectEditado").value 
    })
    })
    .then(response => response.text())
    .then(function (respuesta){
        if (respuesta == "OK"){
            alert ("Producto modificado")
        }
        else {
            alert (respuesta)
        }
    
    })
    .catch(error => console.error('Error:', error));

    document.getElementById("editarForm").close();
    }  

    function abrirFormulario(idcod) {
      console.log(idcod);
      let dialog = document.getElementById("formularioEditar");
      dialog.showModal();
      document.getElementById("id").value = idcod;
    }

document.addEventListener("DOMContentLoaded", function() {
    verCategorias();
    verProductos();
});
