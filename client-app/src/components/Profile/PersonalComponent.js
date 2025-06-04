import { useAuthContext } from "../../providers/AuthProvider"

export const PersonalComponent = () =>
{
    const {user} = useAuthContext()

    return(
        <div className="personal-content-block border-radius">
            <div className="avatar border-radius">
                <img src={`http://localhost:5004/api/image/${1}`} alt="аватар"/>
            </div>
            <div className="profile-background-cover border-radius">
                <img src={`http://localhost:5004/api/image/${1}`}/>
            </div>
        </div>
    )
}