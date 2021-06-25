const monthElement = document.querySelector('.calendar__top-month')
const monthPicker = document.querySelector('.calendar__month--picker')
const monthPickerList = document.querySelectorAll('.calendar__month--picker div')
const dateList = document.querySelectorAll('.calendar__body-dates div')
const dateElement = document.querySelector('.calendar__body-dates')
const nextYearBtn = document.querySelector('button.next')
const prevYearBtn = document.querySelector('button.prev')
const yearElement = document.querySelector('h3.year')
const yearBtns = document.querySelectorAll('.calendar__top-year button')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date();
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()
let numberDayOfMonth = 0;

renderCurrentDate(day, month, year)

function getNumberDayOfMonth(month, year){
    
    if([1, 3, 5, 7, 8, 10, 12].includes(month)){
        return 31
    }
    if([4, 6, 9, 11].includes(month)){
        return 30
    }
    if(month === 2){
        if(isLeapYear(year)){
            return 29
        }
        return 28
    }
}

function renderCurrentDate(day, month, year) {
    numberDayOfMonth = getNumberDayOfMonth(month + 1, year)
    monthElement.textContent = months[month]
    yearElement.textContent = year
    

    const date2 = new Date(year, month, 1)
    const fistDayOfMonth = date2.getDay() === 0 ? 7 : date2.getDay();
    let html = ''
    let countDay = 1
    for(let i = 1; i<numberDayOfMonth + fistDayOfMonth; i++){
        if(i >= fistDayOfMonth){
            html+= `<div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        ${countDay}
                    </div>`
            countDay++
        }else{
            html+= `<div></div>`
        }
    }
    dateElement.innerHTML = html
   
        if(day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()){
            dateElement.querySelectorAll('div')[day + fistDayOfMonth - 2].style.backgroundColor = 'pink'
        }
        
    
    
}
monthElement.addEventListener('click', () => {
    monthPicker.classList.add('show')
})
monthPickerList.forEach(e => {
    e.addEventListener('click', (item) => {
        dateElement.classList.remove('active')
        let dataMonth = +item.target.getAttribute('data-month')
        monthPicker.classList.remove('show')
        month = dataMonth
        renderCurrentDate(day, month, year)
        setTimeout(() => {
            dateElement.classList.add('active')
        }, 200)
    })
})

yearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        dateElement.classList.remove('active')
        if(btn.classList.value === 'next'){
            year++
        }
        if(btn.classList.value === 'prev'){
            year--
        }
        renderCurrentDate(day, month, year)
        setTimeout(() => {
            dateElement.classList.add('active')
        }, 200)
    })
})

function isLeapYear(year){
    year % 4 === 0 ? true : false
}
