import { Rekognition, Translate, config } from 'aws-sdk'
import { Handler } from './handler'

if (process.env.NODE_ENV === 'test') {
  config.update({ region: 'us-east-1' });
}

const reko = new Rekognition()
const translator = new Translate()

const handler = new Handler(reko, translator)

export default handler.main.bind(handler)
