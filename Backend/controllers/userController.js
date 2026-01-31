import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "Email and Password fields are required" })
    }

    //Checking whether the user is in db or not
    const user = await User.findOne({ email }).select("+password");
    if(!user) return res.status(409).json({ message : "User doesn't exist please signup"});

    //comparing passwords
    const match = await bcrypt.compare(password, user.password);


    if(!match){
      return res.status(401).json({ message: "Invalid crediantials" });
    }

    //creating token for cookie using jsonwebtoken
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    //setting cookie to the browser
    res.cookie("token", token);

    //making the password undefined so that js cant see the password when we send the use as response
    user.password = undefined;

    res.status(200).json({ 
      message: "User Logged in successfully",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }//end of try..catch
}//end of signup

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    //finding whether the user details is in db or not
    const isUser = await User.findOne({ email });
    if(isUser) return res.status(409).json({ message : "User already exist please login"});

    //hashing password for security reasons
    const hashPassword = await bcrypt.hash(password, 10);

    //creating account in db
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role: "user"
    });

    //creating token for cookie using jsonwebtoken
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    //setting cookie to the browser
    res.cookie("token", token);
    
    res.status(201).json({ 
      message: "User created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }//end of try..catch
}//end of login
