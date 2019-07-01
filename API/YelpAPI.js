const API_TOKEN = "uu_kOp_mgXoll-SmPLXoYXSnvwlGPaHoNPaYSuov4ChTjAm2Ige7usq53YNpw28bxZ5_q4cu9cPT3dzGXh-szCwne7RD4myZF7jm5O2uItWWBSCc8fbAJlRAjSwBXXYx";

export function getBarByVille(latitude, longitude ){

    const config = {
        headers: {'Authorization': 'Bearer '+API_TOKEN},
    };

    const url = 'https://api.yelp.com/v3/businesses/search?term=bar&city=bordeaux' +
        '&latitude='+latitude+'&longitude='+longitude
    return fetch(url,config)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getBarDetail(id){

    const config = {
        headers: {'Authorization': 'Bearer '+API_TOKEN},
    };
    const url = 'https://api.yelp.com/v3/businesses/'+id
    return fetch(url,config)
        .then((response) => response.json())
        .catch((error) => console.error(error))

}


export function getBarReview(id){

    const config = {
        headers: {'Authorization': 'Bearer '+API_TOKEN},
    };
    const url = 'https://api.yelp.com/v3/businesses/'+id+'/reviews'
    return fetch(url,config)
        .then((response) => response.json())
        .catch((error) => console.error(error))

}





