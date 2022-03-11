import * as React from 'react';
import Layout from '@/components/Layout';
import Meta from '@/components/Meta';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import NavBar from '@/components/NavBar';


export default function Home() {
	return (
		<Layout>
			<Meta title='Zandu CMS - Home' />
			<NavBar>
				<ProfileMenuItem />
			</NavBar>
			<div className='px-8 py-10'>
				<h1>Welcome to Zandu CMS</h1>
				<p>We help you manage you apps content</p>
			</div>
		</Layout>
	);
}
