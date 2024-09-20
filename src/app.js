import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import connectionDb from './config/database.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(PORT,()=>{
    console.log(`Running...🏃‍♂️: http://localhost:${PORT}/`);

})

connectionDb();

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
    console.log(`User ${socket.id} Connection`);

    let userName = "";
    
    socket.on("userConnection", async (data) => {
        userName = data.user;
        let userMail = data.email;
        message.push({
            id: socket.id,
            info: "connection",
            name: data.user,
            email: data.email,
            message: `${data.user} Conectado`,
            date: new Date().toTimeString(),
        });
        const messageUser = message.find(e => e.email === userMail);

        console.log(messageUser);
        await messageModel.create({user: userMail, message:messageUser.message, date:messageUser.date});
        console.log(message);
        socketServer.sockets.emit("userConnection", { message, nameUser: userName });
    });

    socket.on("userMessage", (data) => {
        message.push({
            id: socket.id,
            info: "message",
            name: userName,
            message: data.message,
            date: new Date().toTimeString(),
        });

        socketServer.sockets.emit("userMessage", message);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});

export {socketServer}
