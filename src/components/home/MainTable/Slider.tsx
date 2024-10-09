import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function Slider({ images }: { images: string[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-full max-h-[90vh] flex flex-col justify-center items-center ">
              {images.length > 0 ? (
                <Image
                  src={images[index]}
                  alt="product"
                  width={1200}
                  height={800}
                  className="h-full w-auto  object-contain"
                />
              ) : (
                <p>No se pudieron cargar las imágenes.</p>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
