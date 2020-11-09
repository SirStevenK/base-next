import { DictType } from "@/types";

export async function getDicts(
  nameDicts: string[],
  lang = "en"
): Promise<DictType> {
  const dict = {};
  for (let i = 0; i < nameDicts.length; i++) {
    const current_dict: DictType = await import(
      `@/locales/${lang}/${nameDicts[i]}.json`
    );
    Object.assign(dict, current_dict);
  }
  delete dict["default"];
  return dict;
}
