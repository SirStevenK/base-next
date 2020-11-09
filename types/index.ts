export type DictType = {
  [key: string]:
    | {
        [attribute: string]: string;
      }
    | string;
};

export type i18nPageProps = {
  lngDict: DictType;
  lng?: string;
};
