import * as React from 'react';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { AuthContext } from '@/auth/providers/AuthProvider';

const ProfileMenuItem = () => {
	const {logout} = React.useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id='basic-button'
				aria-controls='basic-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<Avatar className='bg-blue-400'>CD</Avatar>
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Link href="/profile">
					<a>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
					</a>
				</Link>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</div>);
};

export default ProfileMenuItem;
