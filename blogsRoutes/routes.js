const express = require('express');
const rout = new express.Router();
const collections = require('../collections/blogAppCollection');

// Create an request for /
rout.get('/',collections.detail_index);

// Now create an request for /create-blog .
rout.post('/create-blog', collections.create_blog);

//This is the actuall get request for all the blogs...
rout.get('/blogs', collections.all_blogs);

//Create a request for showing a blog in a details when some one click on Title, snippet or body of the blog
rout.get('/blogs/:id', collections.find_by_id);

//Create a delete request for delete btn...
rout.delete('/blogs/:id',collections.delete_by_Id);

//Create a UPdate request for delete btn...
rout.post('/update_page/:id',collections.update_by_Id);

//Request for redering error page incase user time wrong url.
rout.use(collections.un_matched_url);

  //Finally export routes stored in rout .
  module.exports= rout;