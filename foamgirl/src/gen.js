load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    url = url.replace(BASE_URL, "");
    url = url.replace(/\/$/, "");
    if (!page) page = '1';
    var browser = Engine.newBrowser() // Khởi tạo browser
    browser.launch(BASE_URL + url+'/page/'+page, 5000) // Mở trang web với timeout, trả về Document object
    var doc = browser.html() // Trả về Document object của trang web
    browser.close() // Đóng browser khi đã xử lý xong
    let data = [];
    doc.select("#index_ajax_list > li").forEach(e => {
        data.push({
            name: e.select(".meta-title").text(),
            link: e.select(".meta-title").attr("href"),
            cover: e.select(".waitpic").attr("src"),
            host: BASE_URL,
        })
    });
    var next = doc.select(".next.page-numbers").first().attr("href").match(/page\/(\d+)/)
    if (next) next = next[1]; else next = '';
    return Response.success(data, next)
}