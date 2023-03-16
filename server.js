const express = require('express')
const app = express()
const port = 3000
//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: 'main', layoutsDir: "views/layouts/" }));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

const hbs = expressHbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo() { return 'FOO!'; },
    bar() { return 'BAR!'; }
  }
});

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'page2',
    showTitle: false,

    // Override `foo` helper only for this rendering.
    helpers: {
      foo() { return 'foo...'; }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

