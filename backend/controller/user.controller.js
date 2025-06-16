const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const createUser = async(req,res)=>{
    try {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = new User({...req.body,password: hashedPassword});
        await user.save();
        res.status(201).json({"message": "User created", "data": user});
        console.log(req.body)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({"message": "Internal Server error"});
    }
}

const loginUser = async(req,res)=>{
    try {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send({ error: 'Email and password are required' });
        }
        console.log(req.body.email , req.body.password ,"from request")
        const user = await User.findOne({email:req.body.email})
        console.log(user)
        console.log(user.email , user.password ,"from db")
        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(hashedPassword)
        if(!hashedPassword){
         res.status(400).json({"message":"Invalid Credentials"});
        }
         const token = await jwt.sign({id:user.id,role:user.role},"secretKey")
        res.status(201).json({"message": "User created", "data": token});
        console.log(req.body)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({"message": "Internal Server error"});
    }
}








const  getUser = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(201).json({"message":
            "Gotall users","data":users  });
        }
        catch(error){
            res.status(500).json({"message":"Failed to fetch users"});
        }
    
    }

    const updateUser = async (req, res) => {
        try {
          const id = req.params.id; 
          const data = req.body;    
      
          const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      
          if (updatedUser) {
            res.status(200).json({ message: 'User updated', data: updatedUser });
          }
      else{
        return res.status(404).json({ message: 'User not found' });

      }      
        } catch (err){
          res.status(500).json({ message: 'Something went wrong' });
        }
      };
      
      const deleteUser = async (req, res) => {
        try {
          const userId = req.params.id;
      
          const deletedUser = await User.findByIdAndDelete(userId);
      
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      




module.exports = {
    createUser,
    getUser,
    updateUser,
     deleteUser,
     loginUser
};