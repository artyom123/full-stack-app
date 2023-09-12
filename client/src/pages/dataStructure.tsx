import { Link } from 'react-router-dom'
import { PATH } from '../router/routerPath.constants'

const DataStructure: React.FC = () => {
    return (
        <section>
            <ul>
                <li><Link to={PATH.PAGE_DATA_STRUCTURE_QUEUE_STACK}>Queue and stack</Link></li>
                <li><Link to={PATH.PAGE_DATA_STRUCTURE_LIST}>List</Link></li>
            </ul>
        </section>
    )
}

export default DataStructure
