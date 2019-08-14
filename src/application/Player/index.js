import React, {useRef, useState, useEffect} from 'react';
import { connect} from 'react-redux';
import { prefixStyle} from './../../api/utils';
import { pathToFileURL } from 'url';

const Player = (props) => {
  const [full, setFull] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songReady, setSongReady] = useState(true);
  const [modeText, setModeText] = useState('');
  let person = isNaN(currentTime/duration) ? 0 : currentTime/duration;

  const {
    playing,
    currentSong,
    currentIndex,
    playList,
    mode,
    sequencePlayList
  } = props;

  const {
    togglePlayingDispatch,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch
  } = props;

  const cdWrapperRef = useRef();
  const cdImageRef = useRef();
  const miniWrapperRef = useRef();
  const miniImageRef = useRef();

  const song = currentSong;
  const [preSong, setPreSong] = useState();

  // 处理transform的浏览器兼容问题
  const transform = prefixStyle('transform');
  const audioRef = useRef();

  useEffect(() => {
    if(!playList.length || currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id) return;
    if(!songReady) {
      alert('操作太快！');
      return;
    }

    setSongReady(false);
    let current = playList[currentIndex];
    changeCurrentDispatch(current);
    setPreSong(current);
    audioRef.current.src = `https://music.163.com/song/media/outer/url?id=${current.id}.mp3`;
    audioRef.current.play();
    setTimeout(() => {
      setSongReady(true);
    },100);
    togglePlayListDispatch(true);
    setCurrentTime(0);
    setDuration(current.dt/1000 | 0);
  },[currentIndex, playList]);

  useEffect(() = {
    playing ? audioRef.current.play() : audioRef.current.pause();
  },[playing])

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth *0.8;
    const scale = targetWidth/width;
    
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 -paddingLeft);
    const y = window.innerHeight - paddingTop - width /2 -paddingBottom;
    return {
      x,
      y,
      scale
    }
  }

  const enter = () => {
    normalPlayerRef.current.style.display = 'block';
    const {x,y,scale} = _getPosAndScale();
    let animation = {
      0: {
        transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform:`translate3d(0,0,0) scale(1.1)`
      },
      100:{
        transform:`translate3d(0,0,0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });
    animations.runAnimation(cdWrapperRef.current, 'move');
  }

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  }

  const leave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition ='all 0.4s';
    const {x,y,scale} = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px,0) scale(${scale})`;

  }

  const afterLeave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = '';
    cdWrapperDom.style[transform] = '';
    normalPlayerRef.current.style.display = 'none';
  }

  const clickPlaying = (e, state) =>{
    e.stopPropagation();
    togglePlayingDispatch(state);
  }

  const onProgressChange = (curPercent) => {
    const newTime = curPercent*duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if(!palying) {
      togglePlayingDispatch(true);
    }
  }
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime);
  }
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    audioRef.current.play();

  }

  const handlePrev = () => {
    if(playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if(index === 0) index = playList.length -1;
    changeCurrentIndexDispatch(index);
  }


}