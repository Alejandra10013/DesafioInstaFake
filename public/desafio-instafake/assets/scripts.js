let urlBase = "http://localhost:3000/api";
let formulario = document.getElementById("formulario");
let paginador = 1;

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  login(email, password);
});

// Primera llamada Api (token)
const login = async (email, password) => {
  try {
    const response = await fetch(urlBase + "/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();
    localStorage.setItem("token", token);
    inicio(token);
    getFotos(token);
  } catch (error) {
    console.log(error);
  }
};

// Segunda llamada Api (photos)
const getFotos = async (jwt, page = 1) => {
  try {
    const response = await fetch(urlBase + "/photos?page=" + page, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      cargarFotos(data);
    } else {
      alert("datos no recibidos");
    }
  } catch (error) {
    console.log(error);
  }
};

const cargarFotos = (fotos) => {
  let fotoCard = document.getElementById("fotoCard");
  let acumulador = "";

  fotos.forEach((foto) => {
    acumulador += `
    <div class="card col-4 my-3 mx-3" style="width: 18rem">
        <img src="${foto.download_url}" class="card-img-top img-fluid mt-3 mb-2" alt="..." />
        <div class="card-footer my-2">
            <span>${foto.author}</span>
        </div>
    </div>
    `;
  });
  fotoCard.innerHTML = acumulador;
};

// const validarPaginador = () => {
//   if (paginador <= 1) {
//     $("#anterior").addAttribute("disable");
//   } else {
//     $("#anterior").removeAttribute("disable");
//   }
// };

// let totalPaginas = document.getElementById("totalPaginas");
// totalPaginas.innerHTML = paginador.length;

const inicio = () => {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  const token = localStorage.getItem("token");
  if (token) {
    $("#grupoFormulario").hide();
    $("#fotoCard").show();
    $("#barraNav").show();
    getFotos(token);
  } else {
    $("#grupoFormulario").show();
    $("#barraNav").hide();
  }
};
inicio();

// Boton Avanzar
let siguiente = document.getElementById("siguiente");
siguiente.addEventListener("click", () => {
  paginador++;
  let jwt = localStorage.getItem("token");
  // validarPaginador();
  paginaActual.innerHTML = paginador;
  getFotos(jwt, paginador);
});

// Boton Retroceder
let retroceder = document.getElementById("anterior");
retroceder.addEventListener("click", () => {
  paginador--;
  if (paginador == 0) {
    paginador = 1;
  }
  let jwt = localStorage.getItem("token");
  // validarPaginador();
  paginaActual.innerHTML = paginador;
  getFotos(jwt, paginador);
});

//BOTON CERRAR
// limpia el localStorage y vuelve a lanzar la app
$("#btnCerrar").click(() => {
  localStorage.clear();
  window.location.reload();
});
