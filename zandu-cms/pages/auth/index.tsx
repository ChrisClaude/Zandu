import * as React from 'react';
import { UserManager } from 'oidc-client';
import Button from '@mui/material/Button';

const config = {
	authority: "https://localhost:6001",
	client_id: "js",
	redirect_uri: "https://localhost:3000/auth/login",
	response_type: "code",
	scope:"openid profile api1",
	post_logout_redirect_uri : "https://localhost:3000/",
};

// const mgr = new UserManager(config);

const Index = () => {
	const [results, setResults] = React.useState('');

	// React.useEffect(() => {
	// 	mgr.getUser().then((user) => {
	// 		if (user) {
	// 			setResults(`User logged in ${user.profile}`);
	// 		}
	// 		else {
	// 			setResults("User not logged in");
	// 		}
	// 	});
	// }, []);


	return (
		<div>
			<Button variant="contained">Login</Button>
			<Button variant="contained">Call API</Button>
			<Button variant="contained">Logout</Button>

			<pre>{results}</pre>
		</div>
	);
};

export default Index;
