const http = require('http');
const formidable = require('formidable');
const server = http.createServer(function(req, res){
    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
}).listen(3000);

function show(req, res) {
    const html = ''
    + '<form method="post" action="/" enctype="multipart/form-data">'
    + '<p><input type="text" name="name" /></p>'
    + '<p><input type="file" name="file" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
    }
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        console.log(fields);
        console.log(files);
        res.end('upload complete!');
    });
    form.on('progress', function(bytesReceived, bytesExpected){
        let percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    });
}

function isFormData(req) {
    const type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}