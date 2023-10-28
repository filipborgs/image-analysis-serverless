import { main } from '@/index'
import { makeRequestMock } from '@/test/mocks/request'
import { badRequest } from '@/utils'


describe('Image analyse tests suite', () => {

  test('It should analyse successfuly the image return the results', async () => {
    const result = await main(makeRequestMock())
    expect(result).toEqual({})
  })

  test('Given and empty queryString it should return status code 400', async () => {
    const request = makeRequestMock()
    // @ts-expect-error
    delete request.queryStringParameters.imageUrl
    const result = await main(request)
    expect(result).toEqual(badRequest('An IMG is required!'))
  })
})