import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    res.send("Hello World");
});
viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render('realTimeProducts',{});
});
viewsRouter.post("/realtimeproducts", (req, res) => {
    res.send("Hello World");
});
viewsRouter.get("/products", (req, res) => {
    res.render('home',{});
});

export default viewsRouter;