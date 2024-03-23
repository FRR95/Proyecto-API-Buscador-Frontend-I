
import "./AppointmentCard.css";

export const AppointmentCard = ({ service_id, appointment_date }) => {

    return (
        <div className="appointmentCardDesign">
            <div>{service_id}</div>
            <div>{appointment_date}</div>
        </div>
    )
}