"use client";

import { CopyIcon, XIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { CombinedBuffs } from "@/data";
import { useModel } from "@/store";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { Notice } from "./Notice";
import { useLocaleContext } from "@/contexts/LocaleContext";

export const ExportDialog = () => {
  const { locale } = useLocaleContext();
  
  // 簡易的な翻訳関数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'export.title': 'Export Build',
        'export.copy': 'Copy',
        'export.copied': 'Copied to clipboard',
        'export.description': 'Copy this JSON to share your build'
      },
      'ja': {
        'export.title': 'ビルドのエクスポート',
        'export.copy': 'コピー',
        'export.copied': 'クリップボードにコピーしました',
        'export.description': 'このJSONをコピーしてビルドを共有'
      }
    };
    
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  };
  
  const {
    weapon,
    attack,
    affinity,
    element,
    sharpness,
    frenzy,
    buffs,
    rawHzv,
    eleHzv,
    isWound,
  } = useModel();

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const data = useMemo(
    () =>
      JSON.stringify(
        {
          weapon,
          attack,
          affinity,
          element,
          sharpness,
          frenzy,
          rawHzv,
          eleHzv,
          isWound,
          buffs: Object.entries(buffs).reduce(
            (a, [k, v]) => {
              const buff = CombinedBuffs[k];
              if (!buff) return a;
              const i = buff.levels.findIndex((l) => l.name === v.name);
              if (i === -1) return a;
              return { ...a, [k]: i + 1 };
            },
            {} as Record<string, number>,
          ),
        },
        null,
        2,
      ),
    [
      weapon,
      attack,
      affinity,
      element,
      sharpness,
      frenzy,
      rawHzv,
      eleHzv,
      isWound,
      buffs,
    ],
  );

  const interval = useRef<NodeJS.Timeout>(undefined);

  const copy = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    interval.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">{t('export.title')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('export.title')}</DialogTitle>
        <div>
          <div className="flex justify-between">
            <p className="text-xs">{t('export.description')}</p>
            <div className="flex gap-1">
              <Button variant="secondary" size="sm" onClick={copy}>
                <CopyIcon /> {t('export.copy')}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                <XIcon />
              </Button>
            </div>
          </div>
          {copied && <Notice>{t('export.copied')}</Notice>}
          <Card className="scrollbar max-h-96 overflow-y-auto">
            <pre className="overflow-hidden text-xs">{data}</pre>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
