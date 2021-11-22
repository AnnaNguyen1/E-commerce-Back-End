const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findOne({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    if (!tagId) {
      res.status(404).json({ message: "No Tag Found!" });
    }
    res.status(200).json(tagId);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tagData) {
      res.status(404).json({ message: "No Tag Found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tag Found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
