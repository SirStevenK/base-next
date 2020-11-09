import { useContext } from "react";
import { I18nContext, I18nContextProps } from "@/lib/i18n";

export default function useI18n(): I18nContextProps {
  const i18n = useContext(I18nContext);
  return i18n;
}
