const tabla2 = document.getElementById("tabla2");
const btnHistorico = document.getElementById("btnObtenerHistorico");



const consultarHistorico = () => {

    fetch(`http://localhost:3000/history/v1/historys`)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                console.log(data[index].rates);
                if (data[index].rates) {
                    
                    let datos = data[index].rates;

                    const tbody2 = document.createElement("tbody");
                    let tr2 = document.createElement("tr");
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

                    tr2.appendChild(td1);
                    tr2.appendChild(td2);
                    tr2.appendChild(td3);
                    tr2.appendChild(td4);
                    tr2.appendChild(td5);

                    tbody2.appendChild(tr2);
                    tabla2.appendChild(tbody2);


                }

            }

        });


}


btnHistorico.addEventListener("click", consultarHistorico);