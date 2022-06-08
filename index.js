const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();

const postRoutes = require('./router/post');

app.use(express.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/posts', postRoutes);

app.listen(3000, () => console.log('Server listening on 3000'));