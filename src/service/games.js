const APP_KEY= 'e621543c33ee44e48e7b82cfdc83fb23';


fetch('https://api.rawg.io/api/games?key='+APP_KEY)
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error("Error al realizar la solicitud:",
error));