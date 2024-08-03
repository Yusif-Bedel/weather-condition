const apiKey='5615150530259c5910ade690d9bc29b1';
const form=document.querySelector('form');
const input=document.querySelector('input');
const weatherDiv=document.querySelector('.weather')
const iconDiv=document.querySelector('.icon')
const temperatureDiv=document.querySelector('.temperature')
const descriptionDiv=document.querySelector('.description')
const detailsDiv=document.querySelector('.details')
const cityDiv=document.querySelector('.city')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const inputValue=input.value
    getWeather(inputValue)
})

async function getWeather(inputValue){
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
        const data=await response.json()
        console.log(data);
        const temperature=Math.round(data.main.temp)
        const icon=data.weather[0].icon 
        const details=[
            `Feels Like:${Math.round(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
            `Wind:${data.wind.speed} m/s`
        ]
        cityDiv.innerHTML=`<h1>${data.name}</h1>`
        iconDiv.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        temperatureDiv.textContent=`${temperature}°C`
        let detailsNew=details.map((detail)=>`<div>${detail}</div>`).join('')
        detailsDiv.innerHTML=detailsNew
        descriptionDiv.textContent=''
    }
    catch(error){
        cityDiv.textContent=''
        iconDiv.textContent=''
        temperatureDiv.textContent=''
        detailsDiv.textContent=''
        descriptionDiv.textContent='Please enter a correct city name'
    }
}