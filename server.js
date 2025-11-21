const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Ruta al archivo .proto
const PROTO_PATH = path.join(__dirname, 'protos', 'hello.proto');

// Cargamos el .proto y lo convertimos en un objeto JS utilizable
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Implementación del método definido en el .proto
function sayHello(call, callback) {
  const name = call.request.name;
  callback(null, { message: `Hola, ${name}!` });
}

// Configuración del servidor
function main() {
  const server = new grpc.Server();
  server.addService(helloProto.Greeter.service, { SayHello: sayHello });

  const address = '127.0.0.1:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Servidor gRPC escuchando en ${address}`);
    server.start();
  });
}

main();
