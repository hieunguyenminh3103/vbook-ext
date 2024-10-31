load('config.js');
function execute(url) {
    url = decodeURIComponent(url)
    let response= fetch(url);
    if(response.ok){
        let doc = response.html();
        let data = [];
        doc.select(".nav-links > *").forEach(item=> {
            if(item.select('.fa').length == 0 ){
                let check = item.attr('class').match(/current/)
                if(check){
                    data.push({
                        name: item.text(),
                        url: url
                    })
                    Console.log(item.text())
                }else {
                    data.push({
                        name: item.attr('title'),
                        url: item.attr('href'),
                    })
                }
            }
        })
        return Response.success(data);
    }   
    return Response.error("something went wrong")

}