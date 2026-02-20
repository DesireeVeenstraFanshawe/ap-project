
import "./citySelect.css"

import Header from "../Header/Header"

export default function CitySelect (props) {

    return (
        <>
            <Header/>
            <section id="selectSection">
                <h1>Enter your city</h1>
                <input type="text" placeholder="City"/>
                <button>Continue</button>
            </section>
        </>
    )
}