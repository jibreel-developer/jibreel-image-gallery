const proxy = require('redbird')({ port: 8080, cluster: 2 });

const base = 'http://localhost'

const proxyArray = [
	{
		from: `${base}/api`,
		to: 'http://127.0.0.1:3000'
	},
	{
		from: `${base}`,
		to: 'http://127.0.0.1:4200'
	}
];

proxyArray.forEach(ele => proxy.register(ele.from, ele.to));
