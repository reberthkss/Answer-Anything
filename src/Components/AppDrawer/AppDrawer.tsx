import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ButtonBase,
    Drawer,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Typography
} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import React from "react";
import ListIcon from '@material-ui/icons/List';
import {ReduxState, ResearchProps} from "../../redux/reducer";
import {useSelector} from "react-redux";
import {UserSection} from "./UserSection/UserSection";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./AppDrawer.css"
import {useRouteMatch} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
interface AppDrawerOptions {
    icon: any,
    text: string,
    onClick: () => void,

}

interface AppDrawerProps {
    researchList: ResearchProps[],
    drawerStatus: boolean,
    handleCloseCallback: () => void
}

export const AppDrawer = ({researchList, drawerStatus, handleCloseCallback}: AppDrawerProps) => {
    const {url} = useRouteMatch();

    const authenticatedUser = useSelector((state: ReduxState) => state.user);

    const researchClickEvent = () => {

    }

    const exitClickEvent = () => {

    }

    const options: AppDrawerOptions[] = [
        {icon: (<ListIcon/>), text: "Pesquisas", onClick: researchClickEvent }
    ]

    return (
        <Drawer anchor={"left"}
                open={drawerStatus}
                className={"drawer-menu"}
                onClose={handleCloseCallback}
        >
            <UserSection name={authenticatedUser?.user.firstName!!}
                         avatar={authenticatedUser?.user.avatarUrl!!}
                         email={authenticatedUser?.user.email!!}
            />
            <div className={"app-drawer-list-container"}>
                <List component="nav" >
                    {options.map((option) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={(<ExpandMoreIcon />)}
                                >
                                    {option.icon}
                                    <Typography style={{marginLeft: "32px"}}>
                                        {option.text}
                                    </Typography>
                                </AccordionSummary>
                                {researchList.map((research) => (
                                    <div className={"research-list-item"}>
                                        <Link href={`${url}/research/${research.id}`} className={"app-drawer-link"}>
                                            {research.research.title}
                                        </Link>
                                    </div>
                                ))}
                            </Accordion>
                        )
                    })}
                </List>
                <ButtonBase className={"app-drawer-logout-container"} onClick={exitClickEvent}>
                    <ExitToAppIcon />
                    <span className={"app-drawer-span-text"}>Sair</span>
                </ButtonBase>
            </div>
        </Drawer>
    )
}
