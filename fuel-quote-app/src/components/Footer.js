import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            <Link to='/history'>History</Link>
            <p></p>
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer
