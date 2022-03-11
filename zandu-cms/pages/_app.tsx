import * as React from 'react';
import { AppProps } from 'next/app';
import '@/styles/styles.scss';
import { AuthProvider } from '@/auth/providers/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {

	if (typeof window !== 'undefined') {
		return (
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		);
	}

	return <Component {...pageProps} />;
}

export default MyApp;
