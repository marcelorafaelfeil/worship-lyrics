import { createServer, Agent } from 'http';

export class PresentLyricService {
  constructor() {
    this.lyric = '';
    this.server = null;
  }

  updateLyric(lyric) {
    this.lyric = lyric;
  }

  initServer() {
    this.server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html', charset: 'utf-8' });
      res.write(`
        <html>
          <style>
            p {
              text-shadow: 2px 0 0 #000000, -2px 0 0 #000000, 0 2px 0 #000000, 0 -2px 0 #000000, 1px 1px #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000;
              font-size: 72px;
              font-family: 'Arial Black', sans-serif;
              color: #FFFFFF;
              text-align: center;
            }
          </style>
          <script>
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            console.log('this.responseText', this.responseText);
            if (this.readyState == 4 && this.status == 200) {
              document.querySelector('p').innerHTML = this.responseText;
            }
          };

          function callRequest() {
            xhttp.open("GET", "http://localhost:3006", true);
            xhttp.send();
            setTimeout(callRequest, 500);
          }

          callRequest();

          </script>
          <body><p>${this.lyric}</p></body>
        </html>`);
      res.end();
    });
    this.server.listen(3005);

    createServer((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        charset: 'utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.write(this.lyric);
      res.end();
    }).listen(3006);
  }
}
