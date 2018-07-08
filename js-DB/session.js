var btSalvar = document.getElementById('salvar');


btSalvar.onclick = function(){
    var texto =  document.getElementById('material').value;
    sessionStorage.setItem('mat', texto);
    //var texto = sessionStorage.getItem('material');
    console.log(sessionStorage.getItem('mat'));
};