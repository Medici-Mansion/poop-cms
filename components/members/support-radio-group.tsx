'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useContext, useEffect, useState } from 'react';
import { SupportContext } from './support';

export function SupportRadioGroup() {
  const [categoryVal, setCategoryVal] = useState('Report');
  const { setCategory } = useContext(SupportContext)!;

  useEffect(() => {
    setCategory(categoryVal);
  }, [categoryVal, setCategory]);

  return (
    <RadioGroup
      onValueChange={setCategoryVal}
      defaultValue="Report"
      className="flex w-fit space-y-1 dark:bg-custom-gray-500 rounded-2xl"
    >
      <RadioGroupItem className="hidden" value="Report" id="Report" />
      <Label
        htmlFor="Report"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Report' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        신고 내역
      </Label>
      <RadioGroupItem className="hidden" value="Ask" id="Ask" />
      <Label
        htmlFor="Ask"
        className={`!mt-0 px-6 py-4 font-normal cursor-pointer rounded-2xl ${categoryVal === 'Ask' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
      >
        문의 내역
      </Label>
    </RadioGroup>
  );
}
