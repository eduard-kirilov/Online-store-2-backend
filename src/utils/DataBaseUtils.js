require('../models/Product')
const mongoose = require('mongoose')
const config = require('../../etc/config.json')

const Product = mongoose.model('Product');

exports.setUpConnection = () => {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true })

}

exports.listProduct = () => {
    return Product.find()
}

exports.createProduct = data => {
    const product = new Product({
        productId: data.productId,
        productImg: data.productImg,
        productIsbn: data.productIsbn,
        productName: data.productName,
        productVote: data.productVote,
        productYear: data.productYear,
        productPrice: data.productPrice,
        productRating: data.productRating,
        productLastName: data.productLastName,
        productFirstName: data.productFirstName
    })

    return product.save()
}

exports.changeProduct = (id, data) => {
    return Product.updateOne(
        {
            _id: id
        }, {
            $set: {
                productId: data.productId,
                productImg: data.productImg,
                productIsbn: data.productIsbn,
                productName: data.productName,
                productVote: data.productVote,
                productYear: data.productYear,
                productPrice: data.productPrice,
                productRating: data.productRating,
                productLastName: data.productLastName,
                productFirstName: data.productFirstName
            }
        }, err => { if (err) console.error(err) }
    )
}

exports.sortProduct = (state, name) => {
    if (name === 'Name') {
        if (!state) {
            return Product.find({}).sort({ productName: -1 })
        } else {
            return Product.find({}).sort({ productName: 1 })
        }
    } else {
        if (!state) {
            return Product.find({}).sort({ productYear: -1 })
        } else {
            return Product.find({}).sort({ productYear: 1 })
        }
    }
}

exports.deleteProduct = id => {
    return Product.findById(id).remove()
}