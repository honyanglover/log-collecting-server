const express = require('express');
const app = express();
const PORT = 80;

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/test', (req, res) => {
    console.log(req.body);
    res.send({ code: 200 });
});

app.listen(PORT, () => console.log(`Connected ${PORT} port!`));