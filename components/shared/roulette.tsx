"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const items = [
  { name: "Jantar romântico", description: "Desfrute de uma refeição deliciosa e romântica em um restaurante incrível de sua escolha", image: "/restaurante.png" },
  {
    name: "Carrinho da shopee",
    description: "Um carrinho de compras até R$ 200",
    image: "/shopee.png",
  },
  {
    name: "Piquenique + Cinema",
    description: "Um dia inteiro de diversões.",
    image: "/piquenique.png",
  },
  {
    name: "Dia de surpresas",
    description: "Um dia repleto de surpresas.",
    image: "/supresa.png",
  },
];

export default function CSGORoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const controls = useAnimation();
  const rouletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se já existe um resultado armazenado no localStorage
    const storedResult = localStorage.getItem("rouletteResult");
    if (storedResult !== null) {
      setResult(Number(storedResult));
    }
  }, []);

  const itemWidth = 500;
  const visibleItems = 7; 
  const centerIndex = Math.floor(visibleItems / 2);

  const spinRoulette = async () => {
    if (spinning || result !== null) return;

    setSpinning(true);
    setResult(null);

    await controls.start({
      x: 0,
      transition: { duration: 0, ease: "easeInOut" },
    });

    const spins = 5;
    const totalItems = items.length;

    const randomIndex = Math.floor(Math.random() * totalItems);

    const centerOffset = centerIndex * itemWidth;
    const extraDistance = randomIndex * itemWidth;
    const totalDistance = spins * totalItems * itemWidth + extraDistance;

    await controls.start({
      x: -(totalDistance + centerOffset),
      transition: { duration: 15, ease: "easeInOut" },
    });

    setResult(randomIndex);
    localStorage.setItem("rouletteResult", String(randomIndex)); // Armazena o resultado no localStorage
    setSpinning(false);
  };

  useEffect(() => {
    if (!spinning && result !== null && rouletteRef.current) {
      const offset = result * itemWidth + centerIndex * itemWidth;
      rouletteRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [spinning, result]);

  const repeatedItems = Array(1000)
    .fill(null)
    .flatMap(() => items);

  return (
    <Card className="w-full max-w-3xl mt-4 border-2 border-rose-200 card-border-animate">
      <CardContent className="p-6">
        {result !== null ? (
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-medium">Parabéns, você ganhou:</span>
            <img
              src={items[result].image}
              alt={items[result].name}
              className="max-w-[150px] mb-2 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800">{items[result].name}</h3>
            <p className="text-gray-500">{items[result].description}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold ml-2">Presente de Aniversário 🎉</h2>
              <p className="text-sm text-muted-foreground text-center mb-4"><b>obs: </b>A roleta só pode ser girada uma vez, boa sorte 😁</p>
            </div>
            <div className="relative overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                <ChevronDown className="text-rose-500" size={32} />
              </div>
              <div
                className="overflow-hidden"
                style={{ width: `${visibleItems * itemWidth}px`, margin: "0 auto" }}
              >
                <motion.div
                  ref={rouletteRef}
                  className="flex"
                  animate={controls}
                  style={{ x: -centerIndex * itemWidth }}
                >
                  {repeatedItems.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex-shrink-0 w-[100px] h-[100px] p-2",
                        "flex items-center justify-center",
                        result === index % items.length
                          ? "bg-yellow-300 border-rose-200 border-2 rounded-lg"
                          : "border-rose-200 border-2 rounded-lg"
                      )}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={spinRoulette}
                disabled={spinning}
                className="bg-rose-400 hover:bg-black-600 text-white font-medium"
              >
                {spinning ? "Girando..." : "Girar a roleta"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
