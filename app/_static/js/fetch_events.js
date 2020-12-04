function getEventJSON(url, succesHandler, errorHandler) {

  //make a server request
  const xhr = new XMLHttpRequest();
  //return XMLHttpRequest as json file
  xhr.responseType = ('json');
  //open XMLhttpRequest 1 Method = string, 2 url= string 3 async/sync
  xhr.open('GET', url, true);
  // when the xhr.open synchronous flag = true. 'Do this on Load'
  xhr.onload = () => {
    //check status of xhr status if its all loaded or not
    if (xhr.status === 200) {
      //in case xhr.response != JSON make it JSON else skip to 'xhr.response'
      const data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
      succesHandle && succesHandler(data);
    } else {
      errorHandler && errorHandler('netwerk ERROR');
    };
    xhr.send(null);
  }



  
}








//root example
/*  {
    "id": "a5a55a09-9ca3-48f7-a6d5-55a552ffa181",
    "slug": "tijd-e-lijk",
    "title": "Tijd-e-lijk",
    "description": "Komedie van Henk Debal in een regie van Patrick Wolters.\r\nIn “chateau Dujardin“ heeft Madeleine meer dan genoeg van haar man, de gepensioneerde wijnboer Monsieur Antoine. En andersom! Er wordt een moordplan beraamd, zo zal die doodskist toch zijn nut bewijzen.",
    "image": {
      "full": "https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/f295f30dd075ebb5eb4dc8d4a34748a1/download",
      "thumb": "https://data.stad.gent/explore/dataset/gentse-feesten-evenementen-2019/files/f295f30dd075ebb5eb4dc8d4a34748a1/300"
    },
    "url": "http://www.stroppen-theater.be",
    "organizer": "vzw Gents Stroppentheater",
    "category": [
      "Theater"
    ],
    "location": "Kring Heilig Hart",
    "wheelchair_accessible": true,
    "day": "23",
    "start": "19:00",
    "end": "05:59"
  }, */