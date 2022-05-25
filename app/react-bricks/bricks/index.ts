import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import blog from 'react-bricks-ui/blog'

// Example brick
import HeroUnit from './HeroUnit'

const bricks: types.Brick<any>[] = [
  ...website,
  ...blog,
  // Put here your other bricks...
  HeroUnit,
]

export default bricks
