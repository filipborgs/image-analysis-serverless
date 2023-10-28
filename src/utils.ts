export interface HttpResponse {
  statusCode: number
  headers?: any
  body?: any
}

export interface HttpRequest {
  headers?: any
  query?: any
  body?: any
  params?: any
}

export enum HttpMethods {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT'
}

export const ok = (body: any, headers?: object): HttpResponse => ({
  statusCode: 200,
  headers,
  body
})

export const created = (body: any, headers?: object): HttpResponse => ({
  statusCode: 201,
  headers,
  body
})

export const noContent = (headers?: object): HttpResponse => ({
  statusCode: 204,
  headers
})

export const badRequest = (body: any, headers?: object): HttpResponse => ({
  statusCode: 400,
  headers,
  body
})

export const serverError = (_error: any, headers?: object): HttpResponse => {
  return {
    statusCode: 500,
    headers,
    body: 'ERRO_INTERNO'
  }
}
