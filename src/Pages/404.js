import React, { Fragment } from 'react';

const NoPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				height: '75vh',
				alignItems: 'center'
			}}
		>
			<div style={{ textAlign: 'center' }}>
				<img src="404image.png" alt="404" style={{ height: '20rem' }} />
				<p style={{ fontSize: '22px', color: '#666' }}>
					Oops ! That Page Can't Be Found.
				</p>
			</div>
		</div>
	);
};

export default { component: NoPage };
