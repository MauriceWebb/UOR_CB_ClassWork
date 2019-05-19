require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

// get access keys...
const spotify = new Spotify(keys.spotify);

// ================== Main Application...
// run the app...
run(process.argv[2], process.argv.slice(3).join(' '));
// console.log('this works!');
// ================== End Main app ================>

// ================== Functions...
// RUN ()==>
function run (a, b) {
    // set user inputs to variables...
    let command = a,
        name = b;
    // switch case the input...
    switch(command) {
        case 'concert-this':
            concertThis(name);
            break;
        case 'spotify-this-song':
            spotifyThis(name);
            break;
        case 'movie-this':
            movieThis(name);
            break;
        case 'do-what-it-says':
            doThis();
            break;
        default:
            console.log('Ivalid input');
            break;
    }
}
// === End Run()
// CONCERTTHIS ()==>
function concertThis (name) {
    axios
    .get(`https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`)
    .then(function (response) {
        let name = response.data[0].lineup[0];
        console.log('========== CONCERT THIS! ==========');
        // test log the band's name...
        console.log(`Band Name: ${name}`);
        console.log('===================================');
        for (let i = 0; i < response.data.length; i++) {
            let concert = response.data[i],
                venue = concert.venue.name,
                city = concert.venue.city,
                country = concert.venue.country,
                date = concert.datetime;
            
            console.log(`----- OPTION ${i + 1} -----`);
            // test log the venue name...
            console.log(`Venue: ${venue}`);
            // test log the concert's location...
            console.log(`Location: ${city}, ${country}`);
            // test log the date of the concert...
            console.log(`Date: ${moment(date).format("MM/DD/YYYY")}`);
            let arr = ['concert-this', name, city, country, date];
            logThis(arr);
            console.log(`-----//`);
        }
    })
    .catch(function (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log("Error", err.message);
        }
        console.log(err.config);
    });
}
// === End ConcerThis()
// SPOIFYTHIS ()==>
function spotifyThis(name) {
    if (name === '' || name === null || name === undefined) {
        name = 'The Sign';
        spotify
        .search({type: 'track', query: name})
        .then(function (response) {
            let song = response.tracks.items[8];
                // artist = song.artists[0].name,
                // track = song.name,
                // purl = song.preview_url,
                // album = song.album.name;
            console.log(`========== RESPONSE ==========`);
            console.dir(song);
            console.log('========== END RESPONSE ==========');
            console.log('========== SPOTIFY THIS! ==========');
            // log the Artist(s)...
            console.log(`Artist: ${artist}`);
            // log the Song's name...
            console.log(`Song Title: ${track}`);
            // log the Preview link of the song...
            console.log(`Preview: ${purl}`);
            // log the album that the song is from...
            console.log(`Album: ${album}`);
            console.log('===================================');
            let arr = ['spotify-this-song', artist, track, purl, album];
            logThis(arr);
        })
        .catch(function (err) {
            console.log(err);
        });
    } else {
        spotify
    .search({type: 'track', query: name})
    .then(function (response) {
        let song = response.tracks.items[0],
            artist = song.artists[0].name,
            track = song.name,
            purl = song.preview_url,
            album = song.album.name;
            console.log(`========== RESPONSE ==========`);
            console.dir(song.images);
            console.log('========== END RESPONSE ==========');
        console.log('========== SPOTIFY THIS! ==========');
        // log the Artist(s)...
        console.log(`Artist: ${artist}`);
        // log the Song's name...
        console.log(`Song Title: ${track}`);
        // log the Preview link of the song...
        console.log(`Preview: ${purl}`);
        // log the album that the song is from...
        console.log(`Album: ${album}`);
        console.log('===================================');
        let arr = ['spotify-this-song', artist, track, purl, album];
        logThis(arr);
    })
    .catch(function (err) {
        console.log(err);
    });
    }
}
// === End SpoifyThis()
// MOVIETHIS ()==>
function movieThis(name) {
    if (name === '' || name === null || name === undefined) {
        name = 'Mr. Nobody'
    }
    let term = name.split(' ').join('+');
    let url = `http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`;
    console.log(url);
    axios.get(url).then(
        function(response) {
            let movie = response.data,
                title = movie.Title,
                year = movie.Year,
                imdbRating = movie.imdbRating,
                rtRating = movie.Ratings[1].Value,
                country = movie.Country,
                lang = movie.Language,
                plot = movie.Plot,
                actors = movie.Actors;
            console.log('========== MOVIE THIS! ==========');
            // Log the Title of the movie...
            console.log(`Title: ${title}`);
            // Log the Year the movie came out...
            console.log(`Year: ${year}`);
            // Log the IMDB Rating of the movie...
            console.log(`IMDB Rating: ${imdbRating}`);
            // Log the Rotten Tomatoes Rating of the movie...
            console.log(`Rotten Tomatoes Rating: ${rtRating}`);
            // Log the Country where the movie was produced...
            console.log(`Country: ${country}`);
            // Log the Language of the movie...
            console.log(`Language: ${lang}`);
            // Log the Plot of the movie...
            console.log(`Plot: ${plot}`);
            // Log the Actors in the movie...
            console.log(`Actors: ${actors}`);
            console.log('===================================');
            let arr = ['movie-this', title, year, imdbRating, rtRating, country, lang, plot, actors];
            logThis(arr);
        }
      );
}
// === End MovieThis()
// DOTHIS ()==>
function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // split array by a comma...
        let dataArr = data.split(',');
        // pass each index of the arr into the run function as args...
        run(dataArr[0], dataArr[1]);
    });
}
// === End doThis()

// LOGthis ()==> **BONUS**
function logThis(arr) {
    //test log arr
    // console.log(arr);
    let text = '[ ' + arr + ' ],\n';
    fs.appendFile('log.txt', text, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Content Added to log.txt!");
          }
    });
}
// === End logThis()