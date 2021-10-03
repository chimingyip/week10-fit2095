const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path = require('path');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connected Successfully');
});

//Actor endpoints 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.put('/actors/:actorId/:movieId', actors.removeMovie);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/movies', actors.deleteActorAndMovies);

//Movie endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.post('/movies/:id/actors', movies.addActor);
app.get('/movies/:id', movies.getOne);
app.get('/movies/:year1/:year2', movies.getByYear);
app.put('/movies/:id', movies.updateOne);
app.put('/movies/:movieId/:actorId', movies.removeActor);
app.delete('/movies/:title', movies.deleteOne);
app.delete('/movies/:year1/:year2', movies.deleteByYear);
app.put('/movies', movies.incYearForX);