require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const links = []
let id = 0
app.use(bodyParser.urlencoded({extended: false}))
app.post('app/shorturl',(req,res) => {
  const { url } = req.body;
  console.log("hello")
  console.log(url)

  dns.lookup(url, (err) => {
    if(err) {
      return res.json({
        error: "invalid URL"
      })
    }else{
      id++
      let link = {
        original_url: url,
        short_url: `${id}`
      }
      links.push(link)
      return res.json(link)
    }
  })
})

app.get('app/shorturl/:id', (req, res) => {
  const { id } = req.params
  const shortURL = links.find(l => l.short_url === id)

  if (shortURL) {
    return res.redirect(shortURL.original_url)
  }else{
    res.json({
      error: "No short url"
    })
  }

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
