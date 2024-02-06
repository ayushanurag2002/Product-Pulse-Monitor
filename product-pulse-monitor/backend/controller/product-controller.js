const Product = require("./../models/Product");
const User = require("./../models/User");

const MarketHealth = require("./../models/MarketHealth");
const QualityAssurance = require("./../models/QualityAssurance");
const Innovation = require("./../models/Innovation");
const Sales = require("./../models/Sales");
const Upgradation = require("./../models/Upgradation");
const Improvement = require("./../models/Imrovement");

const fields = {
  MarketHealth: { model: MarketHealth, id: "healthId" },
  QualityAssurance: { model: QualityAssurance, id: "qualityId" },
  Innovation: { model: Innovation, id: "innovationId" },
  Sales: { model: Sales, id: "salesId" },
  Upgradation: { model: Upgradation, id: "upgradationId" },
  Improvement: { model: Improvement, id: "improvementId" },
};

exports.getProductOfUser = async (req, res) => {
  try {
    const { uid, field } = req.params;
    let currProduct;
    currProduct = await Product.findById(uid);

    if (!currProduct || Object.keys(currProduct)?.length === 0)
      throw new Error("No Product Found!");

    let result;
    if (field === "none") {
      result = currProduct;
    } else {
      result = await fields[field].model.findById(
        currProduct[fields[field].id]
      );
    }

    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};

exports.addProductOfUser = async (req, res) => {
  try {
    const { name, uid } = req.body;
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

    await User.findByIdAndUpdate(currUser._id, {
      productIdArray: [...currUser.productIdArray, result._id],
    });

    return res.status(200).json({ ok: true, data: result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};

exports.addProductDetails = async (req, res) => {
  try {
    const { uid, field, fieldParams } = req.body;

    let specField;

    specField = await fields[field].model.findByIdAndUpdate(uid, fieldParams);

    return res.status(200).json({ ok: true, data: specField });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};
