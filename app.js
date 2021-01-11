const express = require('express');
const app = express();
const PORT = 80;

const fs = require('fs');
const path = require('path');


const getDate = time => {
    let date = '';
    const setPlace = n => n >= 10 ? n : `0${n}`;

    date += time.getFullYear() - 2000;
    date += setPlace(time.getMonth() + 1);
    date += setPlace(time.getDate());
    date += '-';
    date += setPlace(time.getHours());

    return date;
};

const writeLog = (filePath, data, cb) => fs.writeFile(filePath, JSON.stringify(data), 'utf8', cb);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.post('/', (req, res) => {
    const now = new Date();
    const date = getDate(now);
    const data = { time: now, body: req.body };

    let filePath = __dirname;

    const mkdir = adding => {
        filePath = path.join(filePath, adding);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
    };

    const endCallback = err => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    };

    mkdir('logs');
    mkdir(date.split('-')[0]);
    filePath = path.join(filePath, `${date}.json`);

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, json) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                writeLog(filePath, [...JSON.parse(json), data], endCallback);
            }
        });
    } else {
        writeLog(filePath, [data], endCallback);
    }
});

app.listen(PORT, () => console.log(`Connected ${PORT} port!`));