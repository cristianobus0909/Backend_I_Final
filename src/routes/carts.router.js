import { Router } from "express";
import cartsModel from "../models/carts.model.js";
import ProductModel from "../models/products.model.js";

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const allCarts = await cartsModel.find();
        return res.status(201).send(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});
router.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cartProducts = await cartsModel.findById({_id:cartId}).exec();
        if (!cartProducts) {
            return res.status(404).json({ message: 'No se encontró el carrito.' })
        } else {
            return res.status(200).send(cartProducts);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.post("/", async (req, res) => {
    try {
        const newCart = await cartsModel.create({...req.body});
        return res.status(201).send(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});
router.put("/:cid/products/:pid", async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        const cart = await cartsModel.findOne({ _id: cartId });
        const product = await ProductModel.findById({_id: productId});

        if(!cart){
            return res.status(404).json({message:'Carrito no encontrado'})
        }
        if (!product) {
            return res.status(404).json({message: "Producto no encontrado"})
        }
        cart.products.push({ productId: product.id, quantity: quantity });
        console.log(cart.products);
        
        const result = await cartsModel.updateOne({ _id: cart._id }, { products: cart.products });
        console.log(result);
        
        res.status(201).json({
            message: 'Producto agregado al carrito correctamente',
            result,
        });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
});

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;
    
    try {
        const cart =  await cartsModel.findOne({_id:cartId});
        if(!cart){
            return res.status(404).json({message:'Carrito no encontrado'})
        };
        
        await cartsModel.updateOne({ _id: cart._id },{products:products}, function(err, result ){
            if(err){
                res.status(500).json({ error:'Error al guardar los cambios' });
            }else{
                res.status(201).send(result);
            }  
        });
    } catch (error) {
        console.error(error,"Error al actualizar el producto")
        res.status(500).send("No se pudo actualizar el documento")
    }
});

router.put("/:cid/products/:pid", async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity);
    try {
        const cart =  await cartsModel.findOne({_id:cartId});
        
        if(!cart){
            return res.status(404).json({message:'Carrito no encontrado'})
        }
        if (cart.products.productId == productId) {
            cart.products.quantity = quantity
        }
        
        await cartsModel.updateOne({ _id: cart._id },{ products: cart}, function(err, result ){
            if(err){
                res.status(500).json({ error:'Error al guardar los cambios' });
            }else{
                res.status(201).send(result);
            }  
        });
        res.json({ message: 'Producto agregado al carrito correctamente', cart });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
});
router.delete('/:cid', async (req, res)=>{
    const cartId = req.params.cid;
    try {
        const deleteCart = await cartModel.updateOne({_id:cartId},  { $set: { products: [] } },
            (err, result) => {
                if (err) {
                console.error('Error al vaciar el carrito:', err);
                
                } else {
                console.log('Carrito de productos vacío:', result);
                
                }
            });
        if (!deleteCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json({ message: 'Carrito eliminado con éxito', data: deleteCart });
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).json({ error: 'No se pudo eliminar el carrito' });
    }
});

export default router;