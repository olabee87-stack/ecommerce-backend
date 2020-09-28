const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm(); //all form data will be available from here
  form.keepExtensions = true; //keep all photo extensions- eg jpg, png etc
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded!" });
    }
    let product = new Product(fields); //create new product with fields received into the req

    //if photo was passed on the clientside
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path); //photo.data - coming from the product model
      product.photo.contentType = files.photo.type; //also from the product model - contentType eg png, jpet etc
    }

    try{
        await product.save()
        res.status(201).json({
            product
        })
        console.log('Created a new product', product)
    }catch(err){
        return res.status(400).json({
            error:errorHandler(err)
        })
    }
  });
};

//Ship off to product route
