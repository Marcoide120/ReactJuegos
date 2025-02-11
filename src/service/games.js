const APP_KEY= 'b2685e103fb743d09dc5325f1174937d';


fetch('https://api.rawg.io/api/games?key='+APP_KEY)
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error("Error al realizar la solicitud:",
error));