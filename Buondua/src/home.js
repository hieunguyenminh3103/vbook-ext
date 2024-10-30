load('config.js');
function execute() {

    return Response.success([
        {title: "Update", input: BASE_URL, script: "gen.js"},
        {title: "Hot", input: BASE_URL + "/hot/", script: "gen.js"},
        {title: "Cosplay", input: BASE_URL + "/tag/cosplay-10688/", script: "gen.js"},
        {title: "Xiuren", input: BASE_URL + "/tag/xiuren-7417", script: "gen.js"}
        {title: "AI Generated", input: BASE_URL + "/tag/ai-generated-11406/", script: "gen.js"},
        {title: "Random", input: BASE_URL + "/", script: ""},
    ]);
}