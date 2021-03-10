import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {AppBar, Toolbar, Typography, Popover, IconButton, Button, InputBase, Drawer} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import React, {useState} from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./AppToolbar.css"
import {GoogleAuth} from "../../utils/Services/GoogleAuth";
import {useTranslation} from "react-i18next";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import MenuIcon from '@material-ui/icons/Menu';
import firebase from "firebase";
import TextInputWithIconMdLgXl from "../TextInputWithIcon-md-lg-xl/TextInputWithIcon-md-lg-xl";
import {Search} from "@material-ui/icons";
import TextInputWithIconXsSm from "../TextInputWithIcon-xs-sm/TextInputWithIcon-xs-sm";
import {AppDrawer} from "../AppDrawer/AppDrawer";

const AppPopOver = ({id, open, anchorElement, handleClose, children}: {id: string | undefined, open: boolean, anchorElement: any, handleClose: () => void, children: any}) => {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorElement}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </Popover>
    )
}

export const AppToolbar = () => {
    const googleAuth = new GoogleAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerIsOpen, setDrawerStatus] = useState<boolean>(false);
    const researchList = useSelector((state: ReduxState) => state.researchs);
    const {t} = useTranslation();
    const history = useHistory();
    const authenticatedUser = useSelector((state:ReduxState) => state.user);
    const userData = {
        name: authenticatedUser?.user.firstName || "Anonymous",
        avatarUrl: authenticatedUser?.user.avatarUrl || ""
    }
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = anchorEl != null;
    let {url} = useRouteMatch();

    const registerNewResearchOnClick = async () => {
        const newId = firebase.firestore().collection(FirestoreManager.COLLECTIONS.RESEARCH).doc().id;
        history.replace(`${url}/register-research/${newId}`);
    }

    const _renderRegisterNewResearch = () => {
        return (
            <div className={"toolbar-link"}>
                <a onClick={registerNewResearchOnClick}>
                    <div className={"registerNewResearchText"} >
                      <span className={"register-new-research-span"}>
                          {t("register_new_research")}
                      </span>
                    </div>
                </a>
            </div>
        );
    }

    const renderToolbar = () => {
        return (
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} >
                    <AppBar position="static">
                        <Toolbar>
                            <Grid container xs={12} sm={12} md={12} lg={12} xl={12}  >
                                <Grid container item xs={6} sm={6} md={6} lg={6} xl={6} direction={"row"} alignItems={"center"}  className={"app-toolbar-options-container"}>
                                    <Grid container item xs={2} sm={2} md={2} lg={2} xl={2} direction={"row"}  alignItems={"center"} >
                                        <div className={"toolbar-menu-icon"}>
                                            <IconButton edge="start"  color="inherit" aria-label="menu"
                                                        onClick={() => setDrawerStatus(!drawerIsOpen)}>
                                                <MenuIcon />
                                            </IconButton>
                                        </div>
                                        <Link to={"/"} className={"toolbar-link-to-home"}>
                                            Home
                                        </Link>
                                    </Grid>
                                    <Grid container item xs={10} sm={10} md={10} lg={10} xl={10} direction={"row"} justify={"flex-start"}>
                                        <TextInputWithIconMdLgXl
                                            type={"search"}
                                            icon={() => (<Search/>)}
                                            placeholder={"Pesquisar..."}
                                            onChange={() => null}  /* TODO */
                                        />
                                        <TextInputWithIconXsSm
                                            type={"search"}
                                            icon={() => (<Search />)}
                                            placeholder={"Pesquisar..."}
                                            onChange={() => null} /* TODO */
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item  xs={6} sm={6} md={6} lg={6} xl={6} direction={"row"}  alignItems={"center"} spacing={1}>
                                    <Grid item xs={12} sm={12} md={11} lg={11} xl={11} className={"register-research-div"}>
                                        {_renderRegisterNewResearch()}
                                    </Grid>
                                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} className={"toolbar-avatar-container"} >
                                        <div onClick={handleClick}>
                                            <Avatar alt={`${userData.name}`} src={userData.avatarUrl}/>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        )
    }

    const renderPopOver = () => {
        return (
            <AppPopOver anchorElement={anchorEl} handleClose={handleClose} id={"simple-popover"} open={open}>
                <div className={"popOver"}>
                    <div className={"signOut"} onClick={() => googleAuth.doLogout()}>
                        <ExitToAppIcon/>
                        <Typography>
                            {t("sign_out")}
                        </Typography>
                    </div>
                </div>
            </AppPopOver>
        )
    }
    return (
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
            {renderToolbar()}
            {renderPopOver()}
            <AppDrawer
                researchList={researchList}
                drawerStatus={drawerIsOpen}
                handleCloseCallback={() => setDrawerStatus(false)}
            />
        </Grid>
    )
}
