import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {animated, useChain, useSpring, config} from "react-spring";

export const Loading = () => {
    const [animating, setAnimating] = useState(true);

    /*TODO - Simplify spring refs generation*/
    const spring1: any = useRef();
    const props1 = useSpring({
        ref: spring1,
        from: {transform: "translate3d(0px, 0px, 0px)", opacity: 0},
        to: async (next: any, cancel: any) => {
            while (animating) {
                await next({transform: "translate3d(400px, 0px, 0px)", opacity: 1});
                await next({transform: "translate3d(400px, 50px, 0px)"});
                await next({transform: "translate3d(400px, 0px, 0px)"});
                await next({transform: "translate3d(1200px, 0px, 0px)", opacity: 0});
                await next({transform: "translate3d(0px, 0px, 0px)"});
            }
        }
    });

    const spring2: any = useRef();
    const props2 = useSpring({
        ref: spring2,
        from: {transform: "translate3d(0px, 0px, 0px)", opacity: 0},
        to: async (next: any, cancel: any) => {
            while (animating) {
                await next({transform: "translate3d(400px, 0px, 0px)", opacity: 1});
                await next({transform: "translate3d(400px, 50px, 0px)"});
                await next({transform: "translate3d(400px, 0px, 0px)"});
                await next({transform: "translate3d(1200px, 0px, 0px)", opacity: 0});
                await next({transform: "translate3d(0px, 0px, 0px)"});
            }
        }
    });

    const spring3: any = useRef();
    const props3 = useSpring({
        ref: spring3,
        from: {transform: "translate3d(0px, 0px, 0px)", opacity: 0},
        to: async (next: any, cancel: any) => {
            while (animating) {
                await next({transform: "translate3d(400px, 0px, 0px)", opacity: 1});
                await next({transform: "translate3d(400px, 50px, 0px)"});
                await next({transform: "translate3d(400px, 0px, 0px)"});
                await next({transform: "translate3d(1200px, 0px, 0px)", opacity: 0});
                await next({transform: "translate3d(0px, 0px, 0px)"});
            }
        }
    });


    useChain([spring1, spring2, spring3], [0, 0.1, 0.2]);
    useEffect(() => {
        return () => {
            setAnimating(false);
        }
    })

    return (
        <div style={{height: "100%", width: "100%", backgroundColor: "yellow", display: "flex", flexDirection: "row", alignItems: "center"}}>
            <animated.div style={{...props1, height: 25, width: 25, backgroundColor: "red", borderRadius: "50%", margin: 10}}/>
            <animated.div style={{...props2, height: 25, width: 25, backgroundColor: "red", borderRadius: "50%", margin: 10}}/>
            <animated.div style={{...props3, height: 25, width: 25, backgroundColor: "red", borderRadius: "50%", margin: 10}}/>
        </div>
    )
}
