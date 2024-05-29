// Contains functions related to date manipulations in JS
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getDateNDaysAgo(n) {
    const today = new Date();
    today.setDate(today.getDate() - n);

    return formatDate(today);
}

export const dates = {
    startDate: getDateNDaysAgo(3),
    endDate: getDateNDaysAgo(1)
}