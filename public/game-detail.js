window.onload = function () {
    const pathname = window.location.pathname;
    const pathNameParts = pathname.split('/');
    const gameId = pathNameParts[pathNameParts.length - 1];
    fetch(`/get-game-detail?id=${gameId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let receiveData = data.data;
            const player1 = receiveData.players[0].name;
            const player2 = receiveData.players[1].name;
            const player3 = receiveData.players[2].name;
            const player4 = receiveData.players[3].name;
            document.querySelector('#player1').innerHTML = player1;
            document.querySelector('#player2').innerHTML = player2;
            document.querySelector('#player3').innerHTML = player3;
            document.querySelector('#player4').innerHTML = player4;

            const addRoundBtn = document.querySelector('#addRoundBtn');
            var i = 0;
            addRoundBtn.addEventListener('click', function (event) {
                i++;
                var tr = document.createElement("TR");
                tr.innerHTML = `<th scope="row">${i}</th>
            <td><input type='number' value=0 id="1${i}"></td>
            <td><input type='number' value=0 id="2${i}"></td>
            <td><input type='number' value=0 id="3${i}"> </td>
            <td><input type='number' value=0 id="4${i}"> </td>`
                document.querySelector('.table').appendChild(tr);
                for (let j = 0; j < 4; j++) {
                    document.querySelector(`#${j}${i}`).addEventListener('input', function (event) {
                        let ketquamoi=document.querySelector(`#${j}${i}`).value;
                        const player = i;
                        const round = j;
                        fetch(`/update`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: gameId,
                                player: player,
                                round: round,
                                ketuqamoi: ketquamoi,
                            })
                        
                        })
                        .then(function(res){
                            return res.json();
                        })
                        .then(function(doc){
                            document.querySelector(`#player${player}`).innerHTML=doc.data.sum;
                        })
                })
        }
            })


        })
        .catch ((error) => {
    console.log(error);
    window.alert(error.message);
});
}