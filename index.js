



getWeather = async () =>{
    // console.log(city.value);

    var cityName = city.value.toUpperCase();

    console.log(cityName);


    if(cityName){

        try{

       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=315a06d7317352ab9cc6a1baf6ce2ac2
        `);

        // console.log(response);

        response.json().then((data)=>{

            var temp = Math.floor(data.main.temp - 273.15 )
            temperature.textContent = `${temp}° C `;
            
            

            var humidity = data.main.humidity;
            humidityHtml.textContent=`Humidity : ${humidity}%`

            var description = data.weather[0].description;

            descriptionHtml.textContent=`${description}`;

            var icon = data.weather[0].icon;

            iconHtml.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`)
            

            // var timeZoneId= data.timeZone;
            
            let date = new Date();  
            // dateHtml.innerHTML=`${date}`
        



            var requestOptions = {
                method: 'GET',
              };
              
              fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cityName}&apiKey=5087864d0b63472a8e5dd24d2839d6f4`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    geoData = result.features[0].properties;

                    var countryName = geoData.country.toUpperCase();
                    var stateName =geoData.state;
                   cityCountry.innerHTML=`${cityName}  |  ${countryName}`;
                    
                   //timeDate

                   var timeZoneId = geoData.timezone.name;
                   let timeData = new Date(new Date().toLocaleString("en-US", {timeZone: `${timeZoneId}`}));

                   dateHtml.textContent=`${timeData}`

                   console.log(timeData);
                })
                .catch(error => console.log('error', error));
        
        })

    }
    catch (error) {
        console.error('Error:', error);
        alert("Failed to retrieve weather data. Please try again.");
    }

    }
    else{
        alert("Enter a valid Input")
    }
}


document.addEventListener("keypress" ,(event)=>{

    if (event.key==="Enter") {
        getWeather();
    }
})