import {OverviewPaper} from "../Overview/OverviewPaper";
import {List} from "../List/List";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import "./ResearchList.css"
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {Research} from "../../utils/Data/ResearchData";

export const ResearchList = () => {
    let { url } = useRouteMatch();
    const _renderItem = (item: {id: string, research: Research}) => {
        return (
            <Link className={"linkContainer"} to={`${url}/research/${item.id}`}>
                <div className={"rootContainerOfTheList"}>
                    <div className={"mainContainerOfTheItem"}>
                        {item.research.title}
                    </div>
                </div>
            </Link>
        )
    }
    const researchData = useSelector((state: ReduxState) => state.researchs);

    return (
        <div className={"mainGridContainer"}>
            <OverviewPaper>
                <List data={researchData} renderItem={_renderItem}/>
            </OverviewPaper>
        </div>
    )
}
