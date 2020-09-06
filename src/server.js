// =================================================================================//
//  You shouldn't change this file except adding your api url to a proxy server
// =================================================================================//
import '@babel/polyfill';
import express from 'express';
import renderer from './renderer';
import createStore from './store/createStore';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './Routes';
const port = process.env.PORT || 3000;
const app = express();

// App static directories
app.use(express.static('build/static'));
app.use(express.static('public'));

// replace the host url below with your api url.
app.use('/api', proxy('http://localhost:5000'));

app.get('/*', (req, res) => {
	const store = createStore(req);
	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) =>
			route.getInitialProps ? route.getInitialProps(store) : null
		)
		.map(promise =>
			promise
				? new Promise((resolve, reject) => promise.then(resolve).catch(resolve))
				: null
		);

	Promise.all(promises)
		.then(() => {
			const context = {};
			const content = renderer(req, store, context);
			if (context.url) return res.redirect(301, context.url);
			if (context.notFound) res.status(404);
			res.send(content);
		})
		.catch(ex => console.log(ex));
});

app.listen(port, () =>
	console.log(
		`<<<<<<<<<<<<<<<<<<<<[ app started on port:${port} ]>>>>>>>>>>>>>>>>>>>>`
	)
);
