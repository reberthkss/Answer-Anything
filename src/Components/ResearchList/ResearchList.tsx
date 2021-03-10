import {List} from "../List/List";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import "./ResearchList.css"
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {Research} from "../../utils/Data/ResearchData";
import Scrollbar from "react-scrollbars-custom";
import SharePopover from "../ShareIcon/SharePopover";
import Sidebar from "react-sidebar";
import {ActionsTypes} from "../../redux/ActionTypes";
import {displaySidebar, hideSidebar} from "../../redux/Actions";

export const ResearchList = () => {
    const { url } = useRouteMatch();
    const {sidebarIsVisible} = useSelector((state: ReduxState) => state);
    const dispatch = useDispatch();
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
        <div />
    )
}
