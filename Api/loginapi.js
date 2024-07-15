const connectDB=require("../database/db")


async function LoginApi(req, res) {
    try {
      const db = await connectDB();
      const collection = db.collection("users");
  
      const { email, password, } = req.body;
      const user = await collection.findOne({ email, password });
  
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      else{
        return res.status(200).json({success: "true", message: "Login Suceesfully"})
      }



  
    //   await collection.updateOne(
    //     { _id: user._id },
    //     { $set: { userStatus: "1" } }
    //   );
  
  
  
    //   res.status(200).json({
    //     userData: userDatas,
    //     success: true,
    //     message: "Login Successful",
    //   });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Login Failed" });
    }
  }
  
  module.exports = { LoginApi };
  