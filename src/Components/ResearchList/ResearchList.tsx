import {OverviewPaper} from "../Overview/OverviewPaper";
import {List} from "../List/List";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import "./ResearchList.css"
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {Research} from "../../utils/Data/ResearchData";
import Scrollbar from "react-scrollbars-custom";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Clipboard from 'react-clipboard.js';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {IconButton, Tooltip} from "@material-ui/core";
import {ShareManager} from "../../utils/Services/ShareManager/ShareManager";
import SharePopover from "../ShareIcon/SharePopover";
export const ResearchList = () => {
    let { url } = useRouteMatch();
    const _renderItem = (item: {id: string, research: Research}) => {
        return (
           <div className={"research-item-container"}>
               <Link className={"linkContainer"} to={`${url}/research/${item.id}`}>
                   <div className={"rootContainerOfTheList"}>
                       <div className={"mainContainerOfTheItem"}>
                           <span className={"span_text_wrap"}> {item.research.title}</span>
                       </div>
                   </div>
               </Link>
               <div className={"icon-container"}>
                   <SharePopover researchId={item.id}/>
               </div>
           </div>
        )
    }
    const researchData = useSelector((state: ReduxState) => state.researchs);


    return (
        <div className={"mainGridContainer"}>
            <div className={"research_text_container"}>
                <span className={"research_text"}>
                    Pesquisas
                </span>
            </div>
            <div className={"scrollbar-container"}>
                <Scrollbar className={"scrollbar-component"}>
                    <List data={researchData} renderItem={_renderItem}/>
                </Scrollbar>
            </div>
        </div>
    )
}
