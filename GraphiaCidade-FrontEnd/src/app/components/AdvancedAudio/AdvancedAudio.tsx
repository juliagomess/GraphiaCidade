import React, { useState, useEffect, useRef } from 'react';
import AdvancedAudioControls from '~/components/AdvancedAudioControls/AdvancedAudioControls';

interface AdvancedAudioProps {
  tracks: Array<{ source: string }>,
};

const AdvancedAudio = ({ tracks }: AdvancedAudioProps) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { source } = tracks[trackIndex];
  
  const audio = useRef(new Audio(source));
  const interval = useRef<any>();
  const isReady = useRef<any>();

  const { duration } = audio.current;

  const percentage = duration 
    ? `${(trackProgress / duration) * 100}`
    : '0%';

  const style = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${percentage}, #46eb7d), color-stop(${percentage}, #777))
  `;

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
      start();
    } else {
      audio.current.pause();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    audio.current.pause();

    audio.current = new Audio(source);
    setTrackProgress(audio.current.currentTime);

    if (isReady.current) {
      audio.current.play();
      setIsPlaying(true);
      start();

    } else {
      isReady.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audio.current.pause();
      clearInterval(interval.current);
    };
  }, []);

  const toPreviousTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  const start = () => {
    clearInterval(interval.current);

    interval.current = setInterval(() => {
      if (audio.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audio.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
    clearInterval(interval.current);
    audio.current.currentTime = value;
    setTrackProgress(audio.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    start();
  };

  return (
    <div className="advanced-audio">
      <div className="advanced-audio__track">
        <AdvancedAudioControls
          isPlaying={isPlaying}
          onPreviousClick={toPreviousTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="advanced-audio__track__progress"
          onChange={(e: any) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: style }}
        />
      </div>
    </div>
  )
}

export default AdvancedAudio;