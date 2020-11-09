import useI18n from "@/hooks/use-i18n";
import { getDicts } from "@/lib/GetDicts";
import { i18nPageProps } from "@/types";
import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

type Props = i18nPageProps;

const HomePage: NextPage<Props> = () => {
  const { t, activeLocale } = useI18n();
  return (
    <>
      <NextSeo title="Home Page" description="La Home Page" />
      <div>
        <Link href="/" locale={activeLocale === "fr" ? "en" : "fr"}>
          <a>{t("switch")}</a>
        </Link>
        <div>{t("intro.welcome", { username: "Manutan" })}</div>
        <div>{t("intro.text")}</div>
        <div>{t("other_text")}</div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      lng: locale,
      lngDict: await getDicts(["common", "common2"], locale),
    },
  };
};

export default HomePage;
