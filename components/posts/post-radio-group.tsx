'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from './posts';

export function PostRadioGroup() {
  const [categoryVal, setCategoryVal] = useState('Toon');
  const { setCategory } = useContext(PostContext)!;

  useEffect(() => {
    setCategory(categoryVal);
  }, [categoryVal, setCategory]);

  return (
    <RadioGroup
      onValueChange={setCategoryVal}
      defaultValue="Toon"
      className="flex w-fit space-y-1 dark:bg-custom-gray-500 rounded-2xl"
    >
      <RadioGroupItem className="hidden" value="Toon" id="Toon" />
      <Label
        htmlFor="Toon"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Toon' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        툰
      </Label>
      <RadioGroupItem className="hidden" value="Challenge" id="Challenge" />
      <Label
        htmlFor="Challenge"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Challenge' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        챌린지
      </Label>
      <RadioGroupItem className="hidden" value="Question" id="Question" />
      <Label
        htmlFor="Question"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Question' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        질문방
      </Label>
    </RadioGroup>
  );
}
