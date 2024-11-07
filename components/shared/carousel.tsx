import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing() {
  // Array de URLs de imagens na pasta public
  const images = [
    "/casal4.jpg",
    "/casal2.jpg",
    "/casal3.jpg",
    "/casal1.jpg",
  ];

  return (
    <Carousel
      className="w-full max-w-sm"
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}

    >
      <CarouselContent className="-ml-1">
        {images.map((src, index) => (
          <CarouselItem key={index} className="pl-4">
            <div className="p-1">
              <Card className="relative w-72 h-72 overflow-hidden rounded-md">
                <CardContent className="relative w-full h-full p-0">
                  <Image 
                    src={src} 
                    alt={`Imagem ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </div>
    </Carousel>
  );
}
