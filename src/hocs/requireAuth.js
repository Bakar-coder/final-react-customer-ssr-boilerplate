import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
	const requreAuth = props => {
		switch (props.auth.isAuth) {
			case false:
				return <Redirect to="/login" />;
			case null:
				return <div className='preloader'>Loading...</div>;
			default:
				return <ChildComponent {...props} />;
		}
	};

	const mapStateToProps = ({ auth }) => ({ auth });
	const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(requreAuth);
};
