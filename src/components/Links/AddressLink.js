import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const AddressLinkContainer = styled(Link)`
  display: inline-block;
  align-items: center;
  text-overflow: ellipsis;
`

const AddressLink = ({ children, address, className }) => (
  <div className={className}>{children}</div>
)

export default AddressLink
