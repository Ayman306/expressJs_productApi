const Product = require("../models/product_model");

const getPublished = async (req, res) => {
  try {
    const publishedProducts = await Product.find({ published: true });
    res.status(200).json(publishedProducts);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error retrieving published products", error: err });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const addProduct = await product.save();
    res.status(201).send(addProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

const allProduct = async (req, res) => {
  try {
    const { name, sortBy, sortOrder, size, page } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(size);

    if (name) {
      const filterProduct = await Product.find({ name: name })
        .skip(skip)
        .limit(parseInt(size));
      if (filterProduct.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found with the specified name" });
      }
      return res.status(200).json(filterProduct);
    }

    const sortOptions = {};

    if (sortBy === "price_rating") {
      sortOptions.price = sortOrder === "desc" ? -1 : 1;
      sortOptions.rating = -1;
    } else if (sortBy === "price") {
      sortOptions.price = sortOrder === "desc" ? -1 : 1;
    } else if (sortBy === "rating") {
      sortOptions.rating = sortOrder === "desc" ? -1 : 1;
    }

    const products = await Product.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(size));

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products", error: err });
  }
};

const getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ Message: "Product updated", updateProduct });
  } catch (err) {
    res.status(404).json({ message: "Cannot be updated", err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    const products = await Product.find();
    res.status(200).json({ message: "Product deleted succefully", products });
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeAllProduct = async (req, res) => {
  try {
    const _id = req.params.userId;
    let products = await Product.find({ userId: _id });
    res.status(200).send(products);
  } catch (err) {
    res.status(404).json({ mesage: "No products available" });
  }
};

const getProductByUserId = async (req, res) => {
  try {
    const _id = req.params.userId;
    let products = await Product.find({ userId: _id });
    res.status(200).send(products);
  } catch (err) {
    res.status(404).json({ mesage: "No products available" });
  }
};
const addProductByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, description, published, image, price, rating, createdBy } =
      req.body;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      published,
      userId,
      image,
      price,
      rating,
      createdBy,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProductByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const product = await Product.findOneAndUpdate(
      { userId, _id: productId },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  addProduct,
  allProduct,
  updateProduct,
  deleteProduct,
  getPublished,
  getProduct,
  removeAllProduct,
  getProductByUserId,
  addProductByUserId,
  updateProductByUserId,
};
