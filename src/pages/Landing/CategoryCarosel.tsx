import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function CategoryCarosel({ ind }: { ind: number }) {
  // console.log(ind);

  return (
    <div
      className={cn(
        "border flex flex-col items-center  justify-center lg:justify-between 2xl:justify-center bg-red-300",
        {
          "lg:flex-row": ind % 2 !== 0,
          "lg:flex-row-reverse": ind % 2 === 0,
        }
      )}
    >
      <div className=" lg:w-72  2xl:mr-16 2xl:w-96 flex justify-center items-center">
        <h1 className=" lg:inline ">cat name</h1>
      </div>
      <Carousel
        className={cn(
          "w-full max-w-screen-sm md:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl bg-red-700 lg:rounded-lg",
          {
            "lg:pl-10": ind % 2 !== 0,
            "lg:pr-10": ind % 2 === 0,
          }
        )}
      >
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden 2xl:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
