const authState = {
	user: null,
	isAuth: false
};

export default (state = authState, action) => {
	const { type, payload } = action;

	switch (type) {
		default:
			return state;
	}
};
