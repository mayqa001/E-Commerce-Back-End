const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const products = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.send(products);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const product = await Tag.findOne({
      include: [
        {
          model: Product,
        },
      ],
      where: { id: req.params.id },
    });
    res.send(product);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  var name = req.query.name;
  try {
    var tag = await Tag.create({
      tag_name: name,
    });
    res.json(tag);
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  var name = req.query.name;

  try {
    var tag = await Tag.update(
      {
        tag_name: name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(tag);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    var id = req.params.id;
    var tag = await Tag.destroy({ where: { id: id } });
    res.json(tag);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
