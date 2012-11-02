// ---------- HTMLのサニタイズ ---------- //
 
exports.h = function(string) {
    return string.replace(/<|>|&|"|'/g, function(match) {
        switch(match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case '\'': return '&#039;';
        }
    });
};
 
// ---------- テンプレート的な物 ---------- //
 
exports.html = function(string) {
    return [
        '<!doctype html>',
        '<html lang="ja">',
            '<head>',
                '<meta charset="UTF-8" />',
                '<title>Hello World.</title>',
            '</head>',
            '<body>',
                '<h1>Hello World.</h1>',
                '<p>' + string + '</p>',
            '</body>',
        '</html>'
    ].join('\n');
};