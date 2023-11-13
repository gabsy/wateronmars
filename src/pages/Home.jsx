import GeneralStats from '../components/GeneralStats';
import MonthsList from '../components/MonthsList';

const Home = () => {
	return (
		<div className="max-w-screen-2xl bg-white mx-auto mt-6 px-16 py-20 rounded-xl">
			<GeneralStats />
			<MonthsList />
		</div>
	);
};

export default Home;
