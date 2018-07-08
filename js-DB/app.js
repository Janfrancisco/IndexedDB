/**

Auto executa uma função
(function () {
    console.log('OlÁ');
})();

*/

window.onload = function () {
    eanDB.open(refreshEan);
    var codigo = document.getElementById('eanCode');
    var modelo = document.getElementById('modelo');
    var salvar = document.getElementById('btnSalvar');;
    var tabela = document.getElementById('tbody')

    salvar.addEventListener('click', function () {        
        var cod = codigo.value;
        var mod = modelo.value;

        eanDB.createEan(cod, mod, function (ean) {
            refreshEan();
        });
    });
    function refreshEan() {
        console.log('refreshEan');
        eanDB.fetchTodos(function (eans) {
             console.log(eans);
            var output;            
            if(eans.length !== 0 ){
                for (var i = 0; i < eans.length; i++) {
                    // Read the todo items backwards (most recent first).
                    var ean = eans[(eans.length - 1 - i)];
                    //console.log(ean.codigo+' '+ ean.modelo);
                    console.log('result '+ean);
                    output += "<tr>";
                    output += "<td>"+ean.ID +"</td>";
                    output += "<td>"+ean.codigo +"</td>";
                    output += "<td>"+ean.modelo +"</td>";
                    output += "</tr>";
                };
                tabela.innerHTML = output;
            };
        });
    };
};
