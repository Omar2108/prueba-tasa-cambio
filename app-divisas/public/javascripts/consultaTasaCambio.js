const tabla1 = document.getElementById("tabla1");
const btnCambio = document.getElementById("btnObtenerCambio");



const consultarCambio = () => {

    fetch(`http://localhost:3000/divisas/v1/divisas`)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                console.log(data[index].rates);
                if (data[index].rates) {
                    
                    let datos = data[index].rates;

                    const tbody1 = document.createElement("tbody");
                    let tr1 = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    let td3 = document.createElement("td");
                    let td4 = document.createElement("td");
                    let td5 = document.createElement("td");

                    td1.textContent = datos.AED;
                    td2.textContent = datos.COP;
                    td3.textContent = datos.EUR;
                    td4.textContent = datos.GBP;
                    td5.textContent = datos.JPY;

                    tr1.appendChild(td1);
                    tr1.appendChild(td2);
                    tr1.appendChild(td3);
                    tr1.appendChild(td4);
                    tr1.appendChild(td5);

                    tbody1.appendChild(tr1);
                    tabla1.appendChild(tbody1);


                }

            }

        });


}


btnCambio.addEventListener("click", consultarCambio);