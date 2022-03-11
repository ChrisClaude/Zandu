import * as React from 'react';
import { AuthConsumer } from '@/auth/providers/AuthProvider';
import Loading from '@/components/Loading';

type PrivateRouteProps = {
	Component: React.ComponentType
};

const PrivateRoute = ({ Component }: PrivateRouteProps) => (
	<AuthConsumer>
		{({ isAuthenticated, signinRedirect }) => {
			let value;
			if (!!Component && isAuthenticated()) {
				value = <Component />;
			} else {
				signinRedirect();
				value = <Loading />;
			}
			return value;
		}}
	</AuthConsumer>
);

export default PrivateRoute;
