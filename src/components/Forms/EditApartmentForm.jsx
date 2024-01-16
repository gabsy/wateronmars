import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
// import api from '../../api/defaults';
import * as yup from 'yup';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from './FormButtons';
import { ModalSuccess } from '../Modal';

const EditApartmentForm = ({ apartmentId, onClose }) => {
	const { state } = useGlobalContext();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isStateUpdated, setIsStateUpdated] = useState(false);

	// Get apartment by id
	const apartment = state.apartments.find(
		(apartment) => apartment._id === apartmentId,
	);

	// Validation Schema
	const validationSchema = yup.object().shape({
		apartmentNo: yup.number().required('Apartment No. is required'),
		ownerEmail: yup.string().email().required('Owner email is required'),
		ownerName: yup.string().required('Owner name is required'),
		ownerPhoneNo: yup.number().required('Owner phone number is required'),
	});

	const handleSubmit = async () => {
		// const apartmentNo = values.apartmentNo;
		// const ownerEmail = values.ownerEmail;
		// const ownerName = values.ownerName;
		// const ownerPhoneNo = values.ownerPhoneNo;

		// const apartmentData = {
		// 	_id: apartmentId,
		// 	apartmentNo,
		// 	ownerEmail,
		// 	ownerName,
		// 	ownerPhoneNo,
		// };

		// // API call to update apartment
		// const updateApartmentInBackend = async () => {
		// 	try {
		// 		await api.put('/updateApartment', apartmentData);

		// 		setIsSubmitted(true);
		// 		// Update apartments in global state
		// 		dispatch({
		// 			type: 'UPDATE_APARTMENT',
		// 			payload: apartmentData,
		// 		});
		// 		setIsStateUpdated(true);
		// 	} catch (error) {
		// 		console.error('Error:', error);
		// 	}
		// };
		// updateApartmentInBackend();
		setIsSubmitted(true);
		setIsStateUpdated(true);
	};

	return (
		<>
			{!isSubmitted && (
				<>
					<h2 className="text-3xl font-bold pb-10">Edit apartment</h2>
					<Formik
						initialValues={{
							apartmentNo: apartment?.apartmentNo,
							ownerName: apartment?.ownerName,
							ownerEmail: apartment?.ownerEmail,
							ownerPhoneNo: apartment?.ownerPhoneNo,
						}}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{({ errors, touched }) => (
							<Form className="form space-y-6">
								<div>
									<label htmlFor="apartmentNo">
										Apartment No.
									</label>
									<Field
										id="apartmentNo"
										name="apartmentNo"
										type="number"
									/>
									{errors.apartmentNo &&
									touched.apartmentNo ? (
										<div className="error">
											{errors.apartmentNo}
										</div>
									) : null}
								</div>
								<div>
									<label htmlFor="ownerName">
										Owner Name
									</label>
									<Field
										id="ownerName"
										name="ownerName"
										type="text"
									/>
									{errors.ownerName && touched.ownerName ? (
										<div className="error">
											{errors.ownerName}
										</div>
									) : null}
								</div>

								<div>
									<label htmlFor="ownerEmail">
										Owner Email
									</label>
									<Field
										id="ownerEmail"
										name="ownerEmail"
										type="email"
									/>
									{errors.ownerEmail && touched.ownerEmail ? (
										<div className="error">
											{errors.ownerEmail}
										</div>
									) : null}
								</div>

								<div>
									<label htmlFor="ownerPhoneNo">
										Owner Phone No.
									</label>
									<Field
										id="ownerPhoneNo"
										name="ownerPhoneNo"
										type="phone"
									/>
									{errors.ownerPhoneNo &&
									touched.ownerPhoneNo ? (
										<div className="error">
											{errors.ownerPhoneNo}
										</div>
									) : null}
								</div>
								<p className="text-wom-green text-sm mt-2">
									* As this is demo version, no data will be
									submitted.
								</p>
								<FormButtons onClose={onClose} />
							</Form>
						)}
					</Formik>
				</>
			)}
			{isSubmitted && isStateUpdated && (
				<ModalSuccess
					content="Apartment updated successfully!"
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default EditApartmentForm;
