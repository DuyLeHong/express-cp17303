const express = require('express')
const app = express()
const port = 3000
//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');
const { default: mongoose } = require('mongoose');

//const mongoose = require('mongoose');


app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/",
  helpers: {
    foo() { return 'FOO!'; },
    bar() { return 'BAR!'; }
  }
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

// const hbs = expressHbs.create({
//   // Specify helpers which are only registered on this instance.
//   helpers: {
//     foo() { return 'FOO!'; },
//     bar() { return 'BAR!'; }
//   }
// });

const uri = "mongodb+srv://duylh17:23vaBVHSspsLZPE5@cp17303.xbjgngz.mongodb.net/baitap?retryWrites=true&w=majority";

app.get('/', (req, res) => {

  mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));

  // {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true
  // }

  res.render('home', {
    layout: 'page2',
    showTitle: false,

    // Override `foo` helper only for this rendering.
    helpers: {
      foo() { return 'foo...'; }
    }
  });
});

const photoModel = require("./photoModel");

app.post("/add_photo", async (request, response) => {
  const photo = new photoModel();
  photo.id = 1;
  photo.albumId = 1;
  photo.title = 'Bang Kieu';
  photo.url = 'https://mongodb.com';
  photo.thumbnailUrl = 'https://mongodb.com';

  console.log('vao day');
  console.log(photo.toJSON().toString());
 
  try {
    await photo.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/photo", async (request, response) => {
  const photos = await photoModel.find({});

  try {
    console.log(photos);
    response.send(photos);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

