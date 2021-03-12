const express = require('express');
const router = express.Router();

const apiV1 = require('./api-v1');
// const apiV12 = require('./api-v1.2');

router.use('/v1' , apiV1);
// router.use('/v1.2' , apiV12);

//test GET localhost:8080/api/courses
// router.get('/courses' , (req,res)=>{
//     res.json({
//         data : [
//             {
//                 title1:'tit1'
//             },
//             {
//                 title2:'tit2'
//             }
//         ]
//     })
// });



// router.use('/v1.2' , apiV12);

module.exports = router;