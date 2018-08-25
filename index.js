let Next = document.getElementById("next");
let Prev = document.getElementById("prev");
let h1 = document.getElementById("num");
let navButtons = document.getElementById("nav");
let pageNum;
let APIKey = "AIzaSyC6YNBp5YTz9_VxpwWk3bfhpIaISC05Yq4";
let googleURL = "https://www.googleapis.com/youtube/v3/search";
var embedDiv1 = '<div class="player"><h1>';
var embedDiv2 = '<h2>';
let embedHTML1 = '"<iframe width="640" height="400" src="https://www.youtube.com/embed/';
let embedHTML2 = '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>"';

/*    <iframe width="1280" height="720" src="https://www.youtube.com/embed/9sWEecNUW-o" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> */
function pageLoad() {
    pageNum = getURLParam('pageNum',window.location.href);
    h1.innerHTML = pageNum;
    console.log(pageNum);
    loadVids();
    // var idParameter = getUrlParameters("id", url, true);
    // console.log(idParameter);
}
window.onload = pageLoad;

function nextPage (){
    console.log(pageNum);
    if (pageNum != 10){
        pageNum++;
        window.location.replace("http://127.0.0.1:5500/?pageNum=" + pageNum);
    }
}
function prevPage (){
    console.log(pageNum);
    if (pageNum != 1){
        pageNum--;
        window.location.replace("http://127.0.0.1:5500/?pageNum=" + pageNum);
    }

}
let params = {
    part: 'snippet',
    key: APIKey,
    maxResults: 10,
    // q: "music",
    order: "rating"
}


function loadVids() {

    let search = "rock music";
    params.q = search;


    $.getJSON(googleURL, params, function (data) {
        console.log(data);
        console.log(embedHTML1 + data.items[pageNum].snippet.channelId + embedHTML2);
        let index = pageNum - 1;
        $("#video").append(embedHTML1 + data.items[index].id.videoId + embedHTML2);
    });
}


function getURLParam(param, url){
    var id = url.substring(url.lastIndexOf('/') + 1);
    if (id === ""){
        return 1;
    }
    else{
        let arr = id.split('?');
        let arr1 = arr[1].split('=');
        return arr1[1];
    }

}

Next.addEventListener('click', nextPage);
Prev.addEventListener('click', prevPage);


