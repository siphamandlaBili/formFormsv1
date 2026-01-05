import React from 'react'
import PropTypes from 'prop-types'

function XIcon({ className = "w-5 h-5", ...props }) {
  const titleId = "x-icon-title"

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-labelledby={titleId}
      {...props}
    >
      <title id={titleId}>X</title>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  )
}

XIcon.propTypes = {
  className: PropTypes.string,
}

export default XIcon
