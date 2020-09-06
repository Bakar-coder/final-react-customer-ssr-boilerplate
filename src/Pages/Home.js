import React from 'react';
import { getProducts } from '../store/actions';

const prods = () => console.log('get products..........');
const Home = () => {
	return (
		<div className="App">
			<img
				src="ftbg.png"
				alt="footer image"
				style={{
					position: 'absolute',
					bottom: '0',
					left: '0',
					width: '100%',
					opacity: '0.6',
					height: '100%'
				}}
			/>
			<header className="App-header">
				<img
					src="logo.svg"
					className="App-logo"
					alt="logo"
					style={{ zIndex: '2' }}
				/>
				<p style={{ zIndex: '2' }}>
					React Redux <code>SSR / Isormophic</code> Boilerplate.
				</p>
				<p style={{ zIndex: '2' }}>
					Edit <code>src/Pages/Home.js</code> and save.
				</p>
				<a
					className="App-link"
					href="https://github.com/bakar-coder"
					target="_blank"
					rel="noopener noreferrer"
					style={{ zIndex: '2' }}
				>
					Wabomba Bakar
				</a>
			</header>
		</div>
	);
};
export default {
	component: Home,
	// fetch data from the backend api.................
	getInitialProps: ({ dispatch }) => dispatch(getProducts())
};
