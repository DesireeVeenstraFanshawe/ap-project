import { Link } from "react-router";
import HeaderNav from "../HeaderNav/headerNav";
import "./header.css"


export default function Header (props) {

    return (
        <header id="page-header">
            <Link to="/" >LOGO</Link>
            <input type="text" placeholder="Search for events"></input>
            <section id="header-auth">
                <Link to="/sign-up-in">Sign-up</Link>
                <Link to="/sign-up-in">Login</Link>
                <Link to="/owner-page">Register your business</Link>
            </section>
            <HeaderNav/>
        </header>
    )
}