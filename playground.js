if(process.env.MODE_ENV !== "production"){
    require('dotenv').config();
}

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

async function findCoordinates(){
    const geoData = await maptilerClient.geocoding.forward("Los Angeles");
    console.log(geoData.features[0]);
}

findCoordinates();