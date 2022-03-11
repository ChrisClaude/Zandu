import * as React from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Meta from '@/components/Meta';
import NavBar from '@/components/NavBar';
import ProfileMenuItem from '@/components/ProfileMenuItem';
import Layout from '@/components/Layout';
import { capitalizeFirstLetter } from '@/helpers/index';
import PrivateRoute from '@/auth/components/PrivateRoute';

const ContentTypes = () => {
	const router = useRouter();
	const { name } = router.query;

	return (<>
		<Meta title='Zandu CMS - Content Types' />
		<PrivateRoute Component={() =>
			(<Layout>
				<NavBar>
					<ProfileMenuItem />
				</NavBar>
				<div className='px-4 py-6'>
					<section className='flex items-center'>
						<div>
							<h2>{name && capitalizeFirstLetter(name.toString())}</h2>
							<p className='text-sm text-gray-500'>0 entries found</p>
						</div>
						<div className='ml-auto'>
							<Button variant='contained' startIcon={<AddIcon />}>
									Add New {name}
							</Button>
						</div>
					</section>

					<section>
						<h2>List of users</h2>
					</section>
				</div>
			</Layout>)} />
	</>
	);
};

export async function getServerSideProps(context) {
	// const res = await fetch(`https://.../data`)
	// const data = await res.json()
	console.log(context);

	return {
		props: {},
	}
}

export default ContentTypes;
