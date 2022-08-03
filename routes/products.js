const express = require('express');
const router = express.Router();
const products = require('../models/product');

router.route('/').get(async (req, res, next) => {
  const { name, company, featured, sort, field } =
    req.query;
  const queryObjects = {};

  if (featured) {
    if (featured === 'true') {
      queryObjects.featured = true;
    } else {
      queryObjects.featured = false;
    }
  }
  if (company) {
    queryObjects.company = company;
  }
  if (name) {
    queryObjects.name = { $regex: name, $options: 'i' };
  }

  let result = products.find(queryObjects);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }
  if (field) {
    const fieldList = field.split(',').join(' ');
    result = result.select(fieldList);
  }

    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);


  let newProductsList = await result;
  res.status(200).json({
    nbHits: newProductsList.length,
    newProductsList,
  });
});

module.exports = router;
