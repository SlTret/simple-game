import { IGameObject, Rect } from "./GameObjects";

export class Walls {
    private width = 800;
    public height = 600;
    private lastPosX = 0;
    private num = 4
    private startPosX = 300
    private walls: Rect[] = [];

    constructor() {

        for (let i = 0; i < this.num; ++i) {

            let topHeight = 50 + this.getRandomInt(250)
            let bottomHeight = this.height - topHeight - 100 - this.getRandomInt(100)

            let posX = this.startPosX + 300 * i;
            let posY = this.height - bottomHeight

            let topRect = new Rect(posX, 0, 50, topHeight);
            let bottomRect = new Rect(posX, posY, 50, bottomHeight);

            this.walls.push(topRect);
            this.walls.push(bottomRect);
        }

        this.lastPosX = this.walls[this.walls.length - 1].x
    }

    init() {
        this.walls.forEach((rect: Rect) => {
            rect.x = rect.startX;
        });
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    update(ctx: CanvasRenderingContext2D, frameCount: number, playerPosX: number, moveSpeed = -1) {
        let minDistance = this.width;
        let topNearRect: any;
        let bottomNearRect: any;

        this.walls.forEach((obj: IGameObject) => {

            if (obj instanceof Rect) {
                obj.x += moveSpeed;
                if (obj.x < -obj.width) {
                    obj.x = this.lastPosX
                }

                let distance = (obj.x - playerPosX)

                if (distance >= -obj.width && distance <= minDistance) {
                    minDistance = distance;

                    if (obj.y == 0) {
                        topNearRect = obj;
                    } else {
                        bottomNearRect = obj
                    }
                }
            }

            if (obj.needDraw(ctx)) {
                obj.draw(ctx, frameCount);
            }
        });

        return { topNearRect, bottomNearRect }
    }

}