import { badRequest, ok } from './utils';

export class Handler {
  constructor(
    private readonly reko: any,
    private readonly translator: any
  ) { }

  async main(event: any): Promise<any> {
    console.log('event', event);

    const { imageUrl } = event.queryStringParameters
    if (!imageUrl) return badRequest('An IMG is required!')

    return ok('IMG')
  }
}