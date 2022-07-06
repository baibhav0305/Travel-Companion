const User = require("../model/UserSchema");
const BucketList = require("../model/BucketListSchema");

const getBucketList = async (req, res) => {
  try {
    const bucketList = await BucketList.find({ user: req.user.id });

    res.status(200).json(bucketList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addBucketList = async (req, res) => {
  if (!req.body.place) {
    return res.status(400).json("Please add a destination");
  }

  const bucketList = await BucketList.create({
    user: req.user.id,
    place: req.body.place,
  });

  res.status(200).json(bucketList);
};

const deleteBucketList = async (req, res) => {
  const bucketList = await BucketList.findById(req.params.id);

  if (!bucketList) {
    return res.status(400).json("No Place found");
  }

  if (!req.user) {
    return res.status(401).json("User not found");
  }

  if (bucketList.user.toString() !== req.user.id) {
    return res.status(401).json("User not authorized");
  }

  await bucketList.remove();

  res.status(200).json({ id: req.params.id });
};

module.exports = { getBucketList, addBucketList, deleteBucketList };
