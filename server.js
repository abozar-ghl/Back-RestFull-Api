const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const expressValidator = require('express-validator');
global.config = require('./modules/config');  //همه جای برنامه استفاده میشه
const cors = require('cors')

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/gashnix' , { useMongoClient : true });
mongoose.Promise = global.Promise;

//Cors


app.use(bodyParser.urlencoded({ extended : false }));    //نوع ارسال اطلاعات مثلا فرم دیتا یا ...
app.use(bodyParser.json({ type : 'application/json' }));   
app.use(expressValidator());
app.use('/public' , express.static('public'))

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

app.use('/api' , apiRouter)
app.use('/' , webRouter);

app.use(cors())

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});