const wkhtmltoimage = require('easy-wkhtmltoimage');
const express = require('express');
const fs = require('fs');

const app = express();
const config = {
  defaultPort: 80,
  paths: {
    storage: `${process.env.PWD}/storage`,
    assets: `${process.env.PWD}/assets`,
    height: 800
  }
};

const JOB_QUEUED = 0;
const JOB_DONE = 1;
const JOB_ERROR = 2;
const jobs = {

};

app.get('/api/screenshot', function (req, res) {
  const url = req.query.url;
  const hash = require('crypto').createHash('md5').update(url).digest("hex");
  const filename = `${config.paths.storage}/${hash}.png`;

  switch(jobs[url]) {
    case JOB_QUEUED:
      console.log('Requested queued url: ' + url);
      res.sendFile(`${config.paths.assets}/queue.png`);
      break;
    case JOB_ERROR:
      res.sendFile(`${config.paths.assets}/error.png`);
      break;
    case JOB_DONE:
      console.log('Serve from cache: ' + url);
      res.sendFile(filename);
      break;
    default:
    fs.stat(filename, function(err, stat) {
      if (!err) {
        console.log('Serve from cache: ' + url);
        jobs[url] = JOB_DONE;
        res.sendFile(filename);
      }
      else {
        console.log(`Queue screenshot for: ${url}`);
        res.sendFile(`${config.paths.assets}/queue.png`);
        jobs[url] = JOB_QUEUED;
        const options = {
          input: url,
          output: `${config.paths.storage}/${hash}.png`,
          cropH: 1000,
          cropW: 900,
          cropX:0,
          cropY:0
        };
        wkhtmltoimage.generate(options, function(code, filename) {
            if(code == 0) {
                jobs[url] = JOB_DONE;
                console.log(`Created screenshot: ${url}`);
            }
            else {
                jobs[url] = JOB_ERROR;
                console.log(`Error while taking screenshot: ${url}`);
            }
        });
      }
    });
  }
});

app.listen(process.env.PORT || config.defaultPort, function () {
  console.log('Listening on port ' + (process.env.PORT || config.defaultPort));
});
