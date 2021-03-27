const { find } = require("../../../models/user");

const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const User = require(`${config.path.model}/user`);
const Users_verifys = require(`${config.path.model}/verify`);
const Admin_alerts  = require(`${config.path.model}/admin_alerts`);

module.exports = new class UserController extends Controller {
    self = this ;
    index(req , res) {
        return res.json({
            data : new UserTransform().transform(req.user)
        })
    }

    uploadImage(req, res) {
        res.json(req.file);
        if(req.file) {
            res.json({
                message : 'فایل شما با موفقیت آپلود گردید',
                data : {
                    imagePath : 'http://localhost:8080/' + req.file.path.replace(/\\/g , '/') 
                },
                success : true
            })
        } else {
            res.json({
                message : 'فایل شما آپلود نشد',
                success : false
            })
        }
    }

    profile(req, res) {               // req =  User + token      // console.log('req prof get' +JSON.stringify(req.params)  )
       console.log("res Get user Profile" +JSON.stringify(req.user))
    //    console.log(req.user._id)
    //    User.findById(req.user._id , (err , user) => {      // درآوردن آی دی مونگو یوزر لاگین شده
            // if(err) throw err;
            // Users_verifys.find(user = req.user._id , (err , verif) => { 
            //      req.verifyStatus = verif;  
            //      console.log("req.verifyStatus");
            //      console.log(JSON.stringify(req.verifyStatus));
            // })

        // })
// //   console.log("user " +user)
//             if(user) {
//                 // user.token = token;         // توکن همراه یوزر به مرحله بعد باس داده میشه         
//                 req.user = user;           // یوزر بیدا شده به مرحله بعد باس داده میشه
                // console.log(req.user);

                // console.log(req.user.verify);

                // this.model.Users_verifys.findById(req.user._verify  , (err , verif) => {
                //     if(err) throw err;

                //     req.verifyStatus = verif;  
                //     console.log(req.verifyStatus)
                // })


                // this.model.Users_verifys.findById(req.user._verify).populate('user').exec((err , episode) => {
                    // this.model.User.find(req.user._id).populate('verify').exec((err , verify) => {
                    //     if(err) throw err;
                
                    //     this.model.Users_verifys.find(user = req.user._id),((err , verify) => {

                    //     })
                    // )
                
                    // if(verify) {   console.log(verify)
                        // return res.json({  
                            // data : new CourseTransform().withEpsiodes().transformCollection(verify),
                            // success : true
                        // });
                    // }

                    // res.json({
                    //     message : 'Courses empty',
                    //     success : false
                    // })
                // })


    //             next();
    //         } else {
    //             return res.json({
    //                 success : false ,
    //                 Error : 'User Not Found'      //یوزر بیدا نشد 
    //             });
    //         }
    //    }) 
          
        res.status(200).json({       // تا اینجا اومد یعنی کاربر لاگین شده است و معتبر
            success: true,

            profile:  {
                // username: req.username ,
                // email: req.email ,
                // firstname: req.firstname,
                // lastname: req.lastname
                username: req.user.username ,
                email: req.user.email ,
                firstname: req.user.firstname,
                lastname: req.user.lastname
              }

            // verifyStatus:  {
            //     firstname: req.verifyStatus.firstname,
            //     lastname: req.verifyStatus.lastname ,
            //     // email: req.verifyStatus.email ,
            //     // tell: req.verifyStatus.tell ,
            // }
          })
    }


    async verifystatus(req, res) {               
       console.log("res user verifystatus" +JSON.stringify(req.user))

        await Users_verifys.find({ user : req.user._id} , (err , verif) => { 
            console.log("verif" +  JSON.stringify(verif[0]));
                req.verifyStatus = verif[0];  
                

        })

       
        console.log("req.verifyStatus");
        console.log(req.verifyStatus.firstname);
        console.log(JSON.stringify(req.verifyStatus));

        res.status(200).json({     
            success: true,

            verifyStatus:  {
                firstname: req.verifyStatus.firstname,
                lastname: req.verifyStatus.lastname 
                // email: req.verifystatus.email ,
                // tell: req.verifystatus.tell ,
            }
          })
    }

    // var object = arr.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});

    async adminalerts(req, res) {               
       console.log("res user adminalerts" )

        await Admin_alerts.find({} , (err , alerts) => { 
            console.log("alerts" +  JSON.stringify(alerts));
                // req.adminalerts = alerts.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{}); 
                // req.adminalerts = alerts.reduce((obj,item)=>{obj[item.key] = item.value; return obj;} ,{}); 
                // req.adminalerts = alerts.reduce((obj)=>{ obj   } , {} ); 

                // let alt = {};
                // alt =  { ...alerts}
                // req.adminalerts = alt;
                req.adminalerts = alerts;

                // req.adminalerts = alerts.reduce((obj) => {    return {  ...obj   }  , {} })
                // console.log( alerts.reduce( (obj) =>{ return { ...obj } }))

        })

       
        console.log("req.adminalerts");
        console.log(req.adminalerts);
        console.log(JSON.stringify(req.adminalerts));

        res.status(200).json({     
            success: true,

            adminalerts: req.adminalerts
                // priority: req.adminalerts.priority,
                // head: req.adminalerts.head ,
                // body: req.adminalerts.body 
                // tell: req.adminalerts.tell ,

                // "_id" : ObjectId("605ef46a432118ef7590b377"),
                // "admin_name" : "abozar",
                // "start_show" : "215421221",
                // "end_show" : "321545221",
                // "active_show" : true,
                // "priority" : "red",
                // "head" : "alert_head",
                // "body" : "alert_body"

           
          })
    }



























    //  adminalerts(req, res) {               
    //     // console.log("res user verifystatus" +JSON.stringify(req.user))
    //     const alt={} ;
    //       Admin_alerts.find({} , (err , alerts) => { 
    //         //  console.log("alerts" +  JSON.stringify(alerts));
    //          console.log("alerts" + alerts);
    //              req.admalerts = alerts;  
    //             //  alt.push(alerts);  
    //         // return {alerts}
                 
    //      })
 
    //     //  return alt;

    //     //  console.log("req.alerts");
    //     //  console.log(req.adminalerts);
    //     //  console.log(JSON.stringify(req.adminalerts));
         
    //     //  return;
    //      //  res.status(200).json({     
    //     //      success: true,
 
    //     //      adminalerts:  req.adminalerts 
    //     //     //          {
    //     //     //      firstname: req.verifyStatus.firstname,
    //     //     //      lastname: req.verifyStatus.lastname 
    //     //     //      // email: req.verifystatus.email ,
    //     //     //      // tell: req.verifystatus.tell ,
    //     //     //  }
    //     //    })
    //  }


    handleReqList(req, res) {               
       console.log("req.ReqList" + JSON.stringify(req.ReqList))
    //    const admalerts = null ;
        const ObjReqList = req.ReqList ;
        for (var key in ObjReqList) {
            if (ObjReqList.hasOwnProperty(key)) {   // vojod darad ya na   mesle   obj.hasOwnProperty('nameProperty')

                if (ObjReqList[key] == "admin_alerts" )  {  
                     console.log(ObjReqList[key]);
                     console.log(this.self.adminalerts(req, res))
                    //  this.adminalerts(req, res) .then((resault)=>{ console.log(resault[0]); this.admalerts=resault[0]; } )    
                    //  console.log("req.adm"+ this.admalerts) ;
                     console.log(req.admalerts) ;
                    }
                //   myObject[key] *= 2;
                // onj ResList(key).insert   window["admin_alerts"] : mongo find
                // onj ResList(key).insert   window[ObjReqList[key]] :  mongo find
            }
          }


        res.status(200).json({     
            success: true,
            ReqList: {
                ObjReqList
            }
            // verifyStatus:  {
            //     firstname: req.verifyStatus.firstname,
            //     lastname: req.verifyStatus.lastname 
            //     // email: req.verifystatus.email ,
            //     // tell: req.verifystatus.tell ,
            // }
          })
    }





}