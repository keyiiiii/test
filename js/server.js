var http = require('http'),
    sys = require('sys'),
    fs = require('fs'),
    fn = require('./fn'); // 作成したfn.jsを読み込む（後述）
 
/* ---------- HTTPサーバ ---------- */
 
http.createServer(function (req, res) {
 
    var dateTime = new Date().toLocaleString(),
        log = function(status) { // ----- log出力用関数
            sys.puts([
                req.headers['x-forwarded-for'] || req.client.remoteAddress, // IP
                dateTime, // アクセスした日時
                req.method, // メソッド
                req.url, // URL
                status, // ステータスコード
                req.headers.referer || '-', // リファラ
                req.headers['user-agent'] || '-' // ユーザーエージェント
            ].join('\t'));
        };
 
    if(req.url === '/favicon.ico') { // ----- とりあえずfaviconだけ
        fs.readFile(__dirname + '/favicon.ico', function(err, data) {
            if(!err) { // ファビコンがあれば200
                res.writeHead(200, {
                    'Content-Type': 'image/vnd.microsoft.icon',
                    'Cache-control': 'private, max-age=86400' // 1日キャッシュさせる
                });
                res.end(data);
                log(200);
            } else { // ファビコンが無かったら404
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 Not found.');
                log(404);
            }
        });
    } else { // ----- favicon以外全て200
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fn.html(req.method + ' ' + fn.h(req.url)));
        log(200);
    }
 
}).listen(8124, '127.0.0.1');
 
/* ---------- 例外処理 ---------- */
 
process.on('uncaughtException', function (err) {
    sys.puts('Caught exception: ' + err.message);
});