import { Router } from "express";
import ProductModel from "../models/products.model.js"
import bodyParser from 'body-parser';

const viewsRouter = Router();

viewsRouter.use(bodyParser.json());

viewsRouter.get("/", async(req, res) => {
    let products = await ProductModel.find()
    products = await ProductModel.aggregate([
        { $group: { _id: "$category", total: { $sum: "$price" }}},
        
    ])
    res.render('home',{
        title: 'Backend | Handlebars',
        products: products
    });
});
viewsRouter.get("/realtimeproducts", async(req, res) => {
    let products = await ProductModel.find()
    res.render('realTimeProducts',{products:products});
});
viewsRouter.post('/realtimeproducts', async(req, res)=>{
    const {
        title,
        description,
        price,
        category,
        thumbnails,
        code,
        stock
    } = req.body;
    
    const status = true
    try {
        const newProduct =  await productManager.addProduct(title,description,price,category,thumbnails,status,code,stock);
        console.log(newProduct);
        io.emit('productAdded', { product: newProduct });
        
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send("Error interno del servidor");
    }
    res.redirect('/realtimeproducts');
})
viewsRouter.delete('/realtimeproducts', async(req, res)=>{
    const productId = req.body.id
    
    try {
        await productManager.deleteProduct(productId)
        
        io.emit('productDeleted', { message: `Producto  con ID: ${productId} eliminado` });
        res.status(200).send("Producto eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar el producto:", error)
        res.status(500).send("Error interno del servidor al eliminar el producto");
    }
    res.redirect('/realtimeproducts');
    
})


export default viewsRouter;