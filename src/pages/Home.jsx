import GeneralStats from '../components/GeneralStats';
import MonthsList from '../components/MonthsList';
import PageContainer from '../components/PageContainer';

const Home = () => {
	return (
		<PageContainer>
			<GeneralStats />
			<MonthsList />
		</PageContainer>
	);
};

export default Home;
