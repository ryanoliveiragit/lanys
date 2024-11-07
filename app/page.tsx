"use client";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { CarouselSpacing } from "@/components/shared/carousel";
import useElapsedTimeSince from "@/hook/use-elapsed-time-since";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface Equivalence {
  title: string;
  value: number;
  equivalent: string;
}

export default function Home() {
  const targetDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    4
  );
  const [equivalences, setEquivalences] = useState<Equivalence[]>([]);
  const [daysUntilSunday, setDaysUntilSunday] = useState(0);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState<number | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);

  // Função para calcular os dias até o próximo domingo
  const calculateDaysUntilSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
    setDaysUntilSunday(daysUntilSunday);
  };

  // Função para calcular os dias até o Aniversário
  const calculateDaysUntilBirthday = () => {
    const today = new Date();
    const birthdayDate = new Date(today.getFullYear(), 11, 9); // 11 = Dezembro, 9 = dia do aniversário

    // Verifica se hoje é dia 9 de dezembro
    if (today.getDate() === 9 && today.getMonth() === 11) {
      setIsBirthday(true);
      setDaysUntilBirthday(null); // Remove o contador quando for aniversário
    } else {
      // Calcula dias restantes
      const timeDiff = birthdayDate.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysUntilBirthday(days);
      setIsBirthday(false);
    }
  };

  useEffect(() => {
    calculateDaysUntilSunday();
    calculateDaysUntilBirthday();

    const updateEquivalences = () => {
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - targetDate.getTime();

      const totalSeconds = Math.floor(timeDiff / 1000);
      const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));

      const averageHeartRatePerSecond = 70 / 60;
      const bloodPumpedPerSecond = 5 / 60;
      const bloodFilteredPerSecond = 1.5 / 60;

      setEquivalences([
        {
          title: "Batimentos Cardíacos",
          value: totalSeconds * averageHeartRatePerSecond,
          equivalent: `Meu coração já bateu ${Math.floor(
            totalSeconds * averageHeartRatePerSecond
          ).toLocaleString()} vezes desde que estamos juntos, e cada batida foi por você, eu te amo eternamente @lanys <3`,
        },
        {
          title: "Litros de Sangue Bombeado",
          value: totalSeconds * bloodPumpedPerSecond,
          equivalent: `Já bombeei ${Math.floor(
            totalSeconds * bloodPumpedPerSecond
          ).toLocaleString()} litros de sangue enquanto pensava em você, como meu coração nunca para de funcionar, ele também nunca para de te amar.`,
        },
        {
          title: "Horas de Oxigenação do Corpo",
          value: totalHours,
          equivalent: `Já se passaram ${totalHours} horas que corpo recebeu oxigênio, e cada segundo foi melhor porque você está na minha vida.`,
        },
        {
          title: "Sangue Filtrado pelo Coração",
          value: totalSeconds * bloodFilteredPerSecond,
          equivalent: `Desde que estamos juntos, meu coração já filtrou ${Math.floor(
            totalSeconds * bloodFilteredPerSecond
          ).toLocaleString()} litros de sangue, purificando cada emoção e cada sentimento que tenho por você.`,
        },
      ]);
    };

    const interval = setInterval(updateEquivalences, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="max-w-2xl mx-auto">
        <section className="mb-2 flex flex-col items-center">
          <div className="flex flex-row gap-1 items-center mb-3">
            <p className="text-sm font-normal">Alanys <b>&</b> Ryan</p>
            <FaHeart className="text-sm text-rose-300" />
          </div>
          <h1 className="text-2xl font-bold text-center">Estamos juntos há</h1>
          <h2 className="text-xl mb-5 text-center">
            {useElapsedTimeSince(targetDate)}
          </h2>
          <p className="text-center text-sm px-.5 font-medium text-black/60">
            Faltam {daysUntilSunday >= 3 ? 'apenas ' : ''} <b>{daysUntilSunday}</b> dias para o próximo domingo
          </p>
        </section>
        
        <CarouselSpacing />
        
        <div className="flex items-center flex-col mt-5">
          <h1 className="font-bold text-lg">
            Sabe o quanto tudo isso é incrível?
          </h1>
          <p className="text-sm font-medium text-black/50">
            Vamos fazer uma leve comparação
          </p>
        </div>

        <Carousel className="w-full max-w-xs mx-auto mt-4">
          <CarouselContent>
            {equivalences.map((eq, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-lg font-semibold mb-2">{eq.title}</h3>
                    <p className="text-3xl font-bold mb-2">
                      {Math.floor(eq.value).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {eq.equivalent}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
        
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Presente de Aniversário 🎉✨</h2>
          {isBirthday ? (
            <div className="text-center text-lg font-bold text-green-500 mt-4">
              Feliz Aniversário! 🎉✨ Aqui está seu presente especial!
            </div>
          ) : (
            <p className="text-center text-sm text-black/60 relative">
              Faltam <b>{daysUntilBirthday}</b> dias para o seu aniversário!
              <p className="absolute right-0 w-full bottom-[11px] text-rose-900 font-medium z-20">carregando seu presente...</p>
              <Skeleton className="h-10 w-[250px] mt-2 bg-rose-100" />
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2"><b>obs: </b>Volte no dia para receber seu presente</p>
        </div>
      </section>
    </div>
  );
}
