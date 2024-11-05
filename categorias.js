const categoriaAPI = "https://api.yumserver.com/15273/generic/categorias";

function verCategorias() {
  fetch(categoriaAPI)
    .then(response => response.json())
    .then(categorias => {
      let listaCategorias = document.getElementById("listaCategorias");
      listaCategorias.innerHTML = "";
      categorias.forEach(categoria => {
        listaCategorias.innerHTML += `
          <tr>
            <td>${categoria.param1}</td>
            <td><button onclick="mostrarEditarCategoria('${categoria.idcod}', '${categoria.param1}')">Editar</button></td>
            <td><button onclick="eliminarCategoria('${categoria.idcod}', '${categoria.param1}')">Eliminar</button></td>
          </tr>
        `;
      });
    })
    .catch(error => console.log("Error al cargar categorías: ", error));
}

function agregarCategoria() {
  let nombreCategoria = document.getElementById("nombreCategoria").value.trim();

  if (nombreCategoria) {
    fetch(categoriaAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ param1: nombreCategoria })
    })
    .then(response => response.text())
    .then(data => {
      if (data === "OK") {
        document.getElementById("nombreCategoria").value = "";  
        verCategorias();  
      } else {
        alert("Error al agregar categoría: " + data);
      }
    })
    .catch(error => console.log("Error: ", error));
  } else {
    alert("Por favor, ingrese un nombre para la categoría.");
  }
}

function mostrarEditarCategoria(id, nombreActual) {
  document.getElementById("idCategoriaEditada").value = id;
  document.getElementById("nombreCategoriaEditada").value = nombreActual;
  document.getElementById("formularioEditarCategoria").showModal();
}

function editarCategoria(Idcod){
  fetch(categoriaAPI, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  idcod:Idcod,         
  idcod: document.getElementById("idCategoriaEditada").value,
  param1: document.getElementById("nombreCategoriaEditada").value
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

function eliminarCategoria(Idcod){
  if(confirm("¿Quieres eliminar el producto?")){
      fetch(categoriaAPI, {
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

function cerrarDialog(dialogId) {
  document.getElementById(dialogId).close();
}
