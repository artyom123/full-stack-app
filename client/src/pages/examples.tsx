import { Link } from 'react-router-dom'
import { PATH } from '../router/routerPath.constants'

const Examples: React.FC = () => {
    return (
        <section>
            <ul>
                <li><Link to={PATH.PAGE_EXAMPLES_TIMER}>Timer</Link></li>
                <li><Link to={PATH.PAGE_EXAMPLES_LIFE_CYCLE_FC}>LifeCycle Functional Component</Link></li>
                <li><Link to={PATH.PAGE_EXAMPLES_LIFE_CYCLE_CC}>LifeCycle Class Component</Link></li>
                <li><Link to={PATH.PAGE_EXAMPLES_EVENTS}>Events</Link></li>
                <li><Link to={PATH.PAGE_EXAMPLES_PORTAL}>Portal</Link></li>

                <li><Link to={PATH.PAGE_EXAMPLES_DUMP}>Dump</Link></li>
                <li><Link to={PATH.PAGE_EXAMPLES_DUMP_2}>Dump_2(jsonplaceholder)</Link></li>
            </ul>
        </section>
    )
}

export default Examples
