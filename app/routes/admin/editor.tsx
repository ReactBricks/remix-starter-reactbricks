import React from 'react'
import type { MetaFunction } from '@remix-run/node'
import { Admin, Editor } from 'react-bricks'

export const meta: MetaFunction = () => {
  return {
    title: 'React Bricks Editor',
  }
}

const AdminEditor: React.FC = () => {
  return (
    <Admin>
      <Editor />
    </Admin>
  )
}

export default AdminEditor
