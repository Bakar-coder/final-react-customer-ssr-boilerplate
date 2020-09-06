import React, { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import Routes from './Routes';

export default (req, store, context) => {
	const initialState = serialize(store.getState());
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter context={context} location={req.path}>
				<Fragment>{renderRoutes(Routes)}</Fragment>
			</StaticRouter>
		</Provider>
	);

	const helmet = Helmet.renderStatic();

	return `
  <!DOCTYPE html>
    <html lang="en"  ${helmet.htmlAttributes.toString()}>
      <head>
       ${helmet.title.toString()}
       ${helmet.meta.toString()}
       ${helmet.link.toString()}
       <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
       <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
       <link rel='stylesheet' href='styles.css' /> 
        </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${initialState}
        </script>
        <script src="bundle.js"></script>
        <script src="vendors~main.js"></script>
      </body>
    </html>
  `;
};
