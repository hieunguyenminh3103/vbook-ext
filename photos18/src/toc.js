load('config.js');
function execute(url) {
    return Response.success([{
        name: 'Gallery',
        url: url
    }]);
}