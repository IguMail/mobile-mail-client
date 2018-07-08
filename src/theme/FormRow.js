import React from 'react'
import { Row } from './'
import styles from './styles'

export default props => (
  <Row style={[props.style, styles.formRow]}>{props.children}</Row>
)
