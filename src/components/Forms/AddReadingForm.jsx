import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../api/defaults';
import * as yup from 'yup';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const AddReadingForm = () => {
    const { apartments } = useGlobalContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Validation Schema
    const validationSchema = yup.object().shape({
        apartmentId: yup.string().required('Apartment No. is required'),
        month: yup.string().required('Month is required'),
        year: yup.string().required('Year is required'),
        reading: yup.number().positive().integer().required("Index value is required"),
        readingDate: yup.string().required('Reading Date is required'),
    });

    // Get previous month
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const previousMonth = currentDate.toLocaleString('default', { month: 'short' });

    // Handle Submit function
    const handleSubmit = async (values) => {
        const apartmentId = values.apartmentId;
        const month = values.month;
        const year = values.year;
        const reading = values.reading;
        const readingDate = values.readingDate;

        const readingData = {
            apartmentId,
            month,
            year,
            reading,
            readingDate,
        }
        
        // API call to insert new reading
        const addReading = async () => {
            try {
                const response = await api.post('/addReading', readingData);
                setIsSubmitted(true);
                console.log(response.data);
            }
            catch (error) {
                console.error('Error:', error);
            }
        }
        addReading();
    };

    return (
        <>
            {!isSubmitted && (
                <Formik
                    initialValues={{
                        apartmentId: '',
                        month: previousMonth,
                        year: new Date().getFullYear().toString(),
                        reading: '',
                        readingDate: new Date().toISOString().slice(0, 10),
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <div>
                                <label htmlFor="apartmentId">Apartment No.</label>
                                <Field
                                    as="select"
                                    id="apartmentId"
                                    name="apartmentId"
                                >
                                    <option value="" defaultValue>Select apartment</option>
                                    {apartments.map((apartment) => {
                                        return (
                                            <option value={apartment._id} key={apartment._id}>
                                                Apartment {apartment.apartmentNo}
                                            </option>
                                        );
                                    })}
                                </Field>
                                {errors.apartmentId && touched.apartmentId ? (
                                    <div className="error">{errors.apartmentId}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="month">Month</label>
                                <Field
                                    as="select"
                                    id="month"
                                    name="month"
                                >
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
                                    <div className="error">{errors.month}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="year">Year</label>
                                <Field
                                    id="year"
                                    name="year"
                                    type="text"
                                />
                                {errors.year && touched.year ? (
                                    <div className="error">{errors.year}</div>
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
                                    <div className="error">{errors.reading}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="readingDate">Reading Date</label>
                                <Field
                                    id="readingDate"
                                    name="readingDate"
                                    type="date"
                                />
                                {errors.readingDate && touched.readingDate ? (
                                    <div className="error">{errors.readingDate}</div>
                                ) : null}
                            </div>

                            <button type="submit" className="btn">Save</button>
                            <button type="reset" className="btn btn-outline ml-4 border-0">Reset</button>
                        </Form>
                    )}
                </Formik>
            )}
            {isSubmitted && (
                <div className="text-green-500 text-xl text-center">
                    <CheckCircleIcon className="w-20 h-20 align-top mb-5 mx-auto" />
                    <p>Reading added successfully!</p>
                </div>
            )}
        </>
    )
}

export default AddReadingForm
