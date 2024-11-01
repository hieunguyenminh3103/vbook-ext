function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select("div#image_div > p > a").forEach(e => {
            data.push(e.select("img").attr("src"));
        });

        return Response.success(data);
    }

    return null;
}