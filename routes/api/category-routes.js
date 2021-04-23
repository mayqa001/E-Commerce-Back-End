const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategory = await Category.findAll({
      include: [{model:Product}]
    });
    res.status(200).json(allCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      include: [{model:Product}],
      where: { id: req.params.id }
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // create a new category
router.post("/", async (req, res) => {
  var name = req.query.name;
  try {
    var category = await Category.create({
      category_name: name
    });
    res.json(category);
  } catch (error) {
    res.json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    var name = req.query.name;
    var category = await Category.update(
      {
        category_name: name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Category.destroy({ where: { id: id } });
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
