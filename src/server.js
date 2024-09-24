const path = require('path');
const express = require('express')
const cors = require('cors');
const morgan = require('morgan')

const {
  engine
} = require('express-handlebars');

const mysql = require('mysql2/promise');

const cookieParser = require('cookie-parser');


require('dotenv').config()
const app = express()
// app.use(cors());

app.use(cors({
  origin: 'http://127.0.0.1:5500', // address frontend
  credentials: true // accept cookie cùng request
}));

app.use(morgan('combined'))
// config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieParser('SECRET_KEY')); // Thêm dòng này để cấu hình cookie-parser

console.log(">>> check env ", process.env);
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;


const route = require('./routes')
app.use(express.static(path.join(__dirname, 'public')));

// template engine 
// app.engine('hbs', engine({
//   extname: '.hbs'
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resource/views'));

route(app);

let configDB = {
  host: '35.185.178.198',
  user: 'bac_db',
  database: 'bac_db',
  password: 'xn8jLMFZF8ZGeJWM',
}
let cofigDBfromEnv = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}
console.log(cofigDBfromEnv, 'cofigDBfromEnv')
console.log(configDB, 'configDb');
const connection = mysql.createConnection(cofigDBfromEnv);



app.listen(port, hostname, () => {
  console.log(`Example app listening on port:http://localhost:${port}`)
})