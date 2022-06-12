import { ThemeContext } from './App'
import React, {useContext} from 'react'
const Header = ({text}) => {
    const theme = useContext(ThemeContext)
    return <h1 style={ { color: theme.primary} }>{text}</h1>
}

export default Header