import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { GlobalContextProvider } from './context/GlobalProvider';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={clerkPubKey}>
			<GlobalContextProvider>
				<App />
			</GlobalContextProvider>
		</ClerkProvider>
	</React.StrictMode>,
);
