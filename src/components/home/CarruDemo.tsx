import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselDemo({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full border-none">
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 bg-red-600 border-none w-full h-full">
              {images.length > 0 ? (
                <Card>
                  <CardContent>
                    <Image
                      src={images[index]}
                      alt="product"
                      width={1200}
                      height={800} // Alto original de la imagen
                      style={{ width: "100%", height: "auto" }}
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
