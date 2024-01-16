import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useGlobalContext from '../../hooks/useGlobalContext';
// import api from '../../api/defaults';
import * as yup from 'yup';
import FormButtons from './FormButtons';
import { ModalSuccess } from '../Modal';

const AddReadingForm = ({ onClose }) => {
	// const { dispatch } = useGlobalContext();
	const apartments = useGlobalContext().state.apartments;
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isStateUpdated, setIsStateUpdated] = useState(false);

	// Validation Schema
	const validationSchema = yup.object().shape({
		apartmentId: yup.string().required('Apartment No. is required'),
		month: yup.string().required('Month is required'),
		year: yup.string().required('Year is required'),
		reading: yup
			.number()
			.positive()
			.integer()
			.required('Index value is required'),
		readingDate: yup.string().required('Reading Date is required'),
	});

	// Get previous month to display as default option
	const previousMonth = new Date(
		new Date().setMonth(new Date().getMonth() - 1),
	).toLocaleString('default', { month: 'short' });

	// Handle Submit function
	const handleSubmit = async () => {
		// const apartmentId = values.apartmentId;
		// const month = values.month;
		// const year = values.year;
		// const reading = values.reading;
		// const readingDate = values.readingDate;
		// const paid = values.paid;

		// const readingData = {
		// 	apartmentId,
		// 	month,
		// 	year,
		// 	reading,
		// 	readingDate,
		// 	paid,
		// };

		// API call to insert new reading
		// const addReading = async () => {
		// 	try {
		// 		const response = await api.post('/addReading', readingData);
		// 		setIsSubmitted(true);
		// 		dispatch({
		// 			type: 'UPDATE_READINGS',
		// 			payload: {
		// 				_id: response.data.insertedId,
		// 				...readingData,
		// 			},
		// 		});
		// 		setIsStateUpdated(true);
		// 	} catch (error) {
		// 		console.error('Error:', error);
		// 	}
		// };
		// addReading();
		setIsSubmitted(true);
		setIsStateUpdated(true);
	};

	return (
		<>
			{!isSubmitted && (
				<>
					<h2 className="text-3xl font-bold pb-10">Add reading</h2>
					<Formik
						initialValues={{
							apartmentId: '',
							month: previousMonth,
							year: new Date().getFullYear().toString(),
							reading: '',
							readingDate: new Date().toISOString().slice(0, 10),
							paid: false,
						}}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						{({ errors, touched }) => (
							<Form className="form space-y-6">
								<div>
									<label htmlFor="apartmentId">
										Apartment No.
									</label>
									<Field
										as="select"
										id="apartmentId"
										name="apartmentId"
									>
										<option
											value=""
											key="default"
											defaultValue
										>
											Select apartment
										</option>
										{apartments.map((apartment) => {
											return (
												<option
													value={apartment._id}
													key={apartment._id}
												>
													Apartment{' '}
													{apartment.apartmentNo}
												</option>
											);
										})}
									</Field>
									{errors.apartmentId &&
									touched.apartmentId ? (
										<div className="error">
											{errors.apartmentId}
										</div>
									) : null}
								</div>
								<div>
									<label htmlFor="month">Month</label>
									<Field as="select" id="month" name="month">
										<option value="Jan">January</option>
										<option value="Feb">February</option>
										<option value="Mar">March</option>
										<option value="Apr">April</option>
										<option value="May">May</option>
										<option value="Jun">June</option>
										<option value="Jul">July</option>
										<option value="Aug">August</option>
										<option value="Aug">September</option>
										<option value="Oct">October</option>
										<option value="Nov">November</option>
										<option value="Dec">December</option>
									</Field>
									{errors.month && touched.month ? (
										<div className="error">
											{errors.month}
										</div>
									) : null}
								</div>
								<div>
									<label htmlFor="year">Year</label>
									<Field id="year" name="year" type="text" />
									{errors.year && touched.year ? (
										<div className="error">
											{errors.year}
										</div>
									) : null}
								</div>
								<div>
									<label htmlFor="reading">Index</label>
									<Field
										id="reading"
										name="reading"
										type="number"
									/>
									{errors.reading && touched.reading ? (
										<div className="error">
											{errors.reading}
										</div>
									) : null}
								</div>
								<div>
									<Field
										id="paid"
										name="paid"
										type="checkbox"
										className="inline-block"
									/>
									<label
										htmlFor="paid"
										className="inline-block ml-3"
									>
										Paid
									</label>
								</div>
								<div>
									<label htmlFor="readingDate">
										Reading Date
									</label>
									<Field
										id="readingDate"
										name="readingDate"
										type="date"
									/>
									{errors.readingDate &&
									touched.readingDate ? (
										<div className="error">
											{errors.readingDate}
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
					content="Reading added successfully!"
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default AddReadingForm;
