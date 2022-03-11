import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Footer from './Footer';
import SideBar from '@/components/layout/SideBar';


type LayoutProp = {
	children: React.ReactNode;
};

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	color: theme.palette.text.secondary,
	borderRadius:  0
}));

const Layout = ({ children }: LayoutProp) => (<>
	<Grid container className="h-screen">
		<Grid item xs={2} className="h-full">
			<Item className="h-full overflow-auto flex flex-col bg-gray-800 rounded-none">
				<SideBar/>
			</Item>
		</Grid>
		<Grid item xs={10} className="h-full">
			<Item className="h-full overflow-auto rounded-none">{children}</Item>
		</Grid>
	</Grid>
</>
);


export default Layout;
