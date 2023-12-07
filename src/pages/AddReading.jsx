import { AddReadingForm } from '../components/Forms';
import Modal from '../components/Modal';
import PageContainer from '../components/PageContainer';

const AddReading = () => {
	return (
		<PageContainer title="Add Reading">
			<div className="flex justify-between items-start mb-12">
				<div className="w-1/3">
					<Modal content={<AddReadingForm />} />
				</div>
				<div className="w-2/3">{/* <AddReadingForm /> */}</div>
			</div>
		</PageContainer>
	);
};

export default AddReading;
