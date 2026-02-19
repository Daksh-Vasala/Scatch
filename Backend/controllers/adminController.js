import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server error", error});
  }
}

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if(!product){
      return res.status(400).json({ message: "Product not found" });
    }
    
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleIsActive = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isActive: !product.isActive },
      { new: true }
    );
    
    return res.status(200).json(updatedProduct);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if(!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    return res.status(200).json({ message: "Product deleted successfully" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const createProduct = async () => {
  try {
    const product = req.body;
    
  } catch (error) {
    
  }
}