import React from 'react'
import withAuth from '../../auth';

const EditprofileProduct = () => {
  return (
    <div>
      Profile Product Page
    </div>
  )
}

export default withAuth(EditprofileProduct, ['vendor'])
