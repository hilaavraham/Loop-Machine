import React, { Component, useEffect, useState, useRef } from 'react';
import './App.css';
import Tambourine from './loopFiles/_tambourine_shake_higher.mp3';
import BVoice from './loopFiles/B VOC.mp3';
import Drums from './loopFiles/DRUMS.mp3';
import HeHeVoc from './loopFiles/HE HE VOC.mp3';
import HighVoc from './loopFiles/HIGH VOC.mp3';
import Jibrish from './loopFiles/JIBRISH.mp3';
import Lead1 from './loopFiles/LEAD 1.mp3';
import UuhoVoc from './loopFiles/UUHO VOC.mp3';
import { Howl, Howler } from 'howler';
import { makeStyles, Box } from '@material-ui/core';
import { BottomButtons } from './components/BottomButtons';
import { Channel } from './components/Channel';
import background from './backgroundImg/images222.jpg';


const useStyle = makeStyles(theme => ({
  app: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#e5eded',
    flex: 1,
    width: '100%',
    textAlign: 'center'
  },
  MainButtons: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#00bcd4'
  },
  lable: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '50px',
    fontWeight: 'bold'
  }
}));



const loopfiles = [
  { sound: Tambourine, lable: "Tambourine", color: '#6EA4BF' },
  { sound: BVoice, lable: "B Voice", color: '#98CAD5' },
  { sound: Drums, lable: "Drums", color: '#C2EFEB' },
  { sound: HeHeVoc, lable: "He He Voc", color: '#D7F7EA' },
  { sound: HighVoc, lable: "High Voc", color: '#ECFEE8' },
  { sound: Jibrish, lable: "Jibrish", color: '#E7E7DA' },
  { sound: Lead1, lable: "Lead1", color: '#E1D0CB' },
  { sound: UuhoVoc, lable: "UUHO Voc", color: '#D6A2AD' }
]


function App() {

  const classes = useStyle();
  const [isLoop, setIsLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sounds, setSounds] = useState([]);

  const progressBar = useRef();
  const animationRef = useRef();

  //The Howl Object will be create only at the first time.
  useEffect(() => {
    setSounds(
      loopfiles.map(x => ({
        ...x,
        isMuted: false,
        howlPlayer: new Howl(
          {
            src: x.sound,
            volume: 0.5,
            seek: 0.0,
            loop: false,
            playing: false,
            rate: 1,
            mute: false
          })
      })));
  }, []);


  //set the progrresbar max value only at the first time.
  useEffect(() => {
    progressBar.current.max = Math.floor(sounds[0]?.howlPlayer?.duration);
  }, []);

  //every time isPlaying change, this function runs.
  useEffect(() => {
    if (isPlaying)
      animationRef.current = requestAnimationFrame(whilePlaying);
    else
      cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  //while plaing (some sounds are playing) - set the progress bar according to the current play time.
  const whilePlaying = () => {
    progressBar.current.value = sounds[0].howlPlayer.seek();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  //while the user change the position of the progress bar-
  // we will update all the seek sounds to be the position of the progress bar
  const changeRange = () => {
    for (const sound of sounds) {
      sound.howlPlayer.seek(progressBar.current.value);
    }
  }

  //handle toggle On/Off of each channel - mute the sound or not
  const toggleMute = file => {
    file.howlPlayer.mute(!file.isMuted);
    file.isMuted = !file.isMuted;
    console.log(file.isMuted);
  };


  return (
    <div className={classes.app}>
      <label className={classes.lable}>
        Loop Machine
      </label>
      <Box display='flex' width='100%' justifyContent='center' alignItems='center' flexDirection='column' padding={0} margin={0} flexWrap='flexWrap' flex={1}>
        {
          sounds.map((file, index) =>
            <Channel file={file} key={index} isMuted={file.isMuted} onToggleMute={() => toggleMute(file)} />
          )
        }
      </Box>
      <div>
        <input
          type='range'
          min='0'
          max={sounds[0]?.howlPlayer?.duration()}
          step='0.5'
          value={sounds[0]?.howlPlayer?.seek()}
          ref={progressBar}
          defaultValue='0'
          height='1px'
          onChange={changeRange}
        />
      </div>
      <BottomButtons sounds={sounds} setIsLoop={setIsLoop} isLoop={isLoop} onPlay={() => setIsPlaying(true)} onStop={() => setIsPlaying(false)} />
    </div>
  );
}

export default App;
