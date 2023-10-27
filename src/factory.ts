import { Rekognition, Translate } from 'aws-sdk'
import { Handler } from './handler'

const reko = new Rekognition()
const translator = new Translate()

const handler = new Handler(reko, translator)

export default handler.main.bind(handler)
