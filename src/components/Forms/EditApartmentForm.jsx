import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import api from '../../api/defaults';
import * as yup from 'yup';
import useGlobalContext from '../../hooks/useGlobalContext';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const EditApartmentForm = ({ apartmentId }) => {
	const { dispatch, state } = useGlobalContext();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);

	// Get apartment by id
	const apartment = state.apartments.find(
		(apartment) => apartment._id === apartmentId
	);

	// Validation Schema
	const validationSchema = yup.object().shape({
		apartmentNo: yup.number().required('Apartment No. is required'),
		ownerEmail: yup.string().email().required('Owner email is required'),
		ownerName: yup.string().required('Owner name is required'),
		ownerPhoneNo: yup.number().required('Owner phone number is required'),
	});

	const handleSubmit = async (values) => {
		const apartmentNo = values.apartmentNo;
		const ownerEmail = values.ownerEmail;
		const ownerName = values.ownerName;
		const ownerPhoneNo = values.ownerPhoneNo;

		const apartmentData = {
			_id: apartmentId,
			apartmentNo,
			ownerEmail,
			ownerName,
			ownerPhoneNo,
		};

		// API call to update apartment
		const updateApartmentInBackend = async () => {
			try {
				const response = await api.put('/updateApartment', apartmentData);
				setIsSubmitted(true);
				console.log(response.data);

				dispatch({ type: 'UPDATE_APARTMENTS', payload: apartmentData });
				setIsUpdated(true);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		updateApartmentInBackend();
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
									{errors.apartmentNo && touched.apartmentNo ? (
										<div className="error">
											{errors.apartmentNo}
										</div>
									) : null}
								</div>
								<div>
									<label htmlFor="ownerName">Owner Name</label>
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
									<label htmlFor="ownerEmail">Owner Email</label>
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
									{errors.ownerPhoneNo && touched.ownerPhoneNo ? (
										<div className="error">
											{errors.ownerPhoneNo}
										</div>
									) : null}
								</div>

								<button type="submit" className="btn mt-8">
									Save
								</button>
								<button
									type="reset"
									className="btn btn-outline ml-4 border-0"
								>
									Reset
								</button>
							</Form>
						)}
					</Formik>
				</>
			)}
			{isSubmitted && isUpdated && (
				<div className="text-green-500 text-xl">
					<CheckCircleIcon className="w-20 h-20 align-top mb-5 mx-auto" />
					<p>Apartment updated successfully!</p>
				</div>
			)}
		</>
	);
};

export default EditApartmentForm;
