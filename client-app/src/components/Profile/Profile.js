import {React, useState, useEffect} from "react"
import './Profile.css'
import '../Main.css'
import Header from "../Header/Header"
import { SortComponent } from "./SortComponent"
import { ListComponent } from "./ListComponent"
import { TabsComponent } from "./TabsComponent"
import { HistoryComponent } from "./HistoryComponent"
import { CommentsComponent } from "./CommentsComponent"
import { OverviewsComponent } from "./OverviewsComponent"
import { TitlesComponent } from "./TitlesComponent"
import { SearchComponent } from "./SearchComponent"
import { PersonalComponent } from "./PersonalComponent"
import { useAuthContext } from "../../providers/AuthProvider"


export const Profile = () => {
    const {user} = useAuthContext()

    const [titles, setTitles] = useState([])
    
    const tabs = [TitlesComponent, CommentsComponent, HistoryComponent, OverviewsComponent]
    const tabsname = ['Списки для чтения', 'Комментарии', 'История просмотров', "Отзывы"]
    const titleslists = ['Все', 'Читаю', 'Брошено', "Прочитано", "Любимое"]
    const sortTypes = ['По названию', "По просмотрам", "По оценкам", 'По статусу']
    const sortOrders = ['По возрастанию', "По убыванию"]
    
    const [tabname, setTabname] = useState('Списки для чтения')
    const [list, setList] = useState("Все")
    const [search, setSearch] = useState('')
    const [sorttype, setSortType] = useState('По названию')
    const [order, setOrder] = useState('По убыванию')


    useEffect(() =>
    {
        const getTitles = async () =>
        {
            await fetch(`http://localhost:5004/api/titles`)
            .then(response => response.json())
            .then(data => setTitles(data))
        }

        getTitles()
    }, [])

    const [tab, setTab] = useState(<TitlesComponent titles={titles}/>)

    console.log(tab)

    return(
        <div className="vertical-column-container">
            <Header/>
            <div className="center-setter column-flex content-gapper">
                <PersonalComponent/>
                <div className="content-gapper row-flex">
                    <div className="title-block border-radius">
                        <div className="title-block-item">
                            <div className="main-profile-header">имя профиля</div>
                            <button className="settings-button border-radius">Настройки</button>
                        </div>
                        <TabsComponent tabs={tabs} setTab={setTab}
                        setTabname={setTabname} tabsname={tabsname}/>
                        {tabname === 'Списки для чтения' && (
                            <SearchComponent search={search} setSearch={setSearch}/>
                        )}
                        {tab}
                    </div>
                    <div className="settings-block border-radius">
                        <ListComponent titleslists={titleslists} setList={setList}/>
                        <SortComponent sortTypes={sortTypes} sortOrders={sortOrders}
                                        setOrder={setOrder} setSortType={setSortType}/>
                    </div>
                </div>
            </div>
        </div>
    )
}