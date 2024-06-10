function calculateAge(day, month, year) {
    const today = dayjs();
    const birthDate = dayjs(`${year}-${month}-${day}`);

    let ageYears = today.year() - birthDate.year();
    let ageMonths = today.month() - birthDate.month();
    let ageDays = today.date() - birthDate.date();

    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += dayjs(birthDate).add(ageMonths, 'month').daysInMonth();
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

function removeErrorMessage() {
    document.querySelector('.input-error-day').innerHTML = '';
    document.querySelector('.input-error-month').innerHTML = '';
    document.querySelector('.input-error-year').innerHTML = '';

    const inputGroupElements = document.querySelectorAll('.input-group');
    inputGroupElements.forEach((element) => {
        element.classList.remove('error');
    });
}

function errorMessage(day, month, year) {
    const dayElement = document.querySelector('.input-error-day');
    const monthElement = document.querySelector('.input-error-month');
    const yearElement = document.querySelector('.input-error-year');
    const today = dayjs();

    dayElement.innerHTML = '';
    monthElement.innerHTML = '';
    yearElement.innerHTML = '';

    if (day === '') {
        dayElement.innerHTML = 'This field is required';
    } else if (day > 31 || day < 1) {
        dayElement.innerHTML = 'Must be a valid day';
    }

    if (month === '') {
        monthElement.innerHTML = 'This field is required';
    } else if (month > 12 || month < 1) {
        monthElement.innerHTML = 'Must be a valid month';
    }

    if (year === '') {
        yearElement.innerHTML = 'This field is required';
    } else if (year > today.year()) {
        yearElement.innerHTML = 'Must be in the past';
    }

    const inputDate = dayjs(`${year}-${month}-${day}`);
    if (inputDate.isAfter(today, 'day')) {
        yearElement.innerHTML = 'Must be in the past';
    }

    const inputGroupElements = document.querySelectorAll('.input-group');
    
    inputGroupElements.forEach((element) => {
        element.classList.add('error');
    });

}



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
        || (year === today.year() && month === today.month() + 1 && day >= today.date())) {
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
    if (!valideDate(dayElement, monthElement, yearElement)) {
        errorMessage(dayElement, monthElement, yearElement);
        document.querySelector('.js-result-age').innerText = '--';
        document.querySelector('.js-result-month').innerText = '--';
        document.querySelector('.js-result-day').innerText = '--';
        return;
    } else {
        removeErrorMessage();
        const age = calculateAge(dayElement, monthElement, yearElement);
        document.querySelector('.js-result-age').innerText = age.years;
        document.querySelector('.js-result-month').innerText = age.months;
        document.querySelector('.js-result-day').innerText = age.days;
    }
});
