// Original - https://2-0-2-5.vercel.app/

const app = document.getElementById('app')
const daysLeftElement = document.getElementById('days-left')
const fragment = document.createDocumentFragment()

const today = new Date()
const todayDigit = today.getTime() / (1000 * 60 * 60 * 24)

const newYearsDay = new Date('2026-01-01')
const newYearsDayDigit = newYearsDay.getTime() / (1000 * 60 * 60 * 24)
const diffInDays = todayDigit - newYearsDayDigit

// Create 365 divs for the days of the year
for (let i = 0; i < 365; i++) {
    const outerDiv = document.createElement("div")
    outerDiv.classList.add('outerDiv')

    const div = document.createElement("div")
    div.classList.add('dateDiv')
    div.id = i

    outerDiv.appendChild(div)
    fragment.appendChild(outerDiv)
}

function fillStart() {
    fillDivs(diffInDays)
}

app.appendChild(fragment)

const divs = document.querySelectorAll('.outerDiv')

// Function to fill divs based on the date comparison
function fillDivs(stoppingPoint) {
    calcDaysLeft(stoppingPoint)

    divs.forEach((e, i) => {
        if (e.children[0].id <= stoppingPoint) {
            e.children[0].classList.add('filled');
        } else {
            e.children[0].classList.remove('filled')
        }
    })
}

divs.forEach(div => {
    div.addEventListener('mouseover', (e) => {
        const hoveredDivIndex = parseInt(e.target.firstElementChild.id)
        fillDivs(hoveredDivIndex)
    })

    div.addEventListener('mouseout', (e) => {
        divs.forEach((e, i) => {
            e.children[0].classList.remove('filled')
        })
        fillDivs(diffInDays)
    })
})

let animationFrame

function calcDaysLeft(stoppingPoint) {
    cancelAnimationFrame(animationFrame) // Cancel any pending update
    animationFrame = requestAnimationFrame(() => {
        let daysLeft = 365 - Math.floor(stoppingPoint)
        let digits = daysLeft.toString().split("")

        let fragment = document.createDocumentFragment()

        digits.forEach((digit, index) => {
            let digitWrapper = document.createElement("span")
            digitWrapper.classList.add("rollingDigit")

            let span = document.createElement("span")
            span.textContent = digit
            span.style.animationDelay = `${index * 0.1}s` // Stagger effect

            digitWrapper.appendChild(span)
            fragment.appendChild(digitWrapper)
        })

        daysLeftElement.innerHTML = ""
        daysLeftElement.appendChild(fragment)
    })
}

fillStart()
