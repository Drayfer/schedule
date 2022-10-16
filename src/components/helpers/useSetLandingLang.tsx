import { useEffect } from 'react';
import { localeArray } from '../../assets/constants/lang';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLandingLocale } from '../../store/reducers/LandingSlice';
import { setLang } from '../../store/reducers/OptionsSlice';
import { lang as language } from '../../assets/constants/lang';

export const useSetLandingLang = () => {
  const { locale } = useAppSelector((state) => ({
    locale: state.landing.locale
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!locale) {
      let landingLang = navigator.language.split('-')[0];
      if (!localeArray.includes(landingLang)) {
        landingLang = 'en';
      }
      dispatch(setLandingLocale(landingLang));
    } else {
      dispatch(setLang(language[locale]));
    }
    // eslint-disable-next-line
  }, [locale]);

  return null;
};
