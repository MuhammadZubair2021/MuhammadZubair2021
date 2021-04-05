const express = require('express');
const app = express();

//reuire Exported rout object to use then in our own defie middleware method
const rout = require('./appRoutes');
//Now actually tell our express module that i am using that and that exported routes
app.use(rout);
app.listen(3000);