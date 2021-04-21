const express = require("express");
const bcrypt = require("bcryptjs");
require("../Database/connec")
const User = require("../models/userSchema");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// router.get("/", (req, res) => {
//   res.send("Congraluations you are on 🚀");
// });


router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    console.log("Error Something is missing in the request");
    return res
      .status(422)
      .json({ Message: "Error Something is missing in the request" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      console.log("Email alerady exist");
      return res.status(404).json({ Message: "Email alerdy exist" });
    } else if (password != cpassword) {
      console.log("Password doesn't matched");
      return res.status(404).json({ Message: "password not matched" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });
      await user.save();
      res.status(200).json({ Message: "User registered sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ Error: err });
  }
});


router.post("/login", async (req, res) => {
    try {
  
        var token;
        const {email,password} = req.body
        console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill the DATA" });
    }
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
        const ismatch = await bcrypt.compare(password, userlogin.password);
         token =  await userlogin.generateAuthToken();
         res.cookie('jwtoken',token,{httpOnly:true,sameSite:"none",secure:true})
        
      if (!ismatch) {
        res.status(400).json({ err: "Invalid Data" });
      } else {
        res.status(200).json({ message: "Users loged in " });
      }
    } else {
      res.status(404).json({ Err: "Invalid DATA" });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/about", authenticate, (req, res) => {
  const data = req.rootUser
  res.send(data)
});


router.get('/getdata',authenticate,(req,res)=>{
  const data = req.rootUser
  res.send(data)
})


router.post('/contactform',authenticate,async (req,res)=>{
  try{
    const {name,email,phone,message} = req.body
    if(!name || !email || !phone || !message){
      res.json({Error:"Something is missing in the form"})
      console.log("Something is missing in the form");
    }

    const contactUser = await User.findOne({_id:req.userID})
    if(contactUser){
      const usermessage = await contactUser.addmessage(name,email,phone,message)
    await contactUser.save()
    res.status(200).json({data:"data added succusfully"})
    }
  }catch(err){
    console.log(err);
  }
})

router.get('/logout',(req,res)=>{
  console.log('logout');
  res.clearCookie('jwtoken',{path:"/"})
  res.status(200).send("User Logout")
})


module.exports = router;
