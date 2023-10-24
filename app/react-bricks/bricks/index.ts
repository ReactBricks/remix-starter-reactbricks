import { types } from 'react-bricks/frontend'

// Example brick
import HeroUnit from './HeroUnit'
import layout from './layout'
import features from './features'
import Pokemon from './Pokemon'

const bricks: types.Brick<any>[] = [
  // Put here your other bricks...
  HeroUnit,
  Pokemon,
  ...layout,
  ...features,
]

export default bricks
