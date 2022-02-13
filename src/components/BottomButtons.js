import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyle = makeStyles(theme => ({
    MainButtons: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        fontSize: '20',
    }
}));


export const BottomButtons = ({ sounds, setIsLoop, isLoop, onPlay, onStop }) => {

    const classes = useStyle();

    //playing all channels
    const playAll = () => {
        for (const sound of sounds) {
            sound.howlPlayer.play();
        }
        //set isPlaying to true
        onPlay();
    }

    //stop all playing channels
    const stopAll = () => {
        setIsLoop(false);

        for (const sound of sounds) {
            sound.howlPlayer.loop(false).stop();
        }
        //set isPlaying to false
        onStop();
    }

    const clickLoop = () => {
        setIsLoop(!isLoop);

        for (const sound of sounds) {
            sound.howlPlayer.loop(!isLoop);
        }
    }


    return (
        <div className={classes.MainButtons}>
            <button onClick={playAll}>
                Play
            </button>
            <button onClick={stopAll}>
                Stop
            </button>
            <button onClick={clickLoop}>
                {isLoop ? 'OFF Loop' : 'ON Loop'}
            </button>
        </div >
    )

};