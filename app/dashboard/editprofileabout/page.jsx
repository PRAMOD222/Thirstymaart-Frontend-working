import React from 'react'
import withAuth from '../../auth';

const EditprofileAbout = () => {
  return (
    <div>
      Profile about page
    </div>
  )
}

export default withAuth(EditprofileAbout, ['vendor'])
