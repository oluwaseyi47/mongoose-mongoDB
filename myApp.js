let db_connect = require("./src/database");
let Person = require("./models/persons");

//Create new person
var person = new Person({
  name: "John",
  age: 35,
  favoriteFoods: ["Burger", "Tacos"],
});
person.save((err, data) => {
  if (err) console.log(err);
  else console.log(data);
});

// Create Many Records with model.create()
Person.create([
  {
    name: "oluwaseyi",
    age: 35,
    email: "seyi@gmail.com",
    favoriteFoods: ["beans", "yam", "veggies"],
  },
  {
    name: "Gab",
    age: 27,
    email: "Gab@gmail.com",
    favoriteFoods: ["fruits", "beans", "bread"],
  },
  {
    name: "Dara",
    age: 40,
    email: "Dara60@gmail.com",
    favoriteFoods: ["tea", "corn flakes", "chicken"],
  },
])
  .then(() => {
    console.log("Inserting a lot of people successfuly");
  })
  .catch((err) => {
    console.error(err);
  });

// Use model.find() to Search Your Database

Person.find({
  name: "Dara",
})
  .then((res) => {
    console.log("searching people with DARA");
    console.log(res);
  })

  .catch((err) => {
    console.error(err);
  });

// Use model.findOne() to Return a Single Matching Document from Your Database

Person.findOne({ favoriteFoods: { $in: ["rice", "Meat"] } }, (err, persons) => {
  if (err) console.log(err);
  else console.log(persons);
});

// Use model.findById() to Search Your Database By _id

Person.findById("6051010a20d15629cc6deaf4").then((res) => {
  console.log("searching by ID");
  console.log(res);
});

//Classic Updates : Find , edit , save

Person.findById(id, function (err, data) {
  if (err) return console.error(err);
  //console.log(data);
  data.favoriteFoods.push("chicken");
  //inside the find callback
  data.save(function (err, data) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully! + we add the hamburger");
  });
});

//  Perform New Updates on a Document Using model.findOneAndUpdate()

Person.findOneAndUpdate(
  { name: "Gab" },
  { age: 20 },
  { new: true, runValidators: true }
)
  .then((res) => {
    console.log("New Document");
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

//   Delete One Document Using model.findByIdAndRemove

let id = '5f39a3b73f59b6426c85c05a';
Person
    .findByIdAndRemove(id)
    .then(res => {
        console.log("Removed Document");
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })

    // MongoDB and Mongoose - Delete Many Documents with model.remove()
Person
.remove({ name: 'Oluwwaseyi' })
.then(res => {
    console.log("Delete work");
    console.log(res);
    if(res.n === 0){
        console.log("No persons deleted");
    }else
    {
        console.log(`${res.n} Person deleted`);
    }
})
.catch(err => {
    console.error(err);
})

//Chain Search Query Helpers to Narrow Search Results
 let food ='rice'

 Person.find({
    favoriteFoods: { $in: ["yam", "veggies", "corn flakes", "bread"] },
  })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) console.log(err);
      else console.log(data);
    }); 
