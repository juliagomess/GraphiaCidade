import React from 'react';
import AdvancedAudio from '~/components/AdvancedAudio/AdvancedAudio';
import { formatBase64 } from '~/utils/utilities';

interface IAdvancedMapMarkerProps {
  photo?: string | null;
  category: string;
  description: string;
  profileType: string;
  audio?: string | null;
}

const AdvancedMapMarker: React.FC<IAdvancedMapMarkerProps> = ({ photo, category, description, profileType, audio }: IAdvancedMapMarkerProps) => (
  <div className="advanced-map-marker">
    {photo && (
      <img
        className="advanced-map-marker__img"
        src={photo && formatBase64(photo, 'image/png')} 
        alt={category as string} 
      />
    )}
    <h1 className="advanced-map-marker__title">{category}</h1>
    <p className="advanced-map-marker__subtitle">{profileType}</p>
    <p className="advanced-map-marker__description">{description}</p>
    {audio && (
      <div className="advanced-map-marker__audio">
        <AdvancedAudio
          tracks={[{ 
            source: audio && formatBase64(audio, 'audio/mp3') 
          }]}
        />
      </div>
    )}
  </div>
);

export default AdvancedMapMarker;

