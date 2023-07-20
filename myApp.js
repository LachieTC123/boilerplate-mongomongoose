require("dotenv").config();
let mongoose = require("mongoose");
//Link to DB https://cloud.mongodb.com/v2/648b13d6c34b481ad379c70a#/clusters

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "Steve",
    age: 25,
    favoriteFoods: ["apples", "bananas"],
  });
  newPerson
    .save()
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      console.log(err);
    });
};

arrayOfPeople = [
  {
    name: "Steve",
    age: 25,
    favoriteFoods: ["apples", "bananas"],
  },
  {
    name: "Jobs",
    age: 25,
    favoriteFoods: ["peas", "beans"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find(
    {
      name: personName,
    },
    function (err, data) {
      if (err) console.log(err);
      done(null, data);
    }
  );
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  //Find person by findById
  Person.findById(personId, function (err, data) {
    //Add food to array
    data.favoriteFoods.push(foodToAdd);
    //Save person model
    data
      .save()
      .then((data) => {
        done(null, data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) console.log(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) console.log(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("name favoriteFoods")
    .exec((err, data) => {
      if (err) console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
