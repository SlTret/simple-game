import { Button } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import Canvas from './Canvas';
import { Rect, Sprite } from './GameObjects';
import { Walls } from './Walls';

export type GameState = "START" | "RUN" | "PAUSE" | "END" 

export class GameModel {
    public gameState = "START"
}

export const gameModel: GameModel = new GameModel();

const Game = () => {

    const player: Sprite = useMemo(() => new Sprite(100, 100), []);
    const walls: Walls = new Walls();
    const [gameState, setGameState] = useState<GameState>("START");

    gameModel.gameState = gameState

    document.onkeydown = ((e: KeyboardEvent) => {
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

            switch (gameState) {
                case "RUN": {
                    setGameState("PAUSE")
                    break;
                }
                case "START": {
                    setGameState("RUN")
                    break;
                }
                case "PAUSE":
                    setGameState("RUN")
                    break;
                default:
                    break;
            }
        }
    })

    const checkCollission = (topNearRect: Rect, bottomNearRect: Rect) => {
        let collision = false;
        if (topNearRect && bottomNearRect) {
            let xCollision = (player.x + player.radius) > topNearRect.x && (player.x - player.radius) < topNearRect.x + topNearRect.width;
            let yCollision = (player.y - player.radius) < topNearRect.height || (player.y + player.radius) > bottomNearRect.y;

            collision = xCollision && yCollision
        }

        if (collision) {
            player.vy = -30;
            setGameState("END");
        }
    }

    const update = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
        let gameState = gameModel.gameState;
        
        if (gameState == "START") {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            player.init();
            player.draw(ctx, frameCount);
            walls.init();
            walls.update(ctx, frameCount, player.x, 0)
        }
        if (gameState == "RUN") {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            player.update();
            player.draw(ctx, frameCount);
            const { topNearRect, bottomNearRect } = walls.update(ctx, frameCount, player.x)
            checkCollission(topNearRect, bottomNearRect)
        }
        if (gameState == "END") {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            walls.update(ctx, frameCount, player.x, 0)

            player.vy += 1;
            player.update();
            player.draw(ctx, frameCount);

            if (player.y > walls.height) {
                console.log("Game restart", gameState);
                setGameState("START")
            }
        }

    }, []);

    const handlePause = () => {
        setGameState("RUN");
    }

    return <>

        <Canvas update={update} />
        {gameState == "PAUSE" &&
            <Button variant="contained" size="large" onClick={handlePause}>pause</Button>
        }
        {gameState == "START" &&
            <Button variant="contained" size="large" onClick={handlePause}>Start</Button>
        }

    </>
};

export default Game