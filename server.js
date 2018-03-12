const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('public'))

// app.get('/', (request, response) => {
//   response.sendFile()
// })

app.listen(app.get('port'), () => {
  console.log(`Color Block server running on port ${app.get('port')}`);
});
