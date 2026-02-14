
const adminAuth = (req, res) => {
  try{
    if(role !== "admin"){
      return res.status(400).json({ message: "Admin access only" });
    }
    next();
  } catch(error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export default adminAuth;