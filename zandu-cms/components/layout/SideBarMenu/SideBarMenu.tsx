import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { default as cn } from 'classNames';

type SideBarProps = React.HTMLProps<HTMLDivElement>;

const SideBarMenu = (props: SideBarProps) => <aside {...props} className={cn('text-gray-100', props.className)}>
	<List>
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemText primary='Collection Types' />
				<ListItemIcon>
					<SearchIcon className='text-gray-100' />
				</ListItemIcon>
			</ListItemButton>
		</ListItem>
		<Link href='/contenttypes/users'>
			<a>
				<ListItem disablePadding className='hover:border-l-2 hover:border-blue-700 transition-all'>
					<ListItemButton>
						<ListItemIcon>
							<PeopleIcon className='text-gray-100' />
						</ListItemIcon>
						<ListItemText primary='Users' />
					</ListItemButton>
				</ListItem>
			</a>
		</Link>
	</List>
</aside>;

export default SideBarMenu;
