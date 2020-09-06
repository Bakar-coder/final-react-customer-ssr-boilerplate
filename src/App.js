import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';

const App = ({ route }) => {
	return (
		<Fragment>
			<Helmet>
				<title>
					React Redux SSR / Isormophic Boilerplate | by Wabomba Baker
				</title>
			</Helmet>
			{renderRoutes(route.routes)}
		</Fragment>
	);
};
export default { component: App };
