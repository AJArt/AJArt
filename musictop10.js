$(document).ready(function () {

    let APIKey = "AIzaSyC6YNBp5YTz9_VxpwWk3bfhpIaISC05Yq4";
    let googleURL = "https://www.googleapis.com/youtube/v3/search";
    var embedDiv1 = '<div class="player"><h1>';
    var embedDiv2 = '<h2>';
    let embedHTML1 = '"<iframe width="640" height="400" src="https://www.youtube.com/embed/';
    let embedHTML2 = '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>"';

 /*    <iframe width="1280" height="720" src="https://www.youtube.com/embed/9sWEecNUW-o" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> */

    let params = {
        part: 'snippet',
        key: APIKey,
        maxresults: 10,
        q: "music",
        order: "rating"
    }


    function loadVids() {

        let search = "rock music";
        params.q = search;
        let page = 0;

        $.getJSON(googleURL, params, function (data) {
            console.log(data);
            console.log(embedHTML1 + data.items[page].snippet.channelId + embedHTML2);
            $("#video").append(embedHTML1 + data.items[page].snippet.channelId + embedHTML2);
        });
    }

    loadVids();

});
