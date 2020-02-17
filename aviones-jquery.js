function vel(avion) {
    var ran = Math.floor(Math.random() * 100)
    var v = 0
    switch (avion) {
        case "avioneta":
            if (ran < 61) v = 5
            else if (ran < 86) v = 4
            else v = 0
            return v
            break
        case "airbus":
            if (ran < 34) v = 12
            else if (ran < 67) v = 8
            else v = -3
            return v
            break
        case "f18":
            if (ran < 46) v = 16
            else if (ran < 91) v = 10
            else v = -20
            return v
            break
    }
}

const recorrido = 200;
var countdown = recorrido + 1;
var avi = { "avioneta": 0, "airbus": 0, "f18": 0 }

function moverAvion(a) {
    avi[a] += vel(a)
    if (avi[a] < 0) avi[a] = 0 //éste no podrá hacerle retroceder más allá de la línea de salida.
        //document.getElementById(a).style.marginLeft = avi[a] + "px";
    $('#' + a).css('marginLeft', avi[a] + "px");
    podium()
}



function startRace() {

    const interval = setInterval(() => {
        paso()
        if (countdown == 1) {
            clearInterval(interval);
            podium()
        }
    }, 100)
}

function paso() {

    // document.getElementById("turno-ant").innerHTML = (recorrido + 1) - countdown;
    //document.getElementById("turno").innerHTML = (recorrido + 2) - countdown;
    $('#turno-ant').val((recorrido + 1) - countdown)
    $('#turno').val((recorrido + 2) - countdown)

    countdown = --countdown <= 0 ? recorrido + 1 : countdown;
    Object.keys(avi).forEach(e => {
        moverAvion(e)
    });

}



function podium() {
    var ordenados = []

    for (var a in avi) {
        ordenados.push([a, avi[a]]);
    }

    ordenados.sort(function(a, b) {
        return b[1] - a[1];
    });

    $('#avi-1').text(ordenados[0][0]);
    $('#avi-2').text(ordenados[1][0]);
    $('#avi-3').text(ordenados[2][0]);
    $('#r-1').text(ordenados[0][1]);
    $('#r-2').text(ordenados[1][1]);
    $('#r-3').text(ordenados[2][1]);
    // alert("El ganador ha sido " + ordenados[0] + "\nEl segundo ha sido " + ordenados[1] + "\nEl tercero fué " + ordenados[2])

}