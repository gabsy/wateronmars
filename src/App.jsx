import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminMenu from './components/AdminMenu';
import ApartmentDetails from './components/pages/ApartmentDetails';
import Apartments from './components/pages/Apartments';
import SignIn from './components/pages/SignIn';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => {
	return (
		<>
			<div className="bg-wom-bgGlobal bg-cover min-h-screen pt-4 pb-12 px-4">
				<Router>
					<SignedIn>
						<Navbar />
						<ProtectedRoute allowedRoles={['admin']}>
							<AdminMenu classNames="hidden lg:flex" />
						</ProtectedRoute>
					</SignedIn>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<SignedIn>
										<ApartmentDetails />
									</SignedIn>
									<SignedOut>
										<SignIn />
									</SignedOut>
								</>
							}
						/>
						<Route
							path="apartments"
							element={
								<>
									<ProtectedRoute allowedRoles={['admin']}>
										<Apartments />
									</ProtectedRoute>
									<SignedOut>
										<Navigate to="/" replace />
									</SignedOut>
								</>
							}
						/>
						<Route
							path="apartments/:apartmentNo"
							element={
								<>
									<ProtectedRoute allowedRoles={['admin']}>
										<ApartmentDetails />
									</ProtectedRoute>
									<SignedOut>
										<Navigate to="/" replace />
									</SignedOut>
								</>
							}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
					<SignedIn>
						<Footer />
					</SignedIn>
				</Router>
				<SpeedInsights />
			</div>
		</>
	);
};

export default App;
