const Product = require("./../models/Product");
const User = require("./../models/User");

const MarketHealth = require("./../models/MarketHealth");
const Innovation = require("./../models/Innovation");
const Sales = require("./../models/Sales");
const Upgradation = require("./../models/Upgradation");
const Improvement = require("./../models/Imrovement");
const QualityAssurance = require("./../models/QualityAssurance");

exports.getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;

    let currUser;
    currUser = await User.find({ username });
    if (currUser?.length === 0) throw new Error("No user with this username!");

    return res.status(200).json({ ok: true, data: currUser[0] });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};

const addProductOfUser = async (name, uid) => {
  let currUser;
  currUser = await User.findById(uid);
  if (currUser?.length === 0) throw new Error("No User Found!");

  let health = new MarketHealth({});
  health = await health.save();

  let quality = new QualityAssurance({});
  quality = await quality.save();

  let innovation = new Innovation({});
  innovation = await innovation.save();

  let sales = new Sales({});
  sales = await sales.save();

  let upgradation = new Upgradation({});
  upgradation = await upgradation.save();

  let improvement = new Improvement({});
  improvement = await improvement.save();

  const newProduct = new Product({
    name,
    userId: uid,

    healthId: health._id,
    qualityId: quality._id,
    innovationId: innovation._id,
    salesId: sales._id,
    upgradationId: upgradation._id,
    improvementId: improvement._id,
  });

  const result = await newProduct.save();

  console.log(result);

  return result;
};

exports.addUser = async (req, res) => {
  try {
    const { fname, lname, username, productName } = req.body;
    console.log(fname);

    let currUser;
    currUser = await User.find({ username });
    if (currUser?.length > 0) throw new Error("Username already exists");

    // make a product

    let newUser = new User({
      fname: fname,
      lname: lname,
      username: username,
    });

    const data = await newUser.save();

    const prod = await addProductOfUser(productName, data._id);

    const userData = await User.findByIdAndUpdate(data._id, {
      productIdArray: [prod._id],
    });

    return res.status(200).json({ ok: true, user: userData, product: prod });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};
