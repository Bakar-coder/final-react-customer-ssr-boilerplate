import App from './App';
import Home from './Pages/home';
import PageNotFound from './Pages/404';

const Routes = [
	{ ...App, routes: [{ ...Home, path: '/', exact: true }, { ...PageNotFound }] }
];

export default Routes;
