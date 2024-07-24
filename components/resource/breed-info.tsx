import type { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext } from 'react';
import { BreedContext } from './dogs';
interface BreedInfoProps<TData> {
  table: Table<TData>;
}

export function BreedInfo<TData>({ table }: BreedInfoProps<TData>) {
  const totalCount = table.getRowCount();

  const breedContext = useContext(BreedContext);
  const handleGetBreeds = breedContext?.handleGetBreeds;

  const handleValueChange = async (value: string) => {
    console.log('선택된 값:', value); // 선택된 값을 콘솔에 출력

    if (handleGetBreeds) {
      const query = {};
      // TODO: 정렬 기능 추가 필요
      await handleGetBreeds(query);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <p className="text-2xl">총 {totalCount}마리</p>
      <Select defaultValue="apple" onValueChange={handleValueChange}>
        <SelectTrigger className="w-[150px] bg-custom-gray-500 rounded-2xl ">
          <SelectValue placeholder="정렬 기준 선택" />
        </SelectTrigger>
        <SelectContent className="bg-custom-gray-400 rounded-2xl p-0">
          <SelectItem value="recent">최근 등록 순</SelectItem>
          <SelectItem value="oldest">오래된 순</SelectItem>
          <SelectItem value="korean-alphabet">가나다 순</SelectItem>
          <SelectItem value="alphabetical">알파벳 순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
