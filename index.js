require("dotenv").config();
const mongoose = require("mongoose");
//  connecting to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//creating schema//
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  age: Number,

  favoriteFoods: [String],
});
// Create and Save a Record of a Model
const Person = mongoose.model("person", blogSchema);

var person = new Person();
person.name = "nafti";
person.age = 35;
person.favoriteFoods = ["sandwich ", "pizza"];
person.save(function (err, data) {
  if (err) {
    return console.error(err);
  }
  return console.log("person addes succesfuly");
});
// Creating Many Records with model.create()
Person.create(
  [
    {
      name: "mary",
      age: 65,
      favoriteFoods: ["pizza", "panini"],
    },
    {
      name: "john",
      age: 34,
      favoriteFoods: ["panini", "spagetti"],
    },
    {
      name: "jack",
      age: 40,
      favoriteFoods: ["Salade", "fish"],
    },
  ],
  function (err, result) {
    if (err) {
      return console.error(err);
    }
    return console.log("success: create user");
  }
);
// Use Person.find() to Search Your Database
Person.find({
  name: "mary", // search query
})
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
let id = "60fff6fa8114bb0a300ff2fb";
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({
  favoriteFoods: "spagetti",
})
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
//Use model.findById() to Search Your Database By _id
Person.findById(id)

  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
//Perform Classic Updates by Running Find, Edit, then Save
Person.findById(id, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    result.favoriteFoods.push("hamburger");
    result.save((error, updatedResult) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success: adding favourite food");
      }
    });
  }
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate(
  { name: "jack" },
  { $set: { age: 20 } },
  { new: true },
  (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log("update success");
  }
);
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove("60fff19e795f2a1e004fab91", (err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Removed User : ", docs);
  }
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({ name: "mary" }, (error, JSONStatus) => {
  if (error) {
    console.log(error);
  } else {
    console.log("removed", JSONStatus);
  }
});
//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: "burritos" })
  .sort({ name: "asc" })
  .limit(2)
  .select({ age: false })
  .exec((error, filteredResults) => {
    if (error) {
      console.log(error);
    } else {
      console.log("find/sort/limit/select : success", filteredResults);
    }
  });
