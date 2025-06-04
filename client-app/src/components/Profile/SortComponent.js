export const SortComponent = (props) =>
{
    if(props.sortTypes || props.sortOrders)
    {
        return(
            <div>Загрузка</div>
        )
    }
    return(
        <div>
            <div className="sub-profile-header">Сортировка</div>
            <div className="vertical-list">
                {props.sortTypes.map((type, index) => (
                    <button 
                    key={index}
                    onClick={() => {props.setSortType(type)}}
                    className="button-list-elem border-radius">
                        {type}
                    </button>
                ))}
            </div>
            <div className="vertical-list">
                {props.sortOrders.map((type, index) => (
                    <button 
                    key={index}
                    onClick={() => {props.setOrder(type)}}
                    className="button-list-elem border-radius">
                        {type}
                    </button>
                ))}
            </div>
        </div>
    )
}