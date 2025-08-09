"use client"

import { useState, useMemo } from "react"
import { RockingChairIcon as Chair } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { formatHour, getDayName, getShortDay, isSameDay, isToday } from "@/lib/dateFormat"
import { Screening } from "@/common/types/api-types"
import { useRouter } from "next/navigation"
// import { Screening } from "@/common/types/api-types"

// Define theScreening interface based on the provided structure
// interface Screening {
//   id: number
//   startTime: number // Unix timestamp in seconds
//   endTime: number // Unix timestamp in seconds
//   price: number
//   active: boolean
//   theater: {
//     id: number
//     name: string
//   }
//   // Adding a simulated seat availability for visual representation
//   seatAvailability: "high" | "medium" | "low" | "full"
// }

// Helper function to create a Unix timestamp (in seconds) from a Date object and time


// Get current date for mock data generation
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // Start of today
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const dayAfterTomorrow = new Date(today)
dayAfterTomorrow.setDate(today.getDate() + 2)
const dayPlus3 = new Date(today)
dayPlus3.setDate(today.getDate() + 3)
const dayPlus4 = new Date(today)
dayPlus4.setDate(today.getDate() + 4)

// Mock data for screenings
// const mockScreeningScreenings:Screening[] = [
//   // Today's screenings (e.g., August 3, 2025)
//   {
//     id: 1,
//     startTime: createTimestamp(today, 20, 0), // 8:00 PM
//     endTime: createTimestamp(today, 22, 0), // 10:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "high",
//   },
//   {
//     id: 2,
//     startTime: createTimestamp(today, 22, 30), // 10:30 PM
//     endTime: createTimestamp(today, 23, 59), // 11:59 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "medium",
//   },
//   // Tomorrow's screenings (e.g., August 4, 2025)
//   {
//     id: 3,
//     startTime: createTimestamp(tomorrow, 18, 0), // 6:00 PM
//     endTime: createTimestamp(tomorrow, 20, 0), // 8:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "low",
//   },
//   {
//     id: 4,
//     startTime: createTimestamp(tomorrow, 21, 0), // 9:00 PM
//     endTime: createTimestamp(tomorrow, 23, 0), // 11:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "high",
//   },
//   // Day after tomorrow (e.g., August 5, 2025)
//   {
//     id: 5,
//     startTime: createTimestamp(dayAfterTomorrow, 19, 0), // 7:00 PM
//     endTime: createTimestamp(dayAfterTomorrow, 21, 0), // 9:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "full",
//   },
//   {
//     id: 6,
//     startTime: createTimestamp(dayAfterTomorrow, 22, 0), // 10:00 PM
//     endTime: createTimestamp(dayAfterTomorrow, 23, 59), // 11:59 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "high",
//   },
//   // Day + 3 (e.g., August 6, 2025)
//   {
//     id: 7,
//     startTime: createTimestamp(dayPlus3, 17, 0), // 5:00 PM
//     endTime: createTimestamp(dayPlus3, 19, 0), // 7:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "medium",
//   },
//   // Day + 4 (e.g., August 7, 2025)
//   {
//     id: 8,
//     startTime: createTimestamp(dayPlus4, 20, 0), // 8:00 PM
//     endTime: createTimestamp(dayPlus4, 22, 0), // 10:00 PM
//     price: 2000,
//     active: true,
//     theater: { id: 1, name: "HOYTS CORDOBA PATIO OLMOS" },
//     seatAvailability: "high",
//   },
// ]

// Helper to get Tailwind CSS classes for seat availability color
// const getSeatAvailabilityColor = (availability:Screening["seatAvailability"]) => {
//   switch (availability) {
//     case "high":
//       return "fill-green-500 text-green-500"
//     case "medium":
//       return "fill-orange-500 text-orange-500"
//     case "low":
//       return "fill-red-500 text-red-500"
//     case "full":
//       return "fill-gray-500 text-gray-500"
//     default:
//       return "fill-gray-500 text-gray-500"
//   }
// }

export default function ScreeningDisplay({ screenings  }: { screenings:Screening[] }) {
  const router=useRouter()
  // Get unique dates from screenings and sort them chronologically
  const uniqueDates = useMemo(() => {
    const dates = new Set<string>()
    screenings.forEach((screening) => {
      const date = new Date(screening.startTime * 1000).toString()
      console.log("DATE",date)
      dates.add(date) // Store as YYYY-MM-DD string for easy comparison
      // dates.add(toDateString(date)) // Store as YYYY-MM-DD string for easy comparison
    })
    console.log("uniqueDates",dates)
    return Array.from(dates).sort()
  }, [screenings])

  // Determine the default selected date (closest upcoming day)
  const defaultSelectedDate = useMemo(() => {
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const closestDate = uniqueDates.find((dateStr) => {
      const date = new Date(dateStr)
      return date >= todayStart // Check if date is today or in the future
    })
    return closestDate || uniqueDates[0] // Fallback to the first date if no future date found
  }, [uniqueDates])

  const [selectedDate, setSelectedDate] = useState<string>(defaultSelectedDate)

  // Filter screenings based on the selected date and sort them by start time
  const filteredScreeningScreenings = useMemo(() => {
    return screenings
      .filter((screening) => {
        const screeningDate = new Date(screening.startTime * 1000)
        // console.log(
        //   "si same",
        //   screeningDate,
        //   "||",
        //   selectedDate,
        //   "||",
        //   new Date(selectedDate),
        //   isSameDay(new Date(selectedDate), screeningDate)
        // );
        return isSameDay(new Date(selectedDate), screeningDate)
      })
      .sort((a, b) => a.startTime - b.startTime)
  }, [screenings, selectedDate])

  // Get the theater name from the first screening, assuming all screenings are for the same theater
  const theaterName = screenings.length > 0 ? screenings[0].theater.name : "Cine Principal"

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
            onClick={()=>router.push(`/screening/available-seats/${screening.id}`)}
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
                <Chair
                  className={`w-5 h-5 `}
                />
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
