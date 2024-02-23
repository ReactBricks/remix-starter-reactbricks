import React from 'react'
import type { MetaFunction } from '@remix-run/node'

import { Admin, MediaLibrary } from 'react-bricks'

export const meta: MetaFunction = () => {
  return [
    {
      title: 'React Bricks Media Library',
    },
  ]
}

const AdminMediaLibrary: React.FC = () => {
  return (
    <Admin>
      <MediaLibrary />
    </Admin>
  )
}

export default AdminMediaLibrary
