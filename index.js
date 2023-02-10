require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// app.get('/app/shorturl', function (req, res) {
//   const { id } = req.params
//   const shortURL = links.find(l => l.short_url === id)
//   console.log(shortURL)
//   if (shortURL) {
//     return res.redirect(shortURL.original_url)
//   }else{
//     res.json({
//       error: "No short url"
//     })
//   }
// })

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id', function(req, res) {
  const { id } = req.params
  console.log(id)
  res.json({ greeting: 'hai API' });
});
const links = []
let id = 0
 
// app.post('/api/shorturl', bodyParser.urlencoded({extended: false}) ,(req,res) => {
//   const inputUrl  = req.body['url'];
//   console.log("hello")
//   console.log(url)
//   console.log(req)
//   res.json({
//     greeti: 'hello'
//   })
  // dns.lookup(url, (err) => {
  //   if(err) {
  //     return res.json({
  //       error: "invalid URL"
  //     })
  //   }else{
  //     id++
  //     let link = {
  //       original_url: url,
  //       short_url: `${id}`
  //     }
  //     links.push(link)
  //     return res.json(link)
  //   }
  // })
// })


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
