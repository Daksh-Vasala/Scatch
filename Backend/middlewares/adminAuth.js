
const adminAuth = (req, res, next) => {
  try{
    if(req.user.role !== "admin"){
      return res.status(400).json({ message: "Admin access only" });
    }
    next();
  } catch(error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export default adminAuth;