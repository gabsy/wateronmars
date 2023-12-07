export const formatDate = (date) => {
	const inputDate = new Date(date);

	// Get individual date components
	const day = inputDate.getUTCDate();
	const month = inputDate.getUTCMonth() + 1; // Months are 0-based, so add 1
	const year = inputDate.getUTCFullYear();

	// Format the date components as "MM.DD.YYYY"
	const formattedDate = `${day.toString().padStart(2, '0')}.${month
		.toString()
		.padStart(2, '0')}.${year}`;

	return formattedDate;
};
