import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { UserIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useClerk, useUser } from '@clerk/clerk-react';
import useGlobalContext from '../hooks/useGlobalContext';
import { motion } from 'framer-motion';

const Navbar = () => {
	const { user, isSignedIn } = useUser();
	const { signOut } = useClerk();
	const { userRole } = useGlobalContext().state;
	const condoLocation = import.meta.env.VITE_LOCATION;

	return (
		<motion.div
			className="max-w-screen-2xl mx-auto mb-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.3,
			}}
		>
			<nav className="flex justify-between items-center pt-6 px-2 pb-4">
				<div className="logo flex-1">
					<Link to="/">
						<img src={logo} alt="WaterOnMars" className="w-44" />
					</Link>
				</div>
				{isSignedIn && (
					<>
						<div className="flex-1 text-center">
							<MapPinIcon className="h-5 w-5 inline-block align-top mr-2" />
							{condoLocation}
						</div>
						<ul className="flex items-center flex-1 justify-end">
							<li className="mx-2 leading-4">
								<UserIcon className="h-5 w-5 inline-block align-bottom mr-2 fill-wom-primary" />
								{user.fullName}
								<span className="inline-block align-middle text-[10px] text-white bg-orange-500 rounded-sm uppercase ml-2 px-1 py-0.25">
									ap. 3
								</span>
								{userRole === 'admin' && (
									<span className="inline-block align-middle text-[10px] text-white bg-wom-primary rounded-sm uppercase ml-1 px-1 py-0.25">
										{userRole}
									</span>
								)}
							</li>
							<li className="ml-3">
								<button
									className="bg-transparent cursor-pointer hover:text-wom-primary"
									onClick={() => signOut()}
									title="Sign Out"
								>
									<ArrowRightOnRectangleIcon className="h-5 w-5 inline-block align-middle" />
								</button>
							</li>
						</ul>
					</>
				)}
			</nav>
		</motion.div>
	);
};

export default Navbar;
