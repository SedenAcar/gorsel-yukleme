import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const port = 5600 ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/testdb');

app.use('/api',uploadRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
  });