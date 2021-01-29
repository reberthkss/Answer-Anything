import {OverviewPaper} from "../Overview/OverviewPaper";
import {List} from "../List/List";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import "./ResearchList.css"
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {Research} from "../../utils/Data/ResearchData";
import Scrollbar from "react-scrollbars-custom";

export const ResearchList = () => {
    let { url } = useRouteMatch();
    const _renderItem = (item: {id: string, research: Research}) => {
        return Array.from({length: 30}).map(() => {
            return (
                <Link className={"linkContainer"} to={`${url}/research/${item.id}`}>
                    <div className={"rootContainerOfTheList"}>
                        <div className={"mainContainerOfTheItem"}>
                            <span className={"span_text_wrap"}>qewwwwwqwweeeeeeee</span>
                        </div>
                    </div>
                </Link>
            )
        })
    }
    const researchData = useSelector((state: ReduxState) => state.researchs);

    return (
        <div className={"mainGridContainer"}>
            <div className={"research_text_container"}>
                <span className={"research_text"}>
                    Pesquisas
                </span>
            </div>
            <Scrollbar>
                <List data={researchData} renderItem={_renderItem}/>
            </Scrollbar>
        </div>
    )
}
