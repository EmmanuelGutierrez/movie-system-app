import { useEffect, useState } from "react";

export function useDotsLoading(baseText: string, interval = 500) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval]);
  return `${baseText}${dots}`;
}
