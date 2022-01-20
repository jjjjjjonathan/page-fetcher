const args = process.argv.slice(2);
const fs = require('fs');
const request = require('request');

const fetcher = args => {
  if (!args[0].includes(`http`)) {
    args[0] = `https://${args[0]}`;
  }
  request(args[0], (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    fs.writeFile(args[1], body, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Response: ${response.statusCode}. Downloaded and saved ${body.length} bytes to ${args[1]}`);
    });
  });
};

fetcher(args);