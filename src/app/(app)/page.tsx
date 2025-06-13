"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

export default function Home() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
 <div>
     <main className="flex flex-col items-center px-4 py-8">
      <section className="text-center mb-8 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Dive into the world of Anonymous Conversations
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Explore Magical Message - where your identity remains a secret
        </p>
      </section>

      <Carousel className="w-full max-w-md md:max-w-xl" plugins={[plugin.current]}>
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index}>
              <div className="p-4">
                <Card className="shadow-lg">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold text-primary">{message.title}</h2>
                    <p className="text-gray-800 text-base">{message.content}</p>
                    <p className="text-sm text-gray-500">⏱️ {message.hour}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
    <footer className="text-center p-4 md:p-6">
      @2025 Magical Message. All rights reserved.
    </footer>
 </div>
  );
}
