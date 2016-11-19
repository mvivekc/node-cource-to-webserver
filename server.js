const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const SERVER_PORT = process.env.PORT || 4444;

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});
app.set('view engine', 'hbs')
app.use((req, res, next) => {
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}\n`;
  console.log(log)
  fs.appendFile('server.log', log)
  //res.render('maintainance.hbs')
  next()
})

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res)=> {
  res.render("home.hbs",  {
    title: "Home page motherfaaqqer!!",
    welcomeMsg: "This is my home"
  });
})
app.get('/about', (req, res)=> {
  res.render("about.hbs",  {
    title: "About page motherfaaqqer!!"
  });
})
app.get('/projects', (req, res)=> {
  res.render("projects.hbs",  {
    title: "projects page motherfaaqqer!!"
  });
})
app.get('/bad', (req, res)=> {
  res.send( {error: "hello world"});
})
app.listen(SERVER_PORT, () => {
  console.log(`Server is up on PORT: ${SERVER_PORT}`)
});