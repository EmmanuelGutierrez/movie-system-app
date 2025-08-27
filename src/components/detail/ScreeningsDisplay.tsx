"use client";

import { useState, useMemo } from "react";
import { RockingChairIcon as Chair } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  formatHour,
  getDayName,
  getShortDay,
  isSameDay,
  isToday,
} from "@/lib/dateFormat";
import { Screening } from "@/common/types/api-types";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/hooks/useAppStore";
import { useAuthStore } from "@/hooks/useAuthStore";

export default function ScreeningDisplay({
  screenings,
}: {
  screenings: Screening[];
}) {
  const router = useRouter();
  const appStore = useAppStore((state) => state);
  const authStore = useAuthStore((state) => state);
  const uniqueDates = useMemo(() => {
    const dates = new Set<string>();
    screenings.forEach((screening) => {
      const date = new Date(screening.startTime * 1000).toString();
      console.log("DATE", date);
      dates.add(date);
    });
    console.log("uniqueDates", dates);
    return Array.from(dates).sort();
  }, [screenings]);

  const defaultSelectedDate = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const closestDate = uniqueDates.find((dateStr) => {
      const date = new Date(dateStr);
      return date >= todayStart;
    });
    return closestDate || uniqueDates[0];
  }, [uniqueDates]);

  const [selectedDate, setSelectedDate] = useState<string>(defaultSelectedDate);

  const filteredScreeningScreenings = useMemo(() => {
    return screenings
      .filter((screening) => {
        const screeningDate = new Date(screening.startTime * 1000);
        return isSameDay(new Date(selectedDate), screeningDate);
      })
      .sort((a, b) => a.startTime - b.startTime);
  }, [screenings, selectedDate]);

  const theaterName =
    screenings.length > 0 ? screenings[0].theater.name : "Cine Principal";

  const handleButton = (screeningId: number) => () => {
    if (appStore && authStore) {
      if (authStore.user) {
        router.push(`/screening/${screeningId}`);
      } else {
        appStore.toggleShowLoginForm();
      }
    }
    return;
  };

  return (
    <div className=" text-white p-6  font-sans max-w-full">
      <h1 className="text-3xl font-bold mb-6">HORARIOS</h1>

      <ToggleGroup
        type="single"
        value={selectedDate}
        onValueChange={(value) => value && setSelectedDate(value)}
        className="grid grid-cols-3 md:flex gap-4 mb-8 max-w-full w-full overflow-hidden"
      >
        {uniqueDates.map((dateStr) => {
          const date = new Date(dateStr);
          const isTodayDate = isToday(date);
          const dayName = isTodayDate ? "HOY" : getDayName(date);
          const formattedDate = getShortDay(date);

          return (
            <ToggleGroupItem
              key={dateStr}
              value={dateStr}
              aria-label={`Seleccionar ${dayName} ${formattedDate}`}
              className={`
                flex flex-col  items-center justify-around px-3 py-2 rounded-md
                ${selectedDate === dateStr ? "bg-colors-primary-clear text-black" : "bg-colors-primary text-white hover:bg-colors-primary-light/30"}
                data-[state=on]:bg-colors-primary-clear data-[state=on]:text-black w-full h-20 gap-0
              `}
            >
              <span className="font-bold text-lg">{dayName}</span>
              <span className="text-sm ">{formattedDate}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      {/* Seat Availability Legend */}
      {/* <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">DISPONIBILIDAD DE BUTACAS</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Chair className="w-4 h-4 fill-green-500 text-green-500" />
            <span>Alta</span>
          </div>
          <div className="flex items-center gap-1">
            <Chair className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>Media</span>
          </div>
          <div className="flex items-center gap-1">
            <Chair className="w-4 h-4 fill-red-500 text-red-500" />
            <span>Baja</span>
          </div>
          <div className="flex items-center gap-1">
            <Chair className="w-4 h-4 fill-gray-500 text-gray-500" />
            <span>Completa</span>
          </div>
        </div>
      </div> */}

      {/* Theater Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">CINE PRINCIPAL</h2>
        <h3 className="text-2xl font-bold text-red-500">{theaterName}</h3>
      </div>

      {/*Screening List */}
      <div className="flex gap-4">
        {filteredScreeningScreenings.length > 0 ? (
          filteredScreeningScreenings.map((screening) => (
            <Button
              onClick={handleButton(screening.id)}
              key={screening.id}
              className="flex flex-col items-center justify-center py-7 px-4 rounded-md bg-colors-primary text-white border-colors-primary-clear hover:bg-colors-primary-light/30  h-auto w-auto"
            >
              <span className="text-xl font-semibold">
                {formatHour(new Date(screening.startTime * 1000))} hs
              </span>
              <span className="text-sm ">
                hasta {formatHour(new Date(screening.endTime * 1000))} hs
              </span>
              <div className="mt-2">
                {/* <Chair
                  className={`w-5 h-5 ${getSeatAvailabilityColor(screening.seatAvailability)}`}
                /> */}
                <Chair className={`w-5 h-5 `} />
              </div>
            </Button>
          ))
        ) : (
          <p className="col-span-full text-neutral-400">
            No hay funciones disponibles para esta fecha.
          </p>
        )}
      </div>
    </div>
  );
}
