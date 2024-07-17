import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from 'components/ui/button';
import { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { GraphicUpload } from './graphic-upload';
import { Plus } from 'lucide-react';

interface GraphicUpdatePopupProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
}

export function GraphicUploadPopup({
  isOpen,
  onOpenChange,
}: GraphicUpdatePopupProps) {
  const [uploadList, setUploadList] = useState<FormData[]>([]);
  const [carouselList, setCarouselList] = useState<FormData[]>([]);
  const carouselNextRef = useRef<HTMLButtonElement>(null);

  const handleNextSlide = () => {
    if (carouselNextRef.current) {
      console.log('carouselNextRef.current', carouselNextRef.current);
      setTimeout(
        () => carouselNextRef.current && carouselNextRef.current.click(),
        500,
      );
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setUploadList([]);
    }
  }, [isOpen]);

  useEffect(() => {
    setCarouselList([...uploadList, new FormData()]);
    handleNextSlide();
  }, [uploadList]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[50px] h-[50px] border-white"
          onClick={() => onOpenChange(true)}
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="mb-6">
          <DialogTitle>그래픽 추가</DialogTitle>
        </DialogHeader>
        <Carousel className="w-full">
          <CarouselContent>
            {carouselList.map((item, idx) => (
              <CarouselItem key={idx}>
                <GraphicUpload
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  uploadList={uploadList}
                  setUploadList={setUploadList}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {uploadList.length ? (
            <>
              <CarouselPrevious />
              <CarouselNext ref={carouselNextRef} />
            </>
          ) : null}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
