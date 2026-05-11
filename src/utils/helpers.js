exports.checkDatesValid = (checkIn, checkOut) => {
    return new Date(checkOut) > new Date(checkIn);
};