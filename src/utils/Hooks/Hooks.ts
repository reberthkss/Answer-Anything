import {useEffect, useState} from "react";

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState({width: window.innerWidth, height: window.innerHeight});
    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        }
    }, [dimensions]);
    return dimensions;
}
