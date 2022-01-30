const UserController = require("../controllers/user.controller");
const {authenticate}= require('../config/jwt');

module.exports = (app)=>{
    //admin routes for viewing all users in system and deleting users accounts
    app.get("/api/users", UserController.getAllUsers)
    app.delete("/api/users/delete/:id", UserController.deleteUser)
    app.delete("/api/users/deleteall", UserController.deleteAllUsers)

    //login register routes
    app.post("/api/register", UserController.register)
    app.post("/api/login", UserController.login)

    //routes after user is already logged in
    app.get("/api/getloggedinuser", authenticate, UserController.getLoggedInUser)
    app.get("/api/logout", authenticate, UserController.logout)

    
}