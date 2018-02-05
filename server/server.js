const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.ENV.PORT || 3000;

const app = express();

//app.get('/', (req, res) => {
////    res.sendFile(path.join(__dirname, '../public/index.html'));
//});

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log("Started up on port", port);
});
