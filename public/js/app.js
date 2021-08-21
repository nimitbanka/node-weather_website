console.log('Client side java script')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#first')
const messageTwo = document.querySelector('#second')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='LOADING....'
    messageTwo.textContent = ''
    fetch('/weather?address='+ encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent =data.error
        }else{
            messageOne.textContent = (data.forecast)
            messageTwo.textContent = (data.location)
        }
    })
})
})