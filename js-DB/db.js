var eanDB = (function () {
    var eDB = {};
    var datastore = null;
    var modelo;
    /**
     * Open a connection to the datastore.
     */
    eDB.open = function (callback) {
        // Database version.
        var version = 1;
        // Open a connection to the datastore.
        var request = indexedDB.open('eanDB', version);
       
        // Handle datastore upgrades.
        request.onupgradeneeded = function (e) {
            var db = e.target.result;

            e.target.transaction.onerror = eDB.onerror;

            // Delete the old datastore.
            if (db.objectStoreNames.contains('ean')) {
                db.deleteObjectStore('ean');
            }

            // Create a new datastore.
            var store = db.createObjectStore('ean', {
                keyPath: "ID",
                autoIncrement: true
            });
            store.createIndex("codigo", "codigo", {
                unique: false
            });
            store.createIndex("modelo", "modelo", {
                unique: false
            });
        };

        // Handle successful datastore access.
        request.onsuccess = function (e) {
            // Get a reference to the DB.
            datastore = e.target.result;
            // Execute the callback.
            callback();
        };

        // Handle errors when opening the datastore.
        request.onerror = eDB.onerror;
    };
    /**
     * Fetch all of the todo items in the datastore.
     */
    eDB.fetchTodos = function (callback) {
        var db = datastore;
        var transaction = db.transaction(['ean'], 'readwrite');
        var objStore = transaction.objectStore('ean');
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = objStore.openCursor(keyRange);

        var codigos = [];

        transaction.oncomplete = function (e) {
            // Execute the callback function.
            callback(codigos);
        };

        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;

            if (!!result == false) {
                return;
            }

            codigos.push(result.value);
            console.log(result.value.codigo + ' ' + result.value.modelo);
            result.continue();
        };

        cursorRequest.onerror = eDB.onerror;
    };
    /**
     * Create a new todo item.
     */
    eDB.createEan = function (codigo, modelo, callback) {
        console.log('createEan');
        // Get a reference to the db.
        var db = datastore;

        // Initiate a new transaction.
        var transaction = db.transaction(['ean'], 'readwrite');

        // Get the datastore.
        var objStore = transaction.objectStore('ean');


        //Create an object for the todo item.
        var todo = {
            'codigo': codigo,
            'modelo': modelo
        };

        //  Create the datastore request.
        //var request = objStore.put(todo);


        //Another way to create an object for the todo item.
        var request = objStore.add(todo);

        // Handle a successful datastore put.
        request.onsuccess = function (e) {
            // Execute the callback function.
            callback(todo);
        };

        // Handle errors.
        request.onerror = eDB.onerror;
    };
    eDB.getCodigo = function (codigo, callback) {
        var db = datastore;
        var transaction = db.transaction(['ean'], 'readonly');
        var objStore = transaction.objectStore('ean');
        
        //var indexCodigo = objStore.index('modelo');
        //var request = indexCodigo.get('Sabão');
        var request = objStore.openCursor();
        transaction.oncomplete = function (e) {
            // Execute the callback function.
            alert('Modelo getCodigo: ' + modelo);
            callback(modelo);
        };
        
        var index = objStore.index('codigo');        
        index.get(codigo).onsuccess = function(event) {
                //alert("O SSN de John é " + event.target.result.modelo);
            modelo = event.target.result.modelo;
            //alert('modelo :'+event.target.result.modelo);
        };
        
        /*request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                alert('on ' + cursor.value.codigo);
                if (cursor.value.codigo == codigo) {
                    modelo = cursor.value.modelo;
                } else {
                    modelo = 'Código não existe';
                }
                cursor.continue();
            };
            //callback(modelo);
        };*/
        request.onerror = function (e) {
            modelo = 'Código não encontrado';
        };
    };
    eDB.getModelo = function(callback){
        
        alert('modelo: ' + modelo);
        callback(modelo);        
    };
    
    return eDB;
}());
