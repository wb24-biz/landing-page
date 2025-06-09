"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/kit/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/shared/ui/kit/carousel";

export default function CarouselWithThumbs() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="mx-auto max-w-md">
      <Carousel setApi={setApi} className="w-full max-w-md">
        <CarouselContent>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Carousel className="mt-4 w-full max-w-sm">
        <CarouselContent className="flex my-1">
          {Array.from({ length: count }).map((_, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "basis-1/5 cursor-pointer",
                current === index + 1 ? "opacity-100" : "opacity-50"
              )}
              onClick={() => handleThumbClick(index)}
            >
              <Card>
                <CardContent className="p-0 flex aspect-square items-center justify-center">
                  <div className="text-2xl font-semibold">{index + 1}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
