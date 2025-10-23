import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// URL encoded body पढ़ने के लिए
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRoutes);

connectDB();

app.listen(PORT, () => console.log(`Server running on port:http://localhost:5000 ${PORT}`));
