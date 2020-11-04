var consulta;
var net = require('net');
var server = net.createServer(function(connection) {

 connection.write('Ingrese usuario y contraseña (user/pass):');
 connection.on('data',function(data){
    consulta=data.toString().split('/');
    if (consulta.length===2){
        var mysql = require('mysql');
        var dbconnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'usuarios273',
        port: 3306
        });
        dbconnection.connect(function(error){
        if(error){
            throw error;
        }else{
            //console.log('Conexion correcta.');
        }
        });
        var query = dbconnection.query('SELECT usuario,contrasena FROM usuarios WHERE usuario = ?', [consulta[0]], function(error, result){
            if(error){
                throw error;
            }else{
                var resultado = result;
                if(resultado.length > 0){
                    if(resultado[0].contrasena === consulta[1]){
                        //console.log(resultado[0].usuario + ' ' + resultado[0].contrasena);
                        connection.write('BIENVENIDO');
                        console.log('Cliente conectado '+data.toString());
                    }
                    else{
                        let msg = 'La contraseña para '+consulta[0]+' es incorrecta!!!'+'\nIngrese usuario y contraseña (user/pass)';
                        //connection.write('La contraseña para '+consulta[0]+' es incorrecta!!!');
                        //connection.write('Ingrese usuario y contraseña (user/pass)');
                        connection.write(msg);
                    }
                }
                else{
                    //console.log('Registro no encontrado');
                    let msg = 'El usuario '+consulta[0]+' es incorrecto o no existe!'+'\nIngrese usuario y contraseña (user/pass)';
                    //connection.write('El usuario '+consulta[0]+' es incorrecto o no existe!');
                    connection.write(msg);
                    //connection.write('Ingrese usuario y contraseña (user/pass)');
                }
            }
        }
        );
        dbconnection.end();
    }
    
 });

 connection.on('end', function() {
 console.log('cliente desconectado');
 });

});
server.listen(8080, function() {
 console.log('Servidor corriendo en el puerto 8080');
});