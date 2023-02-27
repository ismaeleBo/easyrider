import { Slide } from 'easyrider/src/components/Slider';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import rider from './images/rider.png';
import app from './images/app.png';
import navigation from './images/navigation.png';
import card from './images/card.png';

export const slides: Slide[] = [
  {
    image: rider,
    title: 'welcomeSlide1',
  },
  {
    image: navigation,
    title: 'welcomeSlide2',
  },
  {
    image: navigation,
    title: 'welcomeSlide3',
  },
  {
    image: card,
    title: 'welcomeSlide4',
  },
];
