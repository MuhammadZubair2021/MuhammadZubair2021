const fetch = require('node-fetch'),
      express = require('express'),
      app = express()

const parseTitle = (body) => {
  let match = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== 'string')
    throw new Error('Unable to parse the title tag')
  return match[1]
}

app.get('/', (req, res) => {
  const { url } = req.query
  if (!url)
    return res.status(400).end('Missing url query parameter')
  
  fetch(url)
    .then(res => res.text()) // parse response's body as text
    .then(body => parseTitle(body)) // extract <title> from body
    .then(title => res.send(title)) // send the result back
    .catch(e => res.status(500).end(e.message)) // catch possible errors
})

app.listen((3000),function(){
    console.log('listening on port 3000');
})