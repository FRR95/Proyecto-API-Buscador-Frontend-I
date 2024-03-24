import "./ServicesCard.css";

export const ServicesCard = ({ service_name, description }) => {

    return (
        <div className="servicesCardDesign">
            <div>{service_name}</div>
            <div>{description}</div>
        </div>
    )
}