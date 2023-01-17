import { useEffect } from "react";
import { Sprite } from "../GameObjects";

export const useControls = (player: Sprite, setGameState: (value: any) => void) => {

    useEffect(() => {

        const handler = (e: KeyboardEvent) => {

            if (e.key == "ArrowLeft") {
                player.vx = - 2
            }
            else if (e.key == "ArrowRight") {
                player.vx = 2
            }
            else if (e.key == "ArrowUp") {
                player.vy = - 10
            }
            else if (e.key == "ArrowDown") {
                player.vy = 2
            }
            else if (e.key == " ") {
    
                setGameState((state:string) => {
                    switch (state) {
                        case "RUN": 
                            return "PAUSE";
                        case "START": 
                            return"RUN";
                        case "PAUSE":
                            return"RUN";
                        default:
                            return "START";;
                    }
                })
               
            }
        }

        document.addEventListener("keydown", handler);
        return () => {
            console.log("useEffect remove")
            document.removeEventListener("keydown", handler)
        };
    }, []);
   
};