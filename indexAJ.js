var Next = document.getElementById("next");
var Prev = document.getElementById("prev");
var h1 = document.getElementById("num");
var navButtons = document.getElementById("nav");
var pageNum;
var APIKey = "AIzaSyC6YNBp5YTz9_VxpwWk3bfhpIaISC05Yq4";
var googleURL = "https://www.googleapis.com/youtube/v3/search";
var embedHTML1 = '"<iframe width="640" height="400" src="https://www.youtube.com/embed/';
var embedHTML2 = '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>"';
var params = {
    part: 'snippet',
    key: APIKey,
    maxResults: 10,
    //    q: "music",
    order: "rating"
}

$(document).ready(function () {


    /*    <iframe width="1280" height="720" src="https://www.youtube.com/embed/9sWEecNUW-o" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe> */

    function pageLoad() {
        pageNum = getURLParam('pageNum', window.location.href);
        h1.innerHTML = pageNum;
        console.log(pageNum);
        loadVids();
        // var idParameter = getUrlParameters("id", url, true);
        // console.log(idParameter);
    }
    window.onload = pageLoad;

    function nextPage() {
        console.log("page num: " + pageNum);
        if (pageNum < 10) {
            pageNum++;
            window.location.replace("./?pageNum=" + pageNum);
        }
    }

    function prevPage() {
        console.log(pageNum);
        if (pageNum > 1) {
            pageNum--;
            window.location.replace("./?pageNum=" + pageNum);
        }

    }

    function submitSearch () {
        console.log("submit search");

        var input = $('#searchForm').val();
        params.q = input;

        console.log(params);

        loadVids();
    }

    // event listener
    $("#searchbutton").click(submitSearch);


    function loadVids() {

        console.log("load vids");
        console.log(params);
        $.getJSON(googleURL, params, function (data) {


            if (pageNum === undefined) {
                pageNum = 1;
            }

            let index = pageNum - 1;

            console.log(data);
            console.log("index: " + index);
            console.log("page num: " + pageNum);
            console.log(data.items[index].id.videoId);
            console.log(embedHTML1 + data.items[index].id.videoId + embedHTML2);

            $("#video").append(embedHTML1 + data.items[index].id.videoId + embedHTML2);
        });
    }


    function getURLParam(param, url) {
        var id = url.substring(url.lastIndexOf('/') + 1);
        if (id === "") {
            return 1;
        }
        else {
            let arr = id.split('?');
            let arr1 = arr[1].split('=');
            return arr1[1];
        }

    }

    Next.addEventListener('click', nextPage);
    Prev.addEventListener('click', prevPage);

});

