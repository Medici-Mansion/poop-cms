'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useContext, useEffect, useState } from 'react';
import { GraphicContext } from './graphics';

export function GraphicRadioGroup() {
  const [categoryVal, setCategoryVal] = useState('Message');
  const { setCategory, graphicInfo } = useContext(GraphicContext)!;

  useEffect(() => {
    setCategory(categoryVal);
  }, [categoryVal, setCategory]);

  return (
    <RadioGroup
      onValueChange={setCategoryVal}
      defaultValue="Message"
      className="flex w-fit space-y-1 dark:bg-custom-gray-500 rounded-2xl"
    >
      <RadioGroupItem className="hidden" value="Message" id="message" />
      <Label
        htmlFor="message"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Message' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        말풍선 {graphicInfo?.messageLength || 0}
      </Label>
      <RadioGroupItem className="hidden" value="Sticker" id="sticker" />
      <Label
        htmlFor="sticker"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Sticker' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        스티커 {graphicInfo?.stickerLength || 0}
      </Label>
      <RadioGroupItem className="hidden" value="Challenge" id="challenge" />
      <Label
        htmlFor="challenge"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Challenge' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        챌린지 {graphicInfo?.challengeLength || 0}
      </Label>
    </RadioGroup>
  );
}
