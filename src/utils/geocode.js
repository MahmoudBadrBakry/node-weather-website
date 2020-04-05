let request = require('request')

const geocode = (address, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWJhZHIxMjEwIiwiYSI6ImNrNnMyYXFuOTBiZXkzZm1sMWh0eWQ3bTYifQ.vCFzFCys3Fx20N9Tzkg8jw&limit=1"
    try {
        request({ url, json: true }, (error, { body } = {}) => {
            if (error) {
                callback("error in getting data from network", undefined)
            } else if (!body.features.length) {
                callback("error in place name", undefined)
            } else {
                const { features } = body
                callback(undefined, {
                    longitude: features[0].center[0],
                    latitude: features[0].center[1],
                    placeName: features[0].place_name
                })
            }
        })
    }
    catch (e) {
        callback("there is no internet connection", undefined)
    }
}
module.exports = geocode