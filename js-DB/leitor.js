var request, db;
var result, cod;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

cod = document.getElementById('inp_codigo');
result = document.getElementById('result');

request = indexedDB.open('Mydatabase', 6);

request.onsuccess = function(e){
    console.log('request.onsuccess');
    //document.getElementById('result').innerHTML = output;
    db = e.target.result;
};


cod.addEventListener('keypress', function(e){
    if(e.wich == 13 || e.keyCode == 13){
        getModelo(cod.value);
      
    };
});
function getModelo(codigo) {
    var tr = db.transaction("Ean", "readonly");
    var newObject = tr.objectStore("Ean");


    var request1 = newObject.openCursor();
    var output = '';

    request1.onsuccess = function (event) {
       
        console.log('request1.onsuccess');
        var cursor = event.target.result;
        //output = 'Código não encontrado';
        //var texto = document.getElementById('inp_codigo').value;
        if (cursor) {
            if (cursor.value.codigo == codigo) {
                output = cursor.value.modelo;
            }else{
                output = 'Código não existe';
            }
            cursor.continue();
        } else {
            console.log("Não existem mais registros");
        };
       result.innerHTML = output; 
    };
}
