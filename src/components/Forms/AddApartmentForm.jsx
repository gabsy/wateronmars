import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import api from '../../api/defaults';
import * as yup from 'yup';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const AddApartmentForm = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Validation Schema
	const validationSchema = yup.object().shape({
		apartmentNo: yup.number().required('Apartment No. is required'),
		ownerEmail: yup.string().email().required('Owner email is required'),
		ownerName: yup.string().required('Owner name is required'),
		ownerPhoneNo: yup.number().required('Owner phone number is required'),
	});

	// Handle Submit function
	const handleSubmit = async (values) => {
		const apartmentNo = values.apartmentNo;
		const ownerEmail = values.ownerEmail;
		const ownerName = values.ownerName;
		const ownerPhoneNo = values.ownerPhoneNo;

		const readingData = {
			apartmentNo,
			ownerEmail,
			ownerName,
			ownerPhoneNo,
		};

		// API call to insert new reading
		const addApartment = async () => {
			try {
				const response = await api.post('/addApartment', readingData);
				setIsSubmitted(true);
				console.log(response.data);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		addApartment();
	};

	return (
		<>
			{!isSubmitted && (
				<>
					<h2 className="text-3xl font-bold pb-10">Add apartment</h2>
					<Formik
						initialValues={{
							apartmentNo: '',
							ownerName: '',
							ownerEmail: '',
							ownerPhoneNo: '',
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

								<button type="submit" className="btn">
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
			{isSubmitted && (
				<div className="text-green-500 font-bold text-xl">
					<CheckCircleIcon className="w-20 h-20 align-top mb-5 mx-auto" />
					<p>Apartment added successfully!</p>
				</div>
			)}
		</>
	);
};

export default AddApartmentForm;
