require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')
const multer = require('multer');

const { PORT } = process.env;

const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileExists = (fileName) => {
  //fs.readdirSync retorna uma lista com nome de todos os arquivos da pasta uploads.
  const files = fs.readdirSync(`${__dirname}/uploads`);
  //Aqui usamos a função some, que retorna `true` se algum dos items do array passar no teste, no nosso caso o `file.includes`.
  return files.some(file => file === fileName);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'uploads') },
  filename: (req, file, callback) => { callback(null, `${Date.now()}-${file.originalname}`) }
})

const fileFilter = (req, file, cb) => {

  if (file.mimetype !== 'image/png') {
    //Colocar uma mensagem de erro na requisição
    req.fileValidationError = true;

    //Rejeitar o arquivo
    return cb(null, false);
  }

  if (fileExists(file.originalname)) {
    //Colocar uma flag de erro na requisição
    req.fileDuplicated = true;

    //Rejeitar o arquivo
    return cb(null, false);
  }

  //Aceitar o arquivo
  cb(null, true);
}

const upload = multer({ storage });

const defaultStorage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'uploads') }})

const multiUpload = multer({ storage: defaultStorage })

app.get('/ping', controllers.ping);
app.post('/upload', controllers.upload);
app.post('/upload', upload.single('file'),controllers.upload);
app.post('/multiple', controllers.multiple);
app.post('/multiple', multiUpload.array('files'), controllers.multiple);

app.use(express.static(`${__dirname}/uploads`));

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
