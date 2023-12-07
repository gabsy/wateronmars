// Filter and sort readings by apartment
function readingsFilterSorter(readings, apartmentId) {
	const readingsByApartment = getReadingsByApartment(readings, apartmentId);
	const readingsByDateSorted = readingsByApartment.sort(
		(a, b) => new Date(b.readingDate) - new Date(a.readingDate),
	);
	return readingsByDateSorted;
}

// Get readings by apartment
function getReadingsByApartment(readings, apartmentId) {
	return readings.filter((reading) => reading.apartmentId === apartmentId);
}

export { getReadingsByApartment, readingsFilterSorter };
