function getApartmentById(apartments, id) {
	return apartments.find((apartment) => apartment._id === id);
}

export { getApartmentById };
