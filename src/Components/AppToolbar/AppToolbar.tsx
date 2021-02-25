import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReduxState} from "../../redux/reducer";
import {AppBar, Toolbar, Typography, Popover} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, {useState} from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import "./AppToolbar.css"
import {GoogleAuth} from "../../utils/Services/GoogleAuth";
import {useTranslation} from "react-i18next";
import {FirestoreManager} from "../../utils/Services/FirebaseManager/FirestoreManager";
import firebase from "firebase";

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
    const {t} = useTranslation();
    const history = useHistory();
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = anchorEl != null;
    let {url} = useRouteMatch();
    const user = useSelector((state: ReduxState) => state.user);
    const _renderUserInfo = () => {
        return (
            <div className={"userInfo"}>
                <Grid className={"userInfoGridContainer"} container>
                    <Grid className={"userInfoGridItem"} item onClick={handleClick}>
                        <Paper className={"userInfoPaperContainer"}>
                            <div className={"userAvatar"}>
                                <Avatar src={user?.user.avatarUrl || ""}/>
                            </div>
                            <div className={"userName"}>
                                {user?.user.firstName}
                            </div>
                            <div className={"arrowBot"}>
                                <ArrowDropDownIcon/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    const _renderRegisterNewResearch = () => {
        return (
          <div className={"registerNewResearchDiv"}>
              <a className={"link"}  onClick={async () => {
                  const newId = firebase.firestore().collection(FirestoreManager.COLLECTIONS.RESEARCH).doc().id;
                  history.replace(`${url}/register-research/${newId}`);
              }}>
                  <div className={"registerNewResearchText"} >
                      {t("register_new_research")}
                  </div>
              </a>
          </div>
        );
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar className={"toolbar"}>
                    <Link to={url} className={"link"}>
                        <Typography variant="h6">
                            {t("home")}
                        </Typography>
                    </Link>
                    <div className={"rightToolbarOptions"}>
                        {_renderRegisterNewResearch()}
                        {_renderUserInfo()}
                    </div>
                </Toolbar>
            </AppBar>
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
        </div>
    )
}
