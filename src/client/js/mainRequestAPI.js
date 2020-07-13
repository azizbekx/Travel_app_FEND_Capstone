

/* Function to GET Web API Data*/

const getGeonami = async (locationURL, cityName, userGeonami) => {
    const fullURL = `http://${locationURL}${cityName}${userGeonami}`;

    const response = await fetch(fullURL);
    let jsonResponse = await response.json();

    return jsonResponse;
};
const getWeather = async (weatherAPI, lat, lng, weatherKey) => {
    const fullURL = `https://${weatherAPI}&lat=${lat}&lon=${lng}&key=${weatherKey}`;
    const response = await fetch(fullURL);
    let jsonResponse = await response.json();

    return jsonResponse;
};

const getImage = async (imageAPI, cityName = "nature", imageKey) => {
    const fullURL = `https://${imageAPI}?key=${imageKey}&q=${cityName}&image_type=photo`;
    const response = await fetch(fullURL);
    let jsonResponse = await response.json();
    return jsonResponse;
};

export {getGeonami,getWeather,getImage}