const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Ruta al archivo .proto
const PROTO_PATH = path.join(__dirname, 'protos', 'hello.proto');

// Cargamos el .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Creamos el cliente
const client = new helloProto.Greeter(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Enviamos una solicitud al servidor
client.SayHello({ name: 'Billy' }, (error, response) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Respuesta del servidor:', response.message);
});
