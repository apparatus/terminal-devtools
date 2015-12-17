import React from 'React'
import {connect} from 'react-redux'
import {
  Console as ConsoleCmp
} from '../../components'

const Console = props => (<ConsoleCmp/>)

export default connect(scope => scope)(Console)