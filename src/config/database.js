import mongoose from "mongoose";

const URL_MONGO = 'mongodb+srv://clbcristian:tpeyLRnudLy27oi2@cluster0.jpsemmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectionDb = async () => {
    try {
        await mongoose.connect(URL_MONGO, {
            dbName: 'ecommerce'
        });
        console.log(`Mongoose connected to database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1);
    }
};

export default connectionDb;