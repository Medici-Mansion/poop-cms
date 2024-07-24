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
  const [format, setFormat] = useState('all');
  const [order, setOrder] = useState('recent');
  const graphicContext = useContext(GraphicContext);
  const handleGetGraphics = graphicContext?.handleGetGraphics;

  const handleValueChange = useCallback(() => {
    console.log('선택된 값:', order, format); // 선택된 값을 콘솔에 출력

    if (handleGetGraphics) {
      // const query = {};
      // TODO: 정렬 기능 추가 필요
      // await handleGetGraphics(query);
    }
  }, [order, format, handleGetGraphics]);

  useEffect(() => {
    void handleValueChange();
  }, [order, format, handleValueChange]);

  return (
    <div className="flex items-center gap-8">
      <GraphicRadioGroup />
      <div className="flex gap-2">
        <Select defaultValue="recent" onValueChange={setOrder}>
          <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
            <SelectValue placeholder="정렬 기준 선택" />
          </SelectTrigger>
          <SelectContent className="bg-custom-gray-400 rounded-2xl ">
            <SelectItem value="recent">최근 등록 순</SelectItem>
            <SelectItem value="oldest">오래된 순</SelectItem>
            <SelectItem value="korean-alphabet">가나다 순</SelectItem>
            <SelectItem value="alphabetical">알파벳 순</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all" onValueChange={setFormat}>
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
