'use strict'

const express = require('express');

const port = 8080;
const host = '0.0.0.0';

const app = express();
// app.get('/', (request, response) => {
//     response.send('Hello World');
// });

// app.listen(PORT, HOST, () => {
//     console.log(`Running on http://${HOST}:${PORT}`);
// });


app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.listen(port, host, () => console.log(`Example app listening on port ${port}!`))