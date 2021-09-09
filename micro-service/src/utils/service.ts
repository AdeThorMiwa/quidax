import { ClientOptions, Transport } from '@nestjs/microservices';
import { Services } from '@enum/services';

export const getServiceFactoryOptions = (service: Services): ClientOptions => {
  return {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: getServicePort(service),
    },
  } as any;
};

const getServicePort = (service: Services) => {
  // TODO: change base
  let base = 8870;

  switch (service) {
    case Services.USER:
      base += 5;
      break;
    case Services.BOOK:
      base += 5;
      break;
    case Services.PUBLICATION:
      base += 5;
      break;
    case Services.CART:
      base += 5;
      break;
    default:
      base += 5;
  }

  return base;
};
