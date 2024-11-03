load('config.js');
function execute(url) {
    id = url.match(/v\/(.+)/)[1]
    let response= fetch(BASE_URL + "/v/" + id);
    if (response.ok) {
        let doc = response.html();
        return Response.success({
            name: doc.select("h1.title").first().text(),
            cover: doc.select("#content a img").first().attr("src"),
            author: 'Không có tác giả',
            description: "Người tà dâm luôn có quỷ theo sau 😈",
            host: BASE_URL,
        });
    }
    return null;
}