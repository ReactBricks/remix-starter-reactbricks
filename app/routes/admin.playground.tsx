import React from 'react'
import type { MetaFunction } from '@remix-run/node'

import { Admin, Playground } from 'react-bricks'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'React Bricks Playground',
    },
  ]
}

const AdminPlayground: React.FC = () => {
  return (
    <Admin>
      <Playground />
    </Admin>
  )
}

export default AdminPlayground
