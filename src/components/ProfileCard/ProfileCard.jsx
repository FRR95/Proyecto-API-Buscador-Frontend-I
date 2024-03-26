
import "./ProfileCard.css";

export const ProfileCard = ({ user_id,first_name, last_name, email }) => {

    return (
        <div className="profileCardDesign">
            <div>{user_id}</div>
            <div>{first_name}</div>
            <div>{last_name}</div>
            <div>{email}</div>
        </div>
    )
}