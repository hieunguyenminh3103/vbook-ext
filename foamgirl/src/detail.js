load('config.js');
function execute(url) {
    url = decodeURIComponent(url)
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let genres = [];
        doc.select("span.single-tags a").forEach((tag) => {
            genres.push({
                title: tag.text(),
                input: tag.attr("href"),
                script: "gen.js"
            })
        });
        Console.log(url)
        return Response.success({
            name: doc.select(".item_title h1").text(),
            cover: doc.select("div#image_div a img").first().attr("src"),
            author: 'Không có tác giả',
            description: "Người tà dâm luôn có quỷ theo sau 😈",
            host: BASE_URL,
            genres: genres,
        });
    }
    return null;
}