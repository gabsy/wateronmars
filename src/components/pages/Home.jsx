import GeneralStats from '../GeneralStats';
import ReadingsList from '../ReadingsList';
import PageContainer from '../PageContainer';

const Home = () => {
	return (
		<PageContainer>
			<GeneralStats />
			<ReadingsList />
		</PageContainer>
	);
};

export default Home;
