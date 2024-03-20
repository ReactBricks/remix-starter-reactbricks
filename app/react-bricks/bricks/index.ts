import { types } from 'react-bricks/frontend'

// Example brick
import HeroUnit from './HeroUnit'
import layout from './layout'
import features from './features'

const bricks: types.Brick<any>[] = [
  // Put here your other bricks...
  HeroUnit,
  ...layout,
  ...features,
]

export default bricks
