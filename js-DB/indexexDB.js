




// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var db, request;
var salvar = document.getElementById('btnSalvar');

if (!window.indexedDB) {
    window.alert("seu navegador não suporta uma versão estável do IndexedDB. Algumas funções não estão disponíveis");
}

request = indexedDB.open('Mydatabase', 6);

request.onupgradeneeded = function (event) {
    console.log("Atualizando...");
    db = event.target.result;
    var objectStore = db.createObjectStore("Ean", {
        keyPath: "ID",
        autoIncrement: true
    });
    objectStore.createIndex("codigo", "codigo", { unique: false });
    objectStore.createIndex("modelo", "modelo", { unique: false });
    
    
    
    //Evento chamado quando a criação da objectStore é bem sucedida!
    objectStore.transaction.oncomplete = function (event) {
        console.log('ObjetoStore criado com sucesso');
    }
};

request.onerror = function (event) {
    console.log('Erro ao abrir o Banco de Dados.');
}
request.onsuccess = function (event) {
    console.log('Banco de Dados criado com sucesso ');
    db = event.target.result;
    listaTdos();
};


function insere(ean, modelo){
    var tr = db.transaction(["Ean"], "readwrite");
    
    
    var newObject = tr.objectStore("Ean");
    var req = newObject.add({
            codigo: ean,
            modelo: modelo
        });
    // Quando a transação é executada com sucesso
    req.onsuccess = function(e){
        
         console.log('Registro efetuado com sucesso'); 
         //exibeModal();     
       
    };
    req.onerror = function(e){
        console.log('Falha!');
    };
};
   
salvar.addEventListener('click', function(){
    var eanCode = document.getElementById('eanCode').value;
    var modelo = form1.modelo.value;
    modelo = modelo.toUpperCase();
    
    if(eanCode ==""){
        alert("Preencha o campo Código");
        return false;
    }
    if(modelo == ""){
        alert("Preencha o campo Modelo");
        return false;
    }
    insere(eanCode, modelo);
  
});
function exibeTdos(){
    var tr = db.transaction("Ean", "readonly");
    var newObject = tr.objectStore("Ean");
    var request1 = newObject.openCursor();
    request1.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log('Código: '+cursor.value.codigo + ' Modelo: ' + cursor.value.modelo);
            cursor.continue();
        }else{
            console.log("Não existem registros");
        };
    };
};
function exibeModal(){
    $('#exampleModal').modal('show');
};
function listaTdos(){
    var tr = db.transaction("Ean", "readonly");
    var newObject = tr.objectStore("Ean");
    var output = '';
    
    var request1 = newObject.openCursor();
    
    request1.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            output += "<tr>";
            output += "<td>"+cursor.value.ID +"</td>";
            output += "<td>"+cursor.value.codigo +"</td>";
            output += "<td>"+cursor.value.modelo +"</td>";
            output += "</tr>";
            cursor.continue();
        }else{
            console.log("Não existem registros");
        };
        document.getElementById('tbody').innerHTML = output;
    };
};
