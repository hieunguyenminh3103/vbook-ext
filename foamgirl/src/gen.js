load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    let response = fetch(url + '/page/' + page) 
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        doc.select("#index_ajax_list > li").forEach(e => {
            data.push({
                name: e.select(".meta-title").text(),
                link: e.select(".meta-title").attr("href"),
                cover: e.select(".waitpic").attr("src"),
                host: BASE_URL,
            })
        });
        var next = doc.select(".next page-numbers").first().attr("href").match(/page\/(\d+)/)
        if (next) next = next[1]; else next = '';
        return Response.success(data, next)
    }
    return null;
}