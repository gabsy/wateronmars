
function getApartmentById(apartments, id) {
    return apartments.find(apartment => apartment.id === id);
}

export { getApartmentById };
