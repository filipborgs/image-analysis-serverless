import { badRequest, ok, serverError } from './utils';
import axios from 'axios'

export class Handler {
  constructor(
    private readonly reko: any,
    private readonly translator: any
  ) { }

  async main(event: any): Promise<any> {
    console.log('event', event);

    try {
      // event.queryStringParameters = {
      //   imageUrl: 'https://www.petz.com.br/blog/wp-content/uploads/2019/05/cachorro-independente-1-1280x720.jpg'
      // }
      const { imageUrl } = event.queryStringParameters
      if (!imageUrl) return badRequest('An IMG is required!')

      const buffer = await this.getImageBuffer(imageUrl)

      const { names, workingItems } = await this.detectImageLabels(buffer)
      const texts = await this.translateText(names)

      const finalText = this.formatTextResults(texts, workingItems)
      return ok(finalText)
    } catch (e) {
      return serverError(e)
    }
  }

  async detectImageLabels(buffer: Buffer) {
    const result = await this.reko.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise()

    const workingItems = result.Labels.filter(({ Confidence }) => Confidence > 80)
    const names = workingItems.map(({ Name }) => Name).join(' and ')

    return {
      names,
      workingItems
    }
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text
    }

    const { TranslatedText } = await this.translator.translateText(params).promise()
    return TranslatedText.split(' e ')
  }

  formatTextResults(texts, workingItems) {
    const finalText = []
    for (const index in texts) {
      const namePortuguese = texts[index]
      const confidence = workingItems[index].Confidence
      console.log(confidence)
      finalText.push(`${confidence.toFixed(3)}% de ser do tipo ${namePortuguese}`)
    }

    return finalText.join(' ')
  }

  async getImageBuffer(url: string) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const buffer = Buffer.from(response.data, 'base64')
    return buffer
  }
}