import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddReading from './pages/AddReading';
import SignIn from './pages/SignIn';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

	return (
		<div className="bg-wom-bgGlobal min-h-screen pt-10 pb-16 px-5">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route
							path="/"
							element={
							<>
								<SignedIn>
									<Home/>
								</SignedIn>
								<SignedOut>
									<SignIn />
								</SignedOut>
							</>
							}
						/>
						<Route
							path="/add-reading"
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
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
