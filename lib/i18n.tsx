import { createContext, useState, useRef, useEffect, useMemo } from "react";
import rosetta from "rosetta";
import { DictType } from "@/types";

export type I18nProps = {
  children: JSX.Element;
  locale: string;
  lngDict: DictType;
};

const i18n = rosetta<DictType>();

export const defaultLanguage = "en";
export const languages = ["fr", "en"];
export const contentLanguageMap = { fr: "fr-FR", en: "en-US" };

export type I18nContextProps = {
  activeLocale: string;
  t: typeof i18n.t;
  locale: (l: string, dict: DictType) => void;
};

export const I18nContext = createContext<I18nContextProps>({
  activeLocale: "",
  t: () => "",
  locale: () => null,
});

i18n.locale(defaultLanguage);

export default function I18n({
  children,
  locale,
  lngDict,
}: I18nProps): JSX.Element {
  const activeLocaleRef = useRef(locale || defaultLanguage);
  const [tick, setTick] = useState(0);
  const firstRender = useRef(true);

  const i18nWrapper: I18nContextProps = useMemo(
    () => ({
      activeLocale: activeLocaleRef.current,
      t: (key, params, lang) => i18n.t(key, params, lang),
      locale: (l, dict) => {
        i18n.locale(l);
        activeLocaleRef.current = l;
        if (dict) {
          i18n.set(l, dict);
        }
        // force rerender to update view
        setTick((tick) => tick + 1);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick]
  );

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false;
    i18nWrapper.locale(locale, lngDict);
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      i18nWrapper.locale(locale, lngDict);
    }
  }, [i18nWrapper, lngDict, locale]);

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  );
}
