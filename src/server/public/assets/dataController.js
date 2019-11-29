this.getData().then((whatEver) => {
        console.log('a');
    })
    .catch((error) => {
        alert(error);
    });


function getData() {


    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open('GET', 'http://127.0.0.1:4949/index.html');
        peticion.send();
        peticion.addEventListener('load', () => {
            if (peticion.status === 200) {
                resolve(JSON.parse(peticion.responseText));
            }
            reject(new Error('Error ' + peticion.status + ' (' + peticion.statusText + ') en la petición'));
        });
        peticion.addEventListener('error', () => {
            reject(new Error('Error en la base de datos.'));
        });
    });
}
