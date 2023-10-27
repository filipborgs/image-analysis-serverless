export class Handler {
  constructor(
    private readonly reko: any,
    private readonly translator: any
  ) { }

  async main(event: any): Promise<any> {
    console.log('event', event);
    return {
      statusCode: 200,
      body: 'teste'
    }
  }
}