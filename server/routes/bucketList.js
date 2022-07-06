const router = require("express").Router();
const {
  getBucketList,
  addBucketList,
  deleteBucketList,
} = require("../controllers/bucketList");
const { protected } = require("../middleware/auth");

router.get("/", protected, getBucketList);
router.post("/", protected, addBucketList);
router.delete("/:id", protected, deleteBucketList);

module.exports = router;
