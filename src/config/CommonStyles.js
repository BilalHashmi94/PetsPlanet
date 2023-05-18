import Colors from './Colors';
import Metrix from './Metrix';

const CommonStyles = {
  textStyles: {
    heading: {
      fontFamily: 'Lato-Bold',
      fontSize: Metrix.customFontSize(35),
      color: Colors.black,
    },
    intro: {
      fontFamily: 'Lato-Semibold',
      fontSize: Metrix.customFontSize(16),
      color: Colors.introText,
    },
    semiHeading: {
      fontFamily: 'Lato-Semibold',
      fontSize: Metrix.customFontSize(18),
      color: Colors.black,
    },
    textInputText: {
      fontFamily: 'Lato-Semibold',
      fontSize: Metrix.customFontSize(15),
      color: Colors.black,
    },
    buttonText: {
      fontFamily: 'Lato-Semibold',
      fontSize: Metrix.customFontSize(17),
      color: Colors.white,
    },
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(28),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default CommonStyles;
