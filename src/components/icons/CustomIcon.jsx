import React from 'react'
import PropTypes from 'prop-types'

function CustomIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.434-2.193 4.731-1.297 1.297-2.873 2.024-4.731 2.193-.677-.677-.677-1.794 0-2.47 1.297-.169 2.454-.642 3.462-1.65 1.008-1.008 1.481-2.165 1.65-3.462.677.677.677 1.793 0 2.47-.169-1.858-.896-3.434-2.193-4.731-1.297-1.297-2.873-2.024-4.731-2.193.677.677.677 1.794 0 2.47z"/>
    </svg>
  )
}

CustomIcon.propTypes = {
  className: PropTypes.string,
}

export default CustomIcon
