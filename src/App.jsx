import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
// import Layout from './components/Layout';
import Navbar from './components/Navbar';
import AdminMenu from './components/AdminMenu';
import Home from './pages/Home';
import AddReading from './pages/AddReading';
import Apartments from './pages/Apartments';
import SignIn from './pages/SignIn';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

	return (
		// <div className="bg-wom-bgGlobal bg-[url('bg-image3.jpg')] bg-cover min-h-screen pt-10 pb-16 px-5">
		<div className="bg-wom-bgGlobal bg-cover min-h-screen pt-4 pb-16 px-5">
			<Router>
				<SignedIn>
					<Navbar />
					<ProtectedRoute allowedRoles={['admin']}>
						<AdminMenu />
					</ProtectedRoute>
				</SignedIn>
				<Routes>
					<Route
						path="/"
						element={
						<>
							<SignedIn>
								<Home />
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
							<ProtectedRoute allowedRoles={['admin']}>
								<Apartments />
							</ProtectedRoute>
						}
					/>
					<Route
						path="add-reading"
						element={
							<ProtectedRoute allowedRoles={['admin']}>
								<AddReading />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/edit-reading"
						element={
							<ProtectedRoute allowedRoles={['admin']}>
								<AddReading />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
