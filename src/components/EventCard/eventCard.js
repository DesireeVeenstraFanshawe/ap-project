
import "./eventCard.css"

export default function EventCard (props) {

    return (
        <section className="eventCard">
            <p className="eventName">Taco Tuesday</p>
            <p className="startDate">Starts...</p>
            <p className="endDate">Ends...</p>
            <p className="location">Location...</p>
            <p className="frequency">Every Tuesday</p>
        </section>
    )
}