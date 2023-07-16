const mongodb = require("mongodb");

const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.uid = productData.uid;
    this.description = productData.description;
    this.type = productData.type;
    this.image = productData.image; // the name of the image file
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Could not find product with provided id.");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  static async paginate(limit_, pageNumber_) {
    let PostModel = db.getDb().collection("products");
    try {
      const pageNumber = parseInt(pageNumber_) || 0;
      const limit = parseInt(limit_) || 5;
      const result = {};
      const totalPosts = await PostModel.find().count();
      let startIndex = pageNumber * limit;
      const endIndex = (pageNumber + 1) * limit;
      result.totalPosts = totalPosts;
      if (startIndex > 0) {
        result.previous = {
          pageNumber: pageNumber - 1,
          limit: limit,
        };
      }
      if (endIndex < (await PostModel.find().count())) {
        result.next = {
          pageNumber: pageNumber + 1,
          limit: limit,
        };
      }
      result.data = await PostModel.find()
        .sort("_id")
        .skip(startIndex)
        .limit(limit)
        .toArray();
      result.rowsPerPage = limit;
      return result.data.map(function (productDocument) {
        return new Product(productDocument);
      });
    } catch (error) {
      console.log(error);
      return { msg: "Sorry, something went wrong" };
    }
  }

  static async searchProduct(searchString) {
    const query = { $text: { $search: searchString } };
    const sort = { score: { $meta: "textScore" } };

    const searchResult = await db
      .getDb()
      .collection("products")
      .find(query)
      .sort(sort)
      .toArray();

    return searchResult.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findProductByUserId(uid) {
    const products = await db
      .getDb()
      .collection("products")
      .find({
        uid: uid,
      })
      .toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
      uid: this.uid,
      type: this.type,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db.getDb().collection("products").updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: productId });
  }
}

module.exports = Product;
