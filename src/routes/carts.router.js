import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
    res.send('Hola desde carts');
});
router.delete("/:cid/products/:pid", (req,res)=>{
    res.send('Hola desde carts');
});
router.put("/:cid", (req,res)=>{
    res.send('Hola desde carts');
});
router.put("/:cid/products/:pid", (req,res)=>{
    res.send('Hola desde carts');
});
router.delete("/:cid", (req,res)=>{
    res.send('Hola desde carts');
});

export default router;