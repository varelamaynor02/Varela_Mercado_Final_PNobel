let dataTable;
let dataTableInicializado = false;

const dataTableOptions = {
  lengthMenu: [3, 5, 10, 25, 50, 100], // Opciones de cantidad de filas por página
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3,4] }, // Centrar el contenido de las columnas
    { orderable: false, targets: [1,2,3] }, // Deshabilitar el ordenamiento en las columnas 0, 4, 5, 6 y 7
    { searchable: false, targets: [1,2,3] }, // Deshabilitar la búsqueda en las columnas 0, 4, 5, 6 y 7
    //{ width: "10%", targets: 0 }// Establecer un ancho fijo para la columna 0
  ],
  pageLength: 3, // Cantidad de filas por página
  destroy: true, // Permite destruir la instancia anterior del DataTable antes de crear una nueva
  language: {
    // Configuración de idioma en español
    lengthMenu: "Mostrar _MENU_ registros por página",
    zeroRecords: "No se encontraron registros",
    //info: "Mostrando página _PAGE_ de _PAGES_",
    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    infoEmpty: "No hay registros disponibles",
    infoFiltered: "(filtrado de _MAX_ registros totales)",
    search: "Buscar:",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
  },
};
const inicializarDataTable = async () => {
    if (dataTableInicializado){
        dataTable.destroy();
    }

    await cargarPnobel();
    dataTable = $("#datatable_pnobel").DataTable(dataTableOptions);
    dataTableInicializado = true;
};


const cargarPnobel = async () => {
    try {
        const respuesta = await fetch("https://api.nobelprize.org/2.1/laureates");
        const datos = await respuesta.json();

        let contenidoTabla = "";

        datos.forEach((pnobel, index) => {
            contenidoTabla += `<tr>
                <td>${index + 1}</td>
                <td>${pnobel.id}</td>
                <td>${pnobel.firstname} ${pnobel.surname}</td>
                <td>${pnobel.born}</td>
                <td>${pnobel.died}</td>
            </tr>`;
        });
       document.querySelector("#tableBody_pnobel").innerHTML = contenidoTabla;
    }
    catch(error)
    {
        alert("Error al cargar los datos: " + error.message);
    }
};

window.addEventListener("load", inicializarDataTable);