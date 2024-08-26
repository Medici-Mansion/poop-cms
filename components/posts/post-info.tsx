import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useContext, useEffect, useState } from 'react';
import { PostRadioGroup } from './post-radio-group';
import { PostContext } from './posts';

export function PostInfo() {
  const [orderVal, setOrderVal] = useState('DESC');
  const { setOrder } = useContext(PostContext)!;

  const handleValueChange = useCallback(() => {
    if (setOrder) {
      setOrder(orderVal);
    }
  }, [orderVal, setOrder]);

  useEffect(() => {
    void handleValueChange();
  }, [orderVal, handleValueChange]);

  return (
    <div className="flex items-center gap-8">
      <PostRadioGroup />
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
      </div>
    </div>
  );
}
