import {defineConfig} from 'sanity'
import {dev, prod} from './studios'

export default defineConfig([prod, dev])
