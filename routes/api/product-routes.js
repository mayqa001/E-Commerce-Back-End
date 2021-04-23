const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");
const { sync } = require("../../models/Tag");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
        },
        { model: Tag },
      ],
    });
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const product = await Product.findOne({
    include: [
      {
        model: Category,
      },
      { model: Tag },
    ],
    where: { id: req.params.id },
  });
  res.send(product);
});

// create new product
router.post("/", async (req, res) => {
  var name = req.query.name;
  var product_price = req.query.price;
  var product_stock = req.query.stock;
  var catId = req.query.category_id;
  try {
    var product = await Product.create({
      product_name: name,
      price: product_price,
      stock: product_stock,
      category_id: catId,
    });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

// update product
router.put("/:id", async (req, res) => {
  // update product date
  try {
    var product_stock = req.query.stock;
    var product = await Product.update(
      {
        stock: product_stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    var id = req.params.id;
    var product = await Product.destroy({ where: { id: id } });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
