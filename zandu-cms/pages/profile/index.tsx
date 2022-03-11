import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import PrivateRoute from '@/auth/components/PrivateRoute';
import Meta from '@/components/Meta';
import { AuthContext } from '@/auth/providers/AuthProvider';
import NavBar from '@/components/NavBar';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import Layout from '@/components/Layout';

const Profile = () => {
	const { getUser, parseJwt } = React.useContext(AuthContext);
	const [user, setUser] = React.useState<{} | any>({});
	const [parsedUser, setParsedUser] = React.useState<{} | any>({});

	useEffect(() => {
		async function getCurrentUser() {
			getUser().then(res => {
				setUser(res);
				setParsedUser(parseJwt(res.access_token));
			});
		}

		getCurrentUser();
	}, []);

	const handleCallAPI = async () => {
		fetch(`${process.env.NEXT_PUBLIC_ZANDU_CORE_ROOT_URL}/identity`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${user.access_token}`,
			},
		}).then(res => res.json())
			.then(data => console.log(data));
	};

	return (
		<PrivateRoute Component={() => <Layout>
			<Meta title='Zandu CMS - Profile' />
			<NavBar>
				<ProfileMenuItem />
			</NavBar>
			<div className='px-8 py-10'>
				<p>Profile</p>
				<div className='overflow-auto w-full'>
					Name: <span>{parsedUser.name}</span>
					<pre>
						{JSON.stringify(parsedUser)}
					</pre>
				</div>
				<Button variant='contained' onClick={handleCallAPI}>Call API</Button>
			</div>
		</Layout>} />
	);
};

export default Profile;
