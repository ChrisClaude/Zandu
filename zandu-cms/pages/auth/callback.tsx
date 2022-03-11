import * as React from 'react';
import Callback from '@/auth/components/Callback';
import { AuthContext } from '@/auth/providers/AuthProvider';

const CallbackPage = () => {
	const {isAuthenticated} = React.useContext(AuthContext);

	React.useEffect(() => {
		console.log("is Authenticated", isAuthenticated());
	}, []);

	return (
		<div>
			<Callback />
		</div>
	);
}

export default CallbackPage;
