import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../api/defaults';
import * as yup from 'yup';
import FormButtons from './FormButtons';
import { ModalSuccess } from '../Modal';

const EditReadingForm = ({ readingId, onClose }) => {
	const { dispatch, state } = useGlobalContext();
	const { readings, apartments } = state;
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isStateUpdated, setisStateUpdated] = useState(false);

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

	// Get reading by id
	const reading = readings.find((reading) => reading._id === readingId);

	// Handle Submit function
	const handleSubmit = async (values) => {
		const apartmentId = values.apartmentId;
		const month = values.month;
		const year = values.year;
		const reading = values.reading;
		const readingDate = values.readingDate;
		const paid = values.paid;

		const readingData = {
			_id: readingId,
			apartmentId,
			month,
			year,
			reading,
			readingDate,
			paid,
		};

		// API call to update reading
		const updateReadingInBackend = async () => {
			try {
				await api.put('/updateReading', readingData);
				setIsSubmitted(true);
				// Update readings in global state
				dispatch({ type: 'UPDATE_READING', payload: readingData });
				setisStateUpdated(true);
			} catch (error) {
				console.error('Error:', error);
			}
		};
		updateReadingInBackend();
	};

	return (
		<>
			{!isSubmitted && (
				<>
					<h2 className="text-3xl font-bold pb-10">Edit reading</h2>
					<Formik
						initialValues={{
							apartmentId: reading?.apartmentId,
							month: reading?.month,
							year: reading?.year,
							reading: reading?.reading,
							readingDate: reading?.readingDate,
							paid: reading?.paid,
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
										<option value="" defaultValue>
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
										className="inline-block ml-3 mb-0"
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

								<FormButtons onClose={onClose} />
							</Form>
						)}
					</Formik>
				</>
			)}
			{isSubmitted && isStateUpdated && (
				<ModalSuccess
					content="Reading updated successfully!"
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default EditReadingForm;
