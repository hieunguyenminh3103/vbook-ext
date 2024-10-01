const BASE_URL = "https://buondua.com";

function execute(key, page) {
  if (!page) page = "0";

  let response = fetch(BASE_URL+"/", {
    method: "GET",
    queries: {
      search: encodeURIComponent(key).replace("%2F", "/"),
      start: page,
    },
  });

  if (response.ok) {
    let doc = response.html();
    let data = [];
    doc.select(".blog.columns > .items-row.column").forEach((e) => {
      var name = e.select(".item-thumb img").first().attr("alt");
      var match = name.match(/\(\s*(\d+)\s*photos\s*\)/);
      data.push({
        name: name,
        description: match[1] + " photos",
        link: encodeURIComponent(
          e.select(".page-header a").first().attr("href")
        ).replace("%2F", "/"),
        cover: e.select(".item-thumb img").firts().attr("src"),
        host: BASE_URL,
      });
    });
    var next = /\?start=(\d+)/.exec(
      doc.select(".pagination-next").attr("href")
    );
    if (next) next = next[1];
    return Response.success(data, next);
  }
  return null;
}
