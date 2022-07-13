const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRouter');


// instantiate express
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://ansh:${encodeURIComponent('Quit@777')}@cluster0.klout.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result)=> {app.listen(3000); console.log('listening on port 3000...')})
	.catch((err)=> console.log(err));


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// route to homepage
app.get('/', (req,res)=>{

	res.redirect('/blogs');

})

// route about page
app.get('/about', (req,res)=>{

	res.render('about', { title:'About' });
})


// route create blog page

app.use('/blogs', blogRouter);

// 404 page

app.use((req, res)=> {

	res.status(404).render('404', { title:'404' });
});