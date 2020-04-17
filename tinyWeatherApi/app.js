const app = {};
app.key = "d6fOFH3OgD2ovgp5oyHh60h3CsiF718f";
app.results = $(".results");​
app.resetForm = function() {
    $("#search-input").val("").focus();
};​
app.displayImages = function(data) {
    data.forEach((gifObj) => {
        console.log(gifObj);
        const gifHtml = `
                    <div className="gif-box">
                        <div className="img-box">
                            <img src="${gifObj.images.original_still.url}" alt="${gifObj.title}"/>
                        </div>
                    </div>
                `;
        this.results.append(gifHtml);
    });
};

app.getImages = function(query) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search",
        method: "GET",
        dataType: "json",
        data: {
            api_key: this.key,
            q: query
        }
    }).then((result) => {
        this.results.empty();
        this.displayImages(result.data);
        this.resetForm();
    });
};

app.init = function() {
    $("form").on("submit", (e) => {
        e.preventDefault();
        const selection = $("input").val();
        if (selection) {
            console.log(this);
            this.getImages(selection);
        }
    });
};​
$(function() {
    app.init();
});