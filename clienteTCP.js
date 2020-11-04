const readline=require('readline');


var net = require('net');
var client = net.connect({port: 8080}, function() {
 //console.log('conectado al servidor!');
});

client.on('data', function(data){
    console.log(data.toString()); 
    if(data.toString()!=='BIENVENIDO'){
        const entrada=readline.createInterface({
            input:process.stdin,
            output: process.stdout
        });
        entrada.on('line',(mensaje)=>{
            client.write(mensaje);
            entrada.close();
        });  
        //client.end();
    }
    else{
        client.end();
    }
    
   /* client.on('data',function(data){
        console.log(data.toString());
        console.log('bandera');
        if(data.toString()!=='BIENVENIDO'){
            client.end();
            console.log('ENtro prro');
        }
        else{
            client.end();
        }
    });*/
});




client.on('end', function() {
 console.log('desconectado del servidor!');
});
