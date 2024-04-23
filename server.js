const express = require('express')
app = express();
const port = 8080;

app.get("/", (req,res,next) => {

  res.send('this works yay');

})

const apiRouter = require('./api');

app.use('/api', apiRouter);

const { client } = require('./db');

client.connect();


app.listen(port, () => {console.log(`now listening on port ${port}`)});


