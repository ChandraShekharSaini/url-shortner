import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectdatabase = async () => {
//   mongoose
//     .connect('mongodb://127.0.0.1:27017/short-url')
     mongoose.connect('mongodb+srv://Chandra:n5VxiBS9ZgsoEgJF@mern-ecommerce.5ryrn.mongodb.net/?retryWrites=true&w=majority&appName=mern-ecommerce')
    .then(() => console.log('Mongodb connected....'))
    .catch((err) => console.log('Error occur :', err));
};

export default connectdatabase;
