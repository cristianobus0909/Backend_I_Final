import mongoose from "mongoose";

const URL_MONGO = 'mongodb+srv://clbcristian:tpeyLRnudLy27oi2@cluster0.jpsemmz.mongodb.net/';
const connectionDb = async()=>{
    try {
        await mongoose.connect(URL_MONGO,{dbName: 'ecommerce'})
        console.log('Mongoose Conected...');
        
    } catch (error) {
        console.error('Failed to connect to BD', error);
        process.exit(1);
    }
    
}


export default connectionDb;