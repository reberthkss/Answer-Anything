import {
    Accordion,
    AccordionSummary,
    ButtonBase,
    Drawer,
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import React from "react";
import ListIcon from '@material-ui/icons/List';
import {ReduxState, ResearchProps} from "../../redux/reducer";
import {useDispatch, useSelector} from "react-redux";
import {UserSection} from "./UserSection/UserSection";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./AppDrawer.css"
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {clearAuthenticatedUser} from "../../redux/Actions";
import {useTranslation} from "react-i18next";
interface AppDrawerOptions {
    icon: any,
    text: string,
}

interface AppDrawerProps {
    researchList: ResearchProps[],
    drawerStatus: boolean,
    handleCloseCallback: () => void
}

export const AppDrawer = ({researchList, drawerStatus, handleCloseCallback}: AppDrawerProps) => {
    const {url} = useRouteMatch();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const authenticatedUser = useSelector((state: ReduxState) => state.user);


    const exitClickEvent = () => {
        dispatch(clearAuthenticatedUser());
        history.replace("/")
    }

    const options: AppDrawerOptions[] = [
        {icon: (<ListIcon/>), text: t("researchs")}
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
                    <ListItem>
                        <a className={"app-drawer-link"} onClick={() => history.replace("/")} >
                            <Typography>
                                Home
                            </Typography>
                        </a>
                    </ListItem>
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
                                        <Link to={`${url}/research/${research.researchId}`} className={"app-drawer-link"} onClick={handleCloseCallback}>
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
                    <span className={"app-drawer-span-text"}>{t("sign_out")}</span>
                </ButtonBase>
            </div>
        </Drawer>
    )
}
