import { Card, CardContent } from "@/components/ui/card";
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
    <Carousel className="w-full border-none">
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div>
              {images.length > 0 ? (
                <Card className="border-none">
                  <CardContent className="border-none">
                    <Image
                      src={images[index]}
                      alt="product"
                      width={1200}
                      height={800}
                      style={{ objectFit: "contain", border: "none" }}
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
