const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/Views/Partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request,response,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${request.method} : ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((request,response,next) =>{
//     response.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('boldIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (request,response) =>{
    response.render('Home.hbs', {
        pageTitle : 'Home Page',
        welcomeMsg : 'Welcome To Home Page',
    });
// response.send('<h1>Hello Express</h1>');
// response.send({
//     name : 'sheffali',
//     likes :[
//         'Cooking',
//         'Singing',
//         'Dancing'
//     ]
// });
});

app.get('/about',(request,response) =>{
 response.render('About.hbs', {
     pageTitle : 'About Page',
 });
});

app.get('/bad', (request,response) =>{
 response.send ({
     status : 0,
     errorMessage : 'Unable To Connect'
 });
});
app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});