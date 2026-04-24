
const mongoose = require('mongoose')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp-maptiler');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'6921600812cb3003e28d276c',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum jfuefew ifjef nidcnicw',
            price,
            images: [
                {
                    url:  'https://res.cloudinary.com/dd8gengdi/image/upload/v1764495728/yelpCamp/g8r0ntwx0gxefdkexuh8.jpg',
                    filename: 'yelpCamp/g8r0ntwx0gxefdkexuh8'

                },
                {
                    url: 'https://res.cloudinary.com/dd8gengdi/image/upload/v1764495516/yelpCamp/m4zale0dafqj3hgo7518.jpg',
                    filename:'yelpCamp/m4zale0dafqj3hgo7518'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})