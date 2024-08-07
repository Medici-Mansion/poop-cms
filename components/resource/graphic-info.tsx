import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useContext, useEffect, useState } from 'react';
import { GraphicRadioGroup } from './graphic-radio-group';
import { GraphicContext } from './graphics';

export function GraphicInfo() {
  const [formatVal, setFormatVal] = useState('all');
  const [orderVal, setOrderVal] = useState('DESC');
  const { setOrder, setFormat } = useContext(GraphicContext)!;

  const handleValueChange = useCallback(() => {
    if (setOrder && setFormat) {
      setOrder(orderVal);
      setFormat(formatVal === 'all' ? '' : formatVal);
    }
  }, [orderVal, formatVal, setOrder, setFormat]);

  useEffect(() => {
    void handleValueChange();
  }, [orderVal, formatVal, handleValueChange]);

  return (
    <div className="flex items-center gap-8">
      <GraphicRadioGroup />
      <div className="flex gap-2">
        <Select defaultValue="DESC" onValueChange={setOrderVal}>
          <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
            <SelectValue placeholder="정렬 기준 선택" />
          </SelectTrigger>
          <SelectContent className="bg-custom-gray-400 rounded-2xl ">
            <SelectItem value="DESC">내림차순</SelectItem>
            <SelectItem value="ASC">올림차순</SelectItem>
            <SelectItem disabled value="recent">
              최근 등록 순
            </SelectItem>
            <SelectItem disabled value="oldest">
              오래된 순
            </SelectItem>
            <SelectItem disabled value="korean-alphabet">
              가나다 순
            </SelectItem>
            <SelectItem disabled value="alphabetical">
              알파벳 순
            </SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all" onValueChange={setFormatVal}>
          <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
            <SelectValue placeholder="포맷 선택" />
          </SelectTrigger>
          <SelectContent className="bg-custom-gray-400 rounded-2xl ">
            <SelectItem value="all">포맷 전체</SelectItem>
            <SelectItem value="GIF">GIF</SelectItem>
            <SelectItem value="Lottie">Lottie</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
