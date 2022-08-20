let urlBase = "https://localhost:3000/api";
let formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) => {
    event.preventDefault(); //cancela el evento por defecto que tiene el submit(evita que refresque)
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);  IMPRIME EL VALOR DE LOS INPUT
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // console.log(email, password);  IMPRIME EL VALOR DE LOS INPUT

    login(email, password); //retorna en consola si el usuario es existente
});

// LLAMANDO A LA API
const login = async (email, password) => {
    try {
        const response = await fetch(urlBase + "/login", {
            method: "POST",
            body: JSON.stringify({ email, password }), //TIP . se puede suprimir email: email si tienen el mismo nombre y no se le desea asignar uno nuevo
        }); // en las llaves se le pasa otro argumento que mediante POST debe recibir un usuario y una contraseña a verificar
        const { token } = await response.json();
        localStorage.setItem("token", token);
        $("#contenedorFormulario").hide();
        getPost(token);
    } catch (error) {
        console.log(error);
    }
};

const getPost = async (jwt) => {
    try {
        const response = await fetch(urlBase + "/posts", {
            method: "POST",
            headers: {
                authorization: `Bearer ${jwt}`,
            },
        });
        const { data } = await response.json();
        if (data) {
            cargarTabla(data);
        } else {
            alert("Datos no recibidos.");
        }
    } catch (error) {
        console.log(error);
    }
};

const cargarTabla = (posts) => {
    let tablaPosts = document.getElementById("cuerpoTablaPost");
    // console.log(posts);
    let acumulador = "";

    posts.forEach((post) => {
        // console.log(post)
        acumulador += `
            <tr>
                <td>${post.id}</td>                
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>${post.userId}</td>
            </tr>
        `
    });
    tablaPosts.innerHTML = acumulador;

    $("#tablaPost").show();
};

document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    inicio();
})


const inicio = () => {
    const token = localStorage.getItem("token");
    if (token) {
        $("#contenedorFormulario").hide();
        $("#logout").show();
        // $("#contenedorFormulario").removeClass("d-block").addClass("d-none");
        // $("#contenedor_tabla").removeClass("d-none").addClass("d-block");
        getPost(token);
    } else {
        // $("#contenedorFormulario").removeClass("d-none").addClass("d-block");
        // $("#contenedor_tabla").removeClass("d-block").addClass("d-none");
        $("#contenedorFormulario").show();
    }
};
inicio();


const getAlbum = async (lbm) => {
    try {
        const response = await fetch(urlBase + "/albums", {
            method: "POST",
            headers: {
                authorization: `Bearer ${lbm}`,
            },
        });
        const { data } = await response.json();
        if (data) {
            console.log(data); // !!!!!
        } else {
            alert("datos no recibidos");
        }
    } catch (error) {
        console.log(error);
    }
}

const tablaAlbums = (albums) => {
    let tablaAlbums = document.getElementById("cuerpoTablaAlbum");
    let acumulador = "";

    albums.forEach((album) => {
        acumulador += `
            <tr>
                <td>${album.}</td>
                <td>${album.}</td>
                <td>${album.}</td>
                <td>${album.}</td>
                <td>${album.}</td>
            </tr>
        
        `
    });

    tablaAlbums.innerHTML = acumulador;

    $("#tablaAlbum").show();
}

