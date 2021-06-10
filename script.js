/**
 * script.js
 * ---------------------------------------------------------------------------
 * 
 */

/**
 * I do it like this in case I want to easily save it to local storage, load it from a server or whatever. 
 * By having an object loaded with globals we can have an "install" feature on sign-up which stores this
 * stuff in LocalStorage rather than having it right there in the script for people to find and use
 * the API key. Of course, anyone who knows what they're doing would find it anywat but ...
 */
 const _globals = {
    gp_url : "https://api.giphy.com/v1/gifs/search",
    gp_apikey : "SU0nK2TDGOH1jPK58mWOmUj9FAS7JFp6",
    gp_default_search: "chicken"
};
//Let's put contents of the _globals object into window object (global)
Object.assign(window, _globals);


const addImage = function(data) {
    $(data).each((index, item) => {
        let id = `image_${index}`;
        let $col = $("<div>", {id:`"${id}"`, class:"col-md-4 col-lg-3 col-xl-2 m-4"});
        let $img = $("<img>", {src: item.images.original.url, width:"100%"});
        $col.append($img);
        $("#image-area").append($col);
    });
}

/**
 * app.js
 * ---------------------------------------------------------------------------
 * Define globals, Classes and perform initialization
 */
 console.log("app.js loaded");


 /**
  * Retrieve data from a url asynchronously using GET
  * @param {String} url      The url from which to retrieve information.
  * @param {Object} params   The parameters as keys and values. 
  * @return {Object}         Either the response as an object or null.
  */
 async function retrieve(url, params = {}) {
    let response = null;
    url = `${url}?${$.param(params)}`;
    try {
        response = await axios.get(url);
    }
    catch(error) {
        console.log(error.message);
        return null;
    }
    return response;
 } 

/**
 * When the DOM is loaded ...
 */
 $(() => {
    console.log("DOM loaded. Now let's get this party started!");
/* Event handlers */
    $("#theForm").on("submit", async function(event) {
        event.preventDefault();
        let search = $("#query").val();
        if(!search)search = gp_default_search;
        const response = await retrieve(gp_url, {
            q: search,
            api_key : gp_apikey,
            limit: $("#amt").val()
        });
        if(response) {
            addImage(response.data.data);
            $("#query").val("");
            $("#query").focus();
        }
    });
    $("#remove").click((event) => {
        event.preventDefault();
        $("#image-area").empty();
        $("#query").focus();
    });
    $("#query").focus();
});
