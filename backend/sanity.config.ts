import {createConfig} from 'sanity'
import {dev, prod} from './studios'

export default createConfig([prod, dev])
