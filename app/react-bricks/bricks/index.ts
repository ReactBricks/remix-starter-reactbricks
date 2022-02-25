import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'

// Example brick
import HeroUnit from './HeroUnit'

const bricks: types.Brick<any>[] = [
  HeroUnit,
  ...website,
  // Put here your other bricks...
]

export default bricks
