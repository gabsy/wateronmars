import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useClerk, useUser } from '@clerk/clerk-react';

const Navbar = () => {
	const { user, isSignedIn } = useUser();
	const { signOut } = useClerk();

	return (
		<div className="max-w-screen-2xl bg-white mx-auto rounded-xl">
			<nav className="flex justify-between items-center py-5 px-16 ">
				<div className="logo">
					<Link to="/">
						<img src={logo} alt="WaterOnMars" className="w-44" />
					</Link>
				</div>
				{isSignedIn && (
					<>
						<Link to="/add-reading">
							Add Reading
						</Link>
						<ul className="flex items-center">
							<li className="ml-3">{user.fullName}, Ap. 3</li>
							<li className="ml-3">
								<button
									className="bg-transparent cursor-pointer hover:text-wom-primary"
									onClick={() => signOut()}
								>Sign Out</button>
							</li>
						</ul>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
