import { useEffect, useState } from "react"
import { TitleCard } from "../sub-components/TitleCard/TitleCard"

export const TitlesComponent = (props) =>
{
    return(
        <div>
            {props.titles.map((title, index) => (
                <TitleCard title={title} key={index}/>
            ))}
        </div>
    )
}