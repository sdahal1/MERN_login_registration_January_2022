const UserController = require("../controllers/user.controller");

module.exports = (app)=>{
    //admin routes for viewing all users in system and deleting users accounts
    app.get("/api/users", UserController.getAllUsers)
    
}