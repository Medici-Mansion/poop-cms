import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SupportRadioGroup } from './support-radio-group';
import { SupportContext } from './support';

export function SupportInfo() {
  const [formatVal, setFormatVal] = useState('All');
  const [orderVal, setOrderVal] = useState('DESC');
  const { setOrder, setFormat, category } = useContext(SupportContext)!;

  const handleValueChange = useCallback(() => {
    if (setOrder && setFormat) {
      setOrder(orderVal);
      setFormat(formatVal === 'All' ? '' : formatVal);
    }
  }, [orderVal, formatVal, setOrder, setFormat]);

  useEffect(() => {
    void handleValueChange();
  }, [orderVal, formatVal, handleValueChange]);

  return (
    <div className="flex items-center gap-8">
      <SupportRadioGroup />
      <div className="flex gap-2">
        <Select defaultValue="DESC" onValueChange={setOrderVal}>
          <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
            <SelectValue placeholder="정렬 기준 선택" />
          </SelectTrigger>
          <SelectContent className="bg-custom-gray-400 rounded-2xl ">
            <SelectItem value="DESC">최근 등록 순</SelectItem>
            <SelectItem value="ASC">오래된 순</SelectItem>
          </SelectContent>
        </Select>

        {category === 'Report' && (
          <Select defaultValue="All" onValueChange={setFormatVal}>
            <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
              <SelectValue placeholder="게시글 선택" />
            </SelectTrigger>
            <SelectContent className="bg-custom-gray-400 rounded-2xl ">
              <SelectItem value="All">게시글 전체</SelectItem>
              <SelectItem value="Toon">툰</SelectItem>
              <SelectItem value="Comment">댓글</SelectItem>
              <SelectItem value="Questions">질문글</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
