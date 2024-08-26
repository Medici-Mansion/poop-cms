import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext } from 'react';
import { BreedContext } from './dogs';
import type { BreedsQuery } from '@/types';

export function BreedInfo() {
  const breedContext = useContext(BreedContext);
  const handleGetBreeds = breedContext?.handleGetBreeds;
  const totalCount = breedContext?.pageInfo.totalCount;

  const handleValueChange = async (value: string) => {
    if (handleGetBreeds) {
      const query: BreedsQuery = {
        orderKey: value,
        direction: 'desc',
      };
      if (value === 'latest') {
        query.orderKey = 'updatedAt';
        query.direction = 'asc';
      } else if (['nameKR', 'nameEN'].includes(value)) {
        query.direction = 'asc';
      }
      await handleGetBreeds(query);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <p className="text-2xl">총 {totalCount}마리</p>
      <Select defaultValue="updatedAt" onValueChange={handleValueChange}>
        <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
          <SelectValue placeholder="정렬 기준 선택" />
        </SelectTrigger>
        <SelectContent className="bg-custom-gray-400 rounded-2xl ">
          <SelectItem value="updatedAt">최근 등록 순</SelectItem>
          <SelectItem value="latest">오래된 순</SelectItem>
          <SelectItem value="nameKR">가나다 순</SelectItem>
          <SelectItem value="nameEN">알파벳 순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
