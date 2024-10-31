load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace(BASE_URL, "");
    url = url.replace(/\/$/, "");
    if (!page) page = '1';
    let response = fetch(BASE_URL + url+'/page/'+page, {
        method: "GET"
    })
    if(response.ok){
        let data = [];
        let doc = response.html();
        doc.select("#index_ajax_list > li").forEach(e => {
            var insidePageUrl = e.select(".meta-title").attr("href")
            let insidePage = fetch(insidePageUrl, {
                method: "GET"
            })
            let cover = (insidePage.ok) ? insidePage.html().select("div#image_div a img").first().attr("src") : null;
            data.push({
                name: e.select(".meta-title").text(),
                link: insidePageUrl,
                cover: cover,
                host: BASE_URL,
            })
        });
        var next = doc.select(".next.page-numbers").first().attr("href").match(/page\/(\d+)/)
        if (next) next = next[1]; else next = '';
        return Response.success(data, next)
    }
    return Response.error("Something went wrong")
}