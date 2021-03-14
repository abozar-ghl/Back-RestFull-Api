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


//exist Sequance Collection 
mongoose.connection.on('open', function (ref) {
    console.log('Test Exist Colections....');
    mongoose.connection.db.listCollections().toArray( (err, Collections) => {
        // console.log(Collections); // [{ name: 'dbname.myCollection' }]  
        // console.log(Collections)
        // console.log(JSON.stringify(Collections))
        console.log(Collections.findIndex(x => x.name === 'test'))
        
        for(i=0;i<Collections.length;i++)
        {     
            console.log(Collections[i].name);
            
        }

        module.exports.Collection = Collections;
        });
})

// const collections = Object.keys(mongoose.connection.collections);
// console.log(JSON.stringify(collections))
// console.log(mongoose.connection.names)

//Cors


app.use(bodyParser.urlencoded({ extended : false }));    //نوع ارسال اطلاعات مثلا فرم دیتا یا ...
app.use(bodyParser.json({ type : 'application/json' }));   
app.use(expressValidator());
app.use('/public' , express.static('public'))

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');
const { json } = require('body-parser');
const { collection } = require('./modules/models/user');

app.use('/api' , apiRouter)
app.use('/' , webRouter);

app.use(cors())

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});