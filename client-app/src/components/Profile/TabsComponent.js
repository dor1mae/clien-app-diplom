export const TabsComponent = (props) =>
{
    return(
        <div className="title-block-item">
            {props.tabs.map((tab, index) => (
                <button 
                key={index}
                className="tab-button border-radius"
                onClick={() => {
                    props.setTabname(props.tabsname[index])
                    props.setTab(tab)
                    }}>
                    {props.tabsname[index]}
                </button>
            ))}
        </div>
    )
}