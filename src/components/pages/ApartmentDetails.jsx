import GeneralStats from '../GeneralStats';
import ReadingsList from '../ReadingsList';
import PageContainer from '../PageContainer';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ApartmentDetails = () => {
	const { state } = useGlobalContext();
	const { apartmentNo } = useParams();
	const navigate = useNavigate();

	const selectedApartment = state.apartments.find(
		(apartment) => apartment.apartmentNo == apartmentNo,
	);

	useEffect(() => {
		if (!selectedApartment) {
			navigate('/');
		}
	}, [selectedApartment, navigate]);

	const apartmentId = selectedApartment
		? selectedApartment._id
		: state.apartment._id;

	return (
		<PageContainer>
			<GeneralStats apartmentId={apartmentId} />
			<ReadingsList apartmentId={apartmentId} />
		</PageContainer>
	);
};

export default ApartmentDetails;
