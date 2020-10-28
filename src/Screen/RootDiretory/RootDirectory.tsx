import React, {useEffect} from "react";
import {ReduxState} from "../../redux/reducer";
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";

export const RootDirectory = () => {
    const history = useHistory();
    const user = useSelector((state: ReduxState) => state.user);
    useEffect(() => {
        if (user != null) {
            history.push("/dashboard");
        } else {
            history.push("/login");
        }
    })
    return (
        <div/>
    )
}
