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
    console.log(`Running on port: ${PORT}`);

})

connectionDb();

const socketServer = new Server(httpServer)

export {socketServer}
