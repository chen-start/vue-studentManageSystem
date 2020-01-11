function formatDate(value) {
    if (value instanceof Date || Date.parse(value)) {
        value = new Date(value);
        let year = value.getFullYear();
        let month = value.getMonth() + 1;
        let date = value.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        // console.log(`${year}-${month}-${date}`)
        return `${year}-${month}-${date}`;
    }
    return value;
}

export default {
    formatDate
}