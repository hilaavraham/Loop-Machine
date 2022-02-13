import React, { useEffect, useState, useRef } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { useAudioPosition } from "react-use-audio-player";
import { findRenderedComponentWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';

const useStyle = makeStyles(theme => ({
    container: {
        margin: 4,
        padding: 4,
        backgroundColor: ({ color }) => color,
        flex: 1,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },
    onOffButton: {
        margin: theme.spacing(0, 2),
        alignItems: 'right',
        justifyContent: 'right',
        //fontSize: '20px'
    },
    lable: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        //fontWeight: 'bold'
    }

}));


export const Channel = ({ file, onToggleMute }) => {

    const classes = useStyle({ color: file.color });

    const [isMuted, setIsMuted] = useState(file.isMuted);

    const onMute = () => {
        setIsMuted(!isMuted);
        onToggleMute(file);
    }


    return <Card className={classes.container}>
        <label className={classes.lable}>
            {file.lable}
        </label>
        <button onClick={onMute} className={classes.onOffButton}>
            {isMuted ? 'On' : 'Off'}
        </button>
    </Card >
};
