import * as React from 'react';

type NavBarProps = {
	children: React.ReactNode
};

const NavBar = ({ children }: NavBarProps) => (<div className='bg-gray-50 shadow-paper'>
	<nav className='h-16 flex w-full'>
		<span className='flex items-center py-2 px-4 ml-auto hover:bg-gray-100 cursor-pointer'>
			{children}
		</span>
	</nav>
</div>);

export default NavBar;
