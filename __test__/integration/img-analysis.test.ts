import aws from 'aws-sdk'
import { makeRequestMock } from '@/test/mocks/request'
import { badRequest, ok, serverError } from '@/utils'
import { main } from '@/index'

describe('Image analyse tests suite', () => {

  test('It should analyse successfuly the image return the results', async () => {
    const result = await main(makeRequestMock())
    expect(result).toEqual(ok('99.998% de ser do tipo Animal 99.998% de ser do tipo canino 99.998% de ser do tipo cão 99.998% de ser do tipo golden retriever 99.998% de ser do tipo mamífero 99.998% de ser do tipo animal de estimação'))
  })

  test('Given and empty queryString it should return status code 400', async () => {
    const request = makeRequestMock()
    delete request.queryStringParameters.imageUrl
    const result = await main(request)
    expect(result).toEqual(badRequest('An IMG is required!'))
  })

  test('Should return 500 if an unexpected error occurs', async () => {
    const result = await main(null)
    expect(result).toEqual(serverError(null))
  })
})