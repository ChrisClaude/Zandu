import * as React from 'react';
import {default as cn} from "classNames";

type FooterProps = React.HTMLProps<HTMLDivElement>;

const Footer = (props: FooterProps) => (
	<footer {...props} className={cn('flex items-center w-full border-t py-4', props.className)}>
		<a
			className="ml-4 text-white"
			href='https://eaglestack.tech'
			target='_blank'
			rel='noopener noreferrer'
		>
			Powered by <span className="text-blue-500 ml-1 hover:underline font-semibold">Eaglestack</span>
		</a>
	</footer>
);

export default Footer;
