import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category:String,
    thumbnails:{
        type:Array,
        default:{
            type: String,
            imagePath: 'https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg?w=740&t=st=1699187254~exp=1699187854~hmac=6dc0424826b7aa7168fb633cb9a20b855b2a863526e6e6a7f16a72dfa69f47ba'
        }
    }
})