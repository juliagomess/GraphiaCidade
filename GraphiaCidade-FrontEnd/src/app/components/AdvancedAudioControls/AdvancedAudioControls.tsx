import React from 'react';
import { ReactComponent as PlayIcon } from '~/assets/svg/media/ic_play.svg';
import { ReactComponent as PauseIcon } from '~/assets/svg/media/ic_pause.svg';
import { ReactComponent as NextIcon } from '~/assets/svg/media/ic_next.svg';
import { ReactComponent as PreviousIcon } from '~/assets/svg/media/ic_prev.svg';

interface AdvancedAudioControlsProps {
  isPlaying: boolean,
  onPlayPauseClick: (val: boolean) => void,
  onPreviousClick: () => void,
  onNextClick: () => void,
}

const AdvancedAudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPreviousClick,
  onNextClick,
}: AdvancedAudioControlsProps) => (
  <div className="advanced-audio-controls">
    <button 
      type="button" 
      className="advanced-audio-controls__previous"
      onClick={onPreviousClick}
    >
      <PreviousIcon />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="advanced-audio-controls__pause"
        onClick={() => onPlayPauseClick(false)}
      >
        <PauseIcon />
      </button>
    ) : (
      <button
        type="button"
        className="advanced-audio-controls__play"
        onClick={() => onPlayPauseClick(true)}
      >
        <PlayIcon />
      </button>
    )}
    <button 
      type="button" 
      className="advanced-audio-controls__next"
      onClick={onNextClick}
    >
      <NextIcon />
    </button>
  </div>
)

export default AdvancedAudioControls;
