console.log('test fetch')




const form=document.querySelector('form')
const search=document.querySelector('input')
const p1=document.getElementById('mess-1')
const p2=document.getElementById('mess-2')


form.addEventListener('submit',(event)=>{
    event.preventDefault()

    

    const location = search.value
    p1.textContent='Loading...'
    p2.textContent=''
    
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data) =>{
            if(data.error){
                console.log(data.error)

                p1.textContent=data.error
            }else{
                console.log(data.location)
                console.log(data.forecast)

                p1.textContent=data.location
                p2.innerHTML=data.forecast
            }
        })
    })
    
})