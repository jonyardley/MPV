var connect = require('connect'),
	http = require('http');

connect()
	.use(connect.static('./app'))
	.listen(3000);