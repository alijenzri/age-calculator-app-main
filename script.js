function valideDate(day, month, year) {
    const today = dayjs();

    // Check if day, month, and year are provided
    if (!day || !month || !year) return false;

    // Convert inputs to numbers
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
    if (year > today.year()
        || (year === today.year() && month > today.month() + 1)
        || (year === today.year() && month === today.month() + 1 && day > today.date())) {
        return false;
    }

    if (month < 1 || month > 12) return false;
    if (day < 1) return false;

    switch (month) {
        case 2:
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 100 === 0)) {
                if (day > 29) return false;
            } else {
                if (day > 28) return false;
            }
            break;

        case 4: case 6: case 9: case 11:
            if (day > 30) return false;
            break;

        default:
            if (day > 31) return false;
            break;
    }

    return true;
}



document.querySelector('.js-button').addEventListener('click', () => {
    const dayElement = document.getElementById('day').value;
    const monthElement = document.getElementById('month').value;
    const yearElement = document.getElementById('year').value;
    console.log(`input date : ${dayElement}/${monthElement}/${yearElement}`)
    console.log(`today date : ${dayjs().day()}/${dayjs().month() + 1}/${dayjs().year()}`)
    if (!valideDate(dayElement, monthElement, yearElement)) {
        console.log('date invalide !');
        return;
    }
});
