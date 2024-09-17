import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo({ images }: { images: string[] }) {
  console.log(images);
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 500 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              {images.length > 0 ? (
                <Card>
                  <CardContent>
                    <img
                      src={images[index]}
                      alt="product"
                      width={100}
                      height={100}
                      className="rounded-lg max-h-[100px] w-auto mx-auto"
                    />
                  </CardContent>
                </Card>
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
