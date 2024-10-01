load("config.js");
function execute(key, start) {
  if (!start) start = "0";
  let response = fetch(BASE_URL + "/?search" + key + "&start=" + start);
  if (response.ok) {
    let doc = response.html();
    let next;
    doc
      .select(".pagination")
      .select("a.pagination-next")
      .forEach((item) => {
        if (item.text() === "Next") {
          var link = item.attr("href");
          next = link.match(/start=(\d+)/);
        }
      });

    let data = [];
    doc.select(".main-container .main-body .blog.columns").forEach((e) => {
      e.select(".items-row.column").forEach((item) => {
        var cover = item.select(".item-thumb a img").attr("src");
        var name = item.select(".item-content a").text();
        var match = name.match(/\(\s*(\d+)\s*photos\s*\)/);
        data.push({
          name: name,
          link: item.select(".item-content a").attr("href"),
          description: match[1] + "photos",
          cover: cover,
          host: BASE_URL,
        });
      });
    });
    return Response.success(data, next);
  }
  return null;
}
