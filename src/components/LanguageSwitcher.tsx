import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@/i18n/languages";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;
  const currentOption =
    LANGUAGE_OPTIONS.find((language) => language.code === currentLanguage) ||
    LANGUAGE_OPTIONS.find((language) => language.code === i18n.language) ||
    LANGUAGE_OPTIONS[0];
  const shortLabel =
    currentOption?.shortLabel ||
    currentOption?.label?.slice(0, 2)?.toUpperCase() ||
    currentLanguage?.toUpperCase();

  return (
    <Select value={currentLanguage} onValueChange={(value) => i18n.changeLanguage(value)}>
      <SelectTrigger
        aria-label={t("nav.languageAria")}
        className="h-10 w-12 justify-center rounded-full border border-border/70 bg-background/60 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/80 hover:text-foreground"
      >
        <Globe className="sr-only h-4 w-4" aria-hidden />
        <SelectValue placeholder={t("nav.language")}>
          <span aria-hidden className="text-sm font-bold">
            {shortLabel}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent side="bottom" align="end">
        {LANGUAGE_OPTIONS.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
