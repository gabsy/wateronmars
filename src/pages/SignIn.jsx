import { useSignIn } from '@clerk/clerk-react';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import logoDark from '../assets/logo-dark.svg';
import waves from '../assets/waves.svg';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isLoaded, signIn, setActive } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	async function submit(e) {
		e.preventDefault();
		await signIn
			.create({
				identifier: email,
				password,
			})
			.then((result) => {
				if (result.status === 'complete') {
					setActive({ session: result.createdSessionId });
				} else {
					console.log(result);
				}
			})
			.catch((err) => console.error('error', err.errors[0].longMessage));
	}

	return (
		<div className="flex w-full items-start mt-5 md:items-center lg:mt-0 h-screen">
			<div className="lg:w-full flex max-w-screen-xl lg:min-h-[700px] mx-auto bg-white rounded-3xl overflow-hidden shadow-sm">
				<div
					className="relative flex-1 hidden items-center justify-center bg-gray-900 lg:flex p-16"
					style={{
						backgroundImage:
							'linear-gradient(-210deg, rgba(97, 122, 255, 0) 9.54%, rgba(97, 122, 255, 0.55) 39.2%, rgba(97, 122, 255, 0.07) 67.55%)',
					}}
				>
					<div className="relative z-10 w-full space-y-24">
						<img src={logoDark} />
						<div className="space-y-8">
							<h2 className="text-white text-5xl font-bold leading-tight">
								Your{' '}
								<span className="mb-0 text-transparent bg-clip-text bg-gradient-to-r from-[#6179FF] to-[#62B4FF]">
									water
								</span>
								,<br />
								your stats, your control.
							</h2>
							<p className="text-white font-light text-md">
								A simple app for tracking and managing water
								consumption in our condominium, on{' '}
								<strong>Marte 30</strong>.<br />
								<br />
								Log in now to make a splash for sustainability!
							</p>
						</div>
					</div>
					<div
						className="absolute inset-0 my-auto h-full"
						style={{
							backgroundImage: `url(${waves})`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: '-10% 20%',
							backgroundSize: '120%',
						}}
					></div>
				</div>
				<div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
					<div className="w-full max-w-md  bg-white text-gray-600">
						<img src={logo} className="lg:hidden mb-10" />
						<div className="space-y-3 mb-8">
							<h2 className="text-gray-800 text-2xl font-bold sm:text-4xl mt-0">
								Welcome back!
							</h2>
							<p>
								Log in to view your apartment water
								consumptions.
							</p>
						</div>
						<form onSubmit={submit} className="space-y-8">
							<div>
								<label>Email</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label>Password</label>
								<input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<a
									href="#"
									className="pt-3 text-sm inline-block text-wom-primary hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<button className="btn">Sign in</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
