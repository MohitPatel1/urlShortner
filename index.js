require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const dns = require('dns');
const app = express();
const links = []
let id = 0

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', bodyParser.urlencoded({extended: false}),(req,res) => {
  let inputUrl = req.body.url
  id++;
  links.push({
    original_url : inputUrl,
    short_url: `${id}`
  })
  res.json({
    original_url : inputUrl,
    short_url: `${id}`
  })
})

app.get('/api/shorturl/:id',(req,res) => {
  const id = req.params.id
  const url = links.find(link => link.short_url === id)
  if(url){
    res.redirect(url.original_url)
  }else{
    res.json({error: "no short url"})
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
