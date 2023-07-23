import { Link } from 'react-router-dom'

const Examples: React.FC = () => {
    return (
        <section>
            <ul>
                <li><Link to="timer">Timer</Link></li>
                <li><Link to="life-cycle-hook">Timer</Link></li>
            </ul>
        </section>
    )
}

export default Examples
