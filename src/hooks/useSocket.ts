import { getCookie } from "@/lib/getCookie";
import { useEffect, useState } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export function useSocket(url: string,opts?:Partial<ManagerOptions & SocketOptions>) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const authToken = getCookie("auth_token");
  useEffect(() => {
    const socketInstance = io(url, {
      //   withCredentials: true,
      auth: { token: authToken },extraHeaders:{
        'Authorization':`bearer ${authToken}`,
      },
      transports: ["websocket"],
      ...opts,
    });
    socketInstance.on("connect", () => {
      console.log(`Connected to socket: ${socketInstance.id}`);
      setConnected(true);
    });
    socketInstance.on("disconnect", () => {
      console.log(`Disconnected from socket: ${socketInstance.id}`);
      setConnected(false);
    });
    socketInstance.on("connect_error", (e) => {
      console.log(`Error from socket: ${socketInstance.id} `);
      console.log(e);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [url, authToken,opts]);

  return { socket, connected };
}
