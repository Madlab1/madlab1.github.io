var fs = require('fs');

var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port: 9090,host:"192.168.0.253"});
var readStream = fs.createReadStream("test.mp3",
                                     {
                                        'flags': 'r',
                                        'mode': 0666,
                                        'bufferSize': 64 * 1024
                                     }
                                    );

wss.on('connection', function(ws) {
                                    readStream.on('data', function(data)
                                                                {
                                                                    ws.send(data,     {binary: true, mask: false});
                                                                }
                                                );
                                    }
        );