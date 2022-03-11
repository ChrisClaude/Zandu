import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => <Box className='flex items-center justify-center h-full w-full absolute'>
	<div>
		<p className='text-lg italic'>We're loading a few things. Please be patient!</p>
		<div className='flex justify-center mt-8'>
			<CircularProgress />
		</div>
	</div>
</Box>;

export default Loading;
