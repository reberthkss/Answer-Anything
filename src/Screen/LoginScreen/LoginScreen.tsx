import React, {useEffect, useRef, useState} from "react";
import "./LoginScreen.css"
import BackgroundLogin from "../../resources/LoginBackground.jpg"
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Card} from "@material-ui/core";
import GoogleButton from 'react-google-button'
import {useDimensions} from "../../utils/Hooks/Hooks";
import {GoogleAuth} from "../../utils/Services/GoogleAuth";
import { useHistory } from "react-router-dom";

export const LoginScreen = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const styles = useStyles();
    const dimensions = useDimensions();
    const history = useHistory();
    const authGoogle = new GoogleAuth();

    const _handleLogin = async () => {
       await authGoogle.doLogin();
       history.push("/");
    }

    const _renderMainContent = () => {
        return (
            <Card  className={styles.card} elevation={5}>
                <GoogleButton onClick={_handleLogin}/>
            </Card>
        )
    }

    const _renderLoading = () => {
        return (
            <div/>
        )
    }

    const _renderContent = () => {
        if (isLoading) {
            return _renderLoading();
        } else {
            return _renderMainContent()
        }
    }

    /* ANIMATE LOADING */
    return (
        <div className={styles.backgroundImage} style={{height: dimensions.height, width: dimensions.width}} >
            <Grid className={styles.gridContainer} container>
                <Grid className={styles.gridItem} item>
                    {_renderContent()}
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    backgroundImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${BackgroundLogin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    gridContainer: {height: "50%", width: "30%"},
    gridItem: {height: '100%', width: '100%'},
    card: {height: '100%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center"}
})


