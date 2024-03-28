import "./ServicesCard.css";

export const ServicesCard = ({ service_name,service_id, description }) => {

    return (
        <div className="servicesCardDesign">
            <div>{service_id}</div>
            <div>{service_name}</div>
            <div>{description}</div>
        </div>
    )
}