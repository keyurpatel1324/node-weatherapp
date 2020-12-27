console.log('Main js is loading')


const weatherForm = document.querySelector('form')
const searchLoc = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Locading...............'
    e.preventDefault()
    const location = searchLoc.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        console.log('Inside ...................' + location)
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.place
                messageTwo.textContent= 'Current Temp is: '+ data.foreCast.temp + ' It Feels like '+data.foreCast.feelslike
                console.log(data)
            }
        })
    })
})