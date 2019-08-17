window.onload=function(){
    const pathname = window.location.pathname;
    const pathNameParts=pathname.split('/');
    const gameId=pathNameParts[pathNameParts.length-1];
    fetch(`/get-game-detail?id=${gameId}`)   
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let receiveData=data.data;
        const player1=receiveData.players[0].name;
        const player2=receiveData.players[1].name;
        const player3=receiveData.players[2].name;
        const player4=receiveData.players[3].name;
        document.querySelector('#player1').innerHTML=player1;
        document.querySelector('#player2').innerHTML=player2;
        document.querySelector('#player3').innerHTML=player3;
        document.querySelector('#player4').innerHTML=player4;
    })
    .catch((error)=>{
        console.log(error);
        window.alert(error.message);
    });
}