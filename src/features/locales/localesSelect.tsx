import React, {useMemo} from "react";
import { useTranslate } from "../../app/hooks";
import Select from "./select";

const LocaleSelect = () => {

  const { lang, setLang } = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'en', title: 'English'},
      {value: 'ru', title: 'Русский'},
    ]), [])
  };

  return (
    <Select testid="localeSelect" onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default React.memo(LocaleSelect);