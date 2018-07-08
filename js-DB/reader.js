

window.onload = function () {
    var cod = document.getElementById('inp_codigo');
    var search;
    document.getElementById('result');
    

    eanDB.open(refresh);

    cod.addEventListener('keypress', function (e) {
        if ( e.keyCode == 13) {
            
            search = cod.value;
            eanDB.getCodigo(search, function (modelo) {
                sessionStorage.setItem('modelo', modelo);
            });
        };
    });

    function refresh() {
        var modelo = sessionStorage.getItem('modelo');
        result.innerHTML = modelo;
        /*alert('refresh reder.js' + search);
        //alert('search:' +search);
        eanDB.getCod.igo(s, function (modelo) {
                result.innerHTML = modelo;
                alert('add '+modelo);
            });*/
        //result.innerHTML = modelo;
        
    };
};
