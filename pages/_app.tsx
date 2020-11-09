import I18n from "@/lib/i18n";
import { wrapper } from "@/store";
import "@/styles/index.css";
import { i18nPageProps } from "@/types";
import { AppProps } from "next/app";

function CustomApp({ Component, pageProps }: AppProps<i18nPageProps>) {
  return (
    <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
      <Component {...pageProps} />
    </I18n>
  );
}

export default wrapper.withRedux(CustomApp);
