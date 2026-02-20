import Header from "../Header/Header";
import "./signUpIn.css"




export default function SignUpIn (props) {

    return (
        <>
            <Header/>
            <section id="authSection">
                <h1>Login or Sign Up</h1>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
                <button>Continue</button>
                <hr></hr>
                <section id="preAuthSection">
                    <a href="*">Google</a>
                    <a href="*">Apple</a>
                </section>

            </section>
        </>
    )
}