import { Link } from 'react-router-dom'
import { PATH } from '../router/routerPath.constants'

const Games: React.FC = () => {
    return (
        <section>
            <ul>
                <li><Link to={PATH.PAGE_GAMES_MEMORY}>Memory</Link></li>
            </ul>
        </section>
    )
}

export default Games
