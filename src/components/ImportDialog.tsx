"use client";

import { UploadIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CombinedBuffs } from "@/data";
import { useModel } from "@/store";
import { Button } from "./Button";
import { Card } from "./Card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./Dialog";
import { useLocaleContext } from "@/contexts/LocaleContext";

export const ImportDialog = () => {
  const { locale } = useLocaleContext();
  
  // 簡易的な翻訳関数
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'import.title': 'Import Build',
        'import.description': 'Paste JSON to import a build',
        'import.apply': 'Apply',
        'import.error': 'Invalid JSON format'
      },
      'ja': {
        'import.title': 'ビルドのインポート',
        'import.description': 'JSONを貼り付けてビルドをインポート',
        'import.apply': '適用',
        'import.error': '無効なJSON形式'
      }
    };
    
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  };
  
  const {
    setAttack,
    setAffinity,
    setElement,
    setWeapon,
    setSharpness,
    setBuff,
    setRawHzv,
    setEleHzv,
    setIsWound,
  } = useModel();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const data = useMemo(() => {
    try {
      const json = JSON.parse(text);
      setError(false);
      return json;
    } catch (e) {
      setError(true);
      return null;
    }
  }, [text]);

  const apply = () => {
    if (!data) return;
    if (data.attack) setAttack(data.attack);
    if (data.affinity) setAffinity(data.affinity);
    if (data.element) setElement(data.element);
    if (data.weapon) setWeapon(data.weapon);
    if (data.sharpness) setSharpness(data.sharpness);
    if (data.rawHzv) setRawHzv(data.rawHzv);
    if (data.eleHzv) setEleHzv(data.eleHzv);
    if (data.isWound !== undefined) setIsWound(data.isWound);
    if (data.buffs) {
      Object.entries(data.buffs).forEach(([k, v]) => {
        const buff = CombinedBuffs[k];
        if (!buff) return;
        const level = buff.levels[Number(v) - 1];
        if (!level) return;
        setBuff(k, level);
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">{t('import.title')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t('import.title')}</DialogTitle>
        <div>
          <p className="text-xs">{t('import.description')}</p>
          <Card className="scrollbar max-h-96 overflow-y-auto">
            <textarea
              className="bg-content-alt w-full rounded p-2 font-mono text-xs"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
            />
          </Card>
          {error && <p className="text-destructive text-xs">{t('import.error')}</p>}
          <div className="mt-2 flex justify-end gap-1">
            <Button
              variant="secondary"
              onClick={apply}
              disabled={!data}
            >
              {t('import.apply')}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
