
import { Link } from "react-router"
import "./headerNav.css"

export default function HeaderNav (props) {

    return (
        <section id="header-nav">
            <p className="p-title selected"><Link to="/city-select">Bars</Link></p>
            <p className="p-title">Clubs</p>
            <p className="p-title">Karaoke</p>
        </section>
    )
}