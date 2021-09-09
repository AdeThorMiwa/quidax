import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const callService = async (
  service: { send: (c: string, payload: any) => any },
  command: string,
  payload: any,
) => {
  try {
    const response = await service.send(command, payload).toPromise();

    const statusCode = (response?.statusCode || 200).toString();
    console.log('m status', statusCode);

    if (statusCode.startsWith('4'))
      throw new BadRequestException(response, response?.message);

    if (statusCode.startsWith('5'))
      throw new InternalServerErrorException(response, response?.message);

    return response;
  } catch (e) {
    throw e;
  }
};
