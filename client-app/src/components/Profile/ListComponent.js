export const ListComponent = (props) =>
{
    return(
        <div className="vertical-list">
            <div className="sub-profile-header">Списки чтения</div>
            {props.titleslists.map((list, index) => (
                <button 
                className="button-list-elem border-radius"
                key={index}>
                    {list}
                </button>
            ))}
        </div>
    )
}