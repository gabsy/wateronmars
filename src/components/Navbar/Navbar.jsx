import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { UserIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import {
	ArrowRightOnRectangleIcon,
	Bars3BottomRightIcon,
} from '@heroicons/react/24/outline';
import { useClerk, useUser } from '@clerk/clerk-react';
import useGlobalContext from '../../hooks/useGlobalContext';
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
				duration: 0.5,
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
						<div className="flex-1 text-center hidden lg:block">
							<MapPinIcon className="h-5 w-5 inline-block align-top mr-2" />
							{condoLocation}
						</div>
						<ul className="hidden lg:flex items-center flex-1 justify-end">
							<li className="ml-5">
								<UserIcon className="h-5 w-5 inline-block align-top lg:mr-2 fill-wom-primary" />
								<span className="hidden lg:inline">
									{user.fullName}
								</span>
								<span className="inline-block align-middle text-[10px] text-white bg-orange-500 rounded-sm uppercase ml-2 px-1 py-0.25">
									ap. 3
								</span>
								{userRole === 'admin' && (
									<span className="align-middle text-[10px] text-white bg-wom-primary rounded-sm uppercase ml-1 px-1 py-0.25">
										{userRole}
									</span>
								)}
							</li>
							<li className="ml-5">
								<button
									className="bg-transparent cursor-pointer hover:text-wom-primary"
									onClick={() => signOut()}
									title="Sign Out"
								>
									<ArrowRightOnRectangleIcon className="h-5 w-5 inline-block align-middle" />
								</button>
							</li>
						</ul>
						<button
							className="bg-transparent cursor-pointer hover:text-wom-primary ml-6"
							title="Menu"
						>
							<Bars3BottomRightIcon className="h-7 w-7 inline-block align-middle lg:hidden stroke-wom-primary" />
						</button>
					</>
				)}
			</nav>
		</motion.div>
	);
};

export default Navbar;
