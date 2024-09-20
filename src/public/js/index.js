const userName = document.querySelector(".userName");
const socket = io();
let nameUser = "";
let emailUser = "";


Swal.fire({
    title: "Ingrese su Nombre",
    html:
        '<input id="name" class="swal2-input" placeholder="Nombre" autocapitalize="on">' +
        '<input id="email" class="swal2-input" placeholder="Correo Electrónico" autocapitalize="on">',
    showCancelButton: false,
    confirmButtonText: "Ingesar",
}).then((result) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (result.isConfirmed) {
        // console.log(name);
        // console.log(email);
        nameUser = name;
        emailUser = email
        socket.emit("newUser", name, email);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert("Por favor ingrese un nombre de usuario")
    }
    userName.textContent = name;
    console.log(nameUser);
    nameUser = name;
    emailUser = email;
    console.log(emailUser, nameUser);
    socket.emit("userConnection", {
        user: nameUser,
        email: emailUser
    });
});
const chatMessage = document.querySelector(".chatMessage");
let idUser = "";
const messageInnerHTML = (data) => {
    let message = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].info === "connection") {
            message += `<p class="connection">${data[i].message}</p>`;
        }
        if (data[i].info === "message") {
            message += `
            <div class="messageUser">
                <h5>${data[i].name}</h5>
                <p>${data[i].message}</p>
            </div>
            `;
        }
    }

    return message;
};

socket.on("userConnection", (data) => {
    if (data && data.length > 0) {
        chatMessage.innerHTML = `<p>${data[0].message}</p>`;
        const connection = messageInnerHTML(data);
        chatMessage.innerHTML = connection;
    } else {
        console.error("No hay mensajes para mostrar.");
    }
});

const inputMessage = document.getElementById("inputMessage");
const btnMessage = document.getElementById("btnMessage");

btnMessage.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("userMessage", {
    message: inputMessage.value,
    });
});

socket.on("userMessage", (data) => {
    chatMessage.innerHTML = "";
    const message = messageInnerHTML(data);
    chatMessage.innerHTML = message;
});

inputMessage.addEventListener("keypress", () => {
    socket.emit("typing", { nameUser });
});

const typing = document.querySelector(".typing");
socket.on("typing", (data) => {
    typing.textContent = `${data.nameUser} escribiendo...`;
});

document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const price = e.target.elements.price.value;
    const description = e.target.elements.description.value;
    const category = e.target.elements.category.value;
    const thumbnails = e.target.elements.thumbnails.value;
    const code = e.target.elements.code.value;
    const stock = e.target.elements.stock.value;
    socket.emit('addProduct', {
        title: title,
        price: price,
        description: description,
        category: category,
        thumbnails: thumbnails,
        code: code,
        stock: stock
    });
    socket.on('productAdded', (data) => {
        console.log('Nuevo producto agregado:', data.product);
    });
    e.target.elements.title.value = '';
    e.target.elements.price.value = '';
    e.target.elements.description.value = '';
    e.target.elements.category.value = '';
    e.target.elements.thumbnails.value = '';
    e.target.elements.code.value = '';
    e.target.elements.stock.value = '';
});


document.getElementById('deleteProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements.productId.value;
    socket.emit('deleteProduct', { id: id });

    e.target.elements.productId.value = ''


});
socket.on('productDeleted',(data)=>{
    console.log(data.message)
})


