const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt");


class UserController {

    register(req, res) {
        console.log("req.body on register-->", req.body)
        User.find({email: req.body.email})
            .then(foundUser=>{
                console.log("found user-->", foundUser)
                if(foundUser.length===0){
                    User.create(req.body)
                        .then(user => {
                            const userToken = jwt.sign({
                                id: user._id
                            }, secret);
                            res
                                .cookie("usertoken", userToken, secret, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                        })
                        .catch(err => res.json(err));
                }
                else{
                    res.json({errors: {emailTaken:"Email is taken"}})
                }
            })
            .catch(err=>res.json({err}))
        
    }

    login =  async(req, res) => {
        //find a user in mongodb by the email from the form
        const user = await User.findOne({ email: req.body.email });
     
        //this code will only run after line 30 finishes getting data back from mongodb
        if(user === null) {
            // email not found in users collection
            console.log("email not found")
            return res.json({msg: "Email not found. Who dis?"})
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password from form (req.body.password) to the hashed password in the database (user.password);
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            console.log("password no matchy")
            return res.json({msg: "Password needs to matchy tho"})
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!", user:user });
    }

    //this is the same way to do login without the aync await
    // login(req, res) {
    //     User.findOne({email: req.body.email})
    //       .then(user => {
    //         if(user === null) {
    //           res.json({msg: "invalid login attempt"});
    //         } else {
    //           bcrypt.compare(req.body.password, user.password)
    //             .then(passwordIsValid => {
    //               if(passwordIsValid) {
    //                 res
    //                   .cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly: true})
    //                   .json({msg: "success!"});
    //               } else {
    //                 res.json({msg: "invalid login attempt, incorrect password"});
    //               }
    //             })
    //             .catch(err => res.json({msg: "invalid login attempt", err}));
    //         }
    //       })
    //       .catch(err => res.json(err));
    // }

    getLoggedInUser= (req, res) =>{
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    
        User.findById(decodedJWT.payload.id)
          .then(user => res.json({results:user}))
          .catch(err => res.json(err));
    }

    logout(req, res) {
        res.clearCookie("usertoken");
        res.json({msg:"logged out"})
    }


    //ADMIN CONTROLLERS FOR USER BELOW!!!!

    //admin controller features for getting all users
    getAllUsers= (req,res)=>{
        User.find()
            .then(allUsers=>{
                res.json({results: allUsers})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }

    //admin controller features for getting a user account
    deleteUser = (req,res)=>{
        User.deleteOne({_id: req.params.id})
            .then(deletedUser=>{
                res.json({results: deletedUser})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }

    //admin controller features for deleting all users
    deleteAllUsers = (req,res)=>{
        User.deleteMany()
        .then(deletedUsers=>{
            res.json({results: deletedUsers})
        })
        .catch(err=>{
            res.json({error: err})
        })
    }
}


module.exports = new UserController();