// POC purposes a dirty way to Import images.
import sunny from '../../../resources/images/wi-day-sunny.svg';
import snow from '../../../resources/images/wi-snow.svg';
import clouds from '../../../resources/images/wi-cloudy.svg';
import rain from '../../../resources/images/wi-rain.svg';
import thunder from '../../../resources/images/wi-thunderstorm.svg';
import drizzle from '../../../resources/images/wi-showers.svg';
import alien from '../../../resources/images/wi-alien.svg';

export function getIcon(type) {
  switch (type) {
    case 'Clear':
      return sunny;
    case 'Clouds':
      return clouds;
    case 'Rain':
      return rain;
    case 'Thunderstorm':
      return thunder;
    case 'Drizzle':
      return drizzle;
    case 'Snow':
      return snow;
    default:
      return alien;
  }
}