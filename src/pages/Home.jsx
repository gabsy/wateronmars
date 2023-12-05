import GeneralStats from '../components/GeneralStats';
import ReadingsList from '../components/ReadingsList';
import PageContainer from '../components/PageContainer';

const Home = () => {
	return (
		<PageContainer>
			<GeneralStats />
			<ReadingsList />
		</PageContainer>
	);
};

export default Home;
