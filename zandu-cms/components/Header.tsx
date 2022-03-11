import Link from 'next/link';

const Header = () => {
	return (
		<header className="py-2 h-16 flex items-center bg-blue-700">
			<Link href="/">
				<a className="text-white cursor-pointer font-bold ml-4 text-lg">
				Zandu CMS
				</a>
			</Link>
		</header>
	);
};

export default Header;
