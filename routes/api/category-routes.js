const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    });
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    });
    if (!categoryId) {
      res.status(404).json({ message: "Category does not exist" });
      return;
    }
    res.status(200).json(categoryId);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No Category exists" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category exists" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
