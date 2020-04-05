console.log('Client!!')

// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })
//42.3605
//-71.0596



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg1 = document.querySelector('#msg1')
    const msg2 = document.querySelector('#msg2')
    msg1.textContent = 'loading...'
    msg2.textContent = ''
    //console.log(fetch('http://localhost:3000/weather?location='+location.value))
    if (search.value) {
        fetch('http://localhost:3000/weather?location=' + search.value).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    msg1.textContent = data.error
                } else {
                    //console.log(data.location)
                    console.log(data.placeName)
                    msg1.textContent = data.placeName
                    console.log(data.forecast)
                    msg2.textContent = data.forecast
                }
            })
        })
    } else {
        console.log('you must provide location')
        msg1.textContent = 'you must provide location'
    }
})