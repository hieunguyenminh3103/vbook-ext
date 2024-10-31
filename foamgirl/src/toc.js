load('config.js');
function execute(url) {
    let response= fetch(url);
    if(response.ok){
        let doc = response.html();
        let data = [];
        let lastPage = doc.select('.nav-links [title="Last"]');
        if(lastPage.length){
            lastPage = lastPage.text();
            let id = url.match(/(\d+)\.html/)[1];
            for(let i=1; i<=lastPage; i++)
            {
                data.push({
                    name: "Page: " + i,
                    url: BASE_URL + '/' + id + "_" + i + ".html"
                })
            }
        } else {
            doc.select(".nav-links > *").forEach(item=> {
                if(item.select('.fa').length == 0 ){
                    let check = item.attr('class').match(/current/)
                    if(check){
                        data.push({
                            name: item.text(),
                            url: url
                        })
                    }else {
                        data.push({
                            name: item.attr('title'),
                            url: item.attr('href'),
                        })
                    }
                }
            })
        }
        
        return Response.success(data);
    }   
    return Response.error("something went wrong")

}