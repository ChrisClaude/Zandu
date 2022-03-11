import * as React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SideBarMenu from '@/components/layout/SideBarMenu';

const SideBar = () => {
	return <>
		<Header />
		<SideBarMenu />
		<Footer className="mt-auto" />
	</>
};

export default SideBar;
