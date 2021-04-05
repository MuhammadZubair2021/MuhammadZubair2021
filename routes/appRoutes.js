const express = require('express');
const route = express.Router(); // Here we come to specific point which is router() you can also use express() only. like route = express();

route.get('/',(request,respose)=>{ // another syntax of call back function
	respose.send('hi from / route');
})

route.get('/example',(request,respose)=>{
	respose.send('hi from /Example route');
})

route.get('/courses',(request,respose)=>{ 
	respose.send('hi from /courses route');
})

module.exports = route;