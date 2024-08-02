import express from 'express';
import multer from 'multer';
import path from 'path';
import Image from '../models/Image.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // projenin ana dizininde images klasörüne kaydedilecek
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);

    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB sınırı
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Dosya türü desteklenmiyor!');
      }
    }
  });

export const photoUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Dosya yüklenmedi');
        }

        // Yeni bir Image dokümanı oluştur
        const newImage = new Image({
            filename: req.file.filename,
            lastUpdateTime: new Date()
        });
        
        // Dokümanı kaydet
        await newImage.save();
        
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).send('Dosya yüklenirken bir hata oluştu');
    }
};

  const updateFilename = async (req, res) => {
    try {
        const updatePhoto = await Image.find(req.body);
        res.json(updatePhoto);
        res.status(201).send('Güncelleme Başarılı!')
    }catch (error){
        res.status(400).send('Veri değişikliği yapılamadı.')
    }
  };

  const getphoto = async (req, res) => {
    try {
        const image = await Image.findOne().sort({lastUpdateTime: -1});
        res.json(image);
    }catch{
        res.status(404).send('Görsel bulunamadı.')
    }
  }

export default {upload, photoUpload, updateFilename, getphoto};
