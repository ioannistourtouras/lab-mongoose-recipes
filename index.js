const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    
    let newRecipe = {
      title: "pie",
      level: "Amateur Chef",
      ingredients: "Cheese",
      cuisine: "Tex-Mex",

      // Run your code here, after you have insured that the connection was made
  }

  Recipe.create(newRecipe).then((singleRecipe) => {
  console.log(singleRecipe.title)
  })
    .then(() => {
   return Recipe.insertMany(data)
  })  
    .then((dataFromDb) => dataFromDb.forEach((recipe) => console.log(recipe.title)))
    .then(() => {
    const filter = {title: "Rigatoni alla Genovese" }
    const update = {duration: 100}

    Recipe.findOneAndUpdate(filter, update, {new: true})
  })
    .then((result) => {
    console.log("This is the result", result)
  })
    .then(() => {
    return Recipe.deleteOne( {title: "Carrot Cake"})
  })
    .then(() => {
    return mongoose.connection.close()
  })
    .then(() => {
    console.log(mongoose.connection.readyState)
  })
})
  .catch(error => {
  console.error('Error connecting to the database', error);    
});
