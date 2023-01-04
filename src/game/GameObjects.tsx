import bird from './image.png';

export interface IGameObject {
    x: number;
    y: number;
    vx: number;
    vy: number;
    draw(ctx: CanvasRenderingContext2D, frame: number): void;
    needDraw(ctx: CanvasRenderingContext2D): boolean
}

interface ICircle extends IGameObject {
    radius: number;
    color: string;
}

interface IRect extends IGameObject {
    width: number;
    height: number
    color: string;
}

class Circle implements ICircle {

    x = 100;
    y = 100;
    vx = 0;
    vy = 0;
    radius = 25;
    color = 'blue';

    constructor(x: number = 0, y: number = 0, radius: number = 25) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D, frame: number) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    needDraw(ctx: CanvasRenderingContext2D) {
        return (this.x + this.radius >= 0 && this.x < ctx.canvas.width && this.y >= 0 && this.y < ctx.canvas.height)
    }

    update(): void {
        this.vx *= 0.9
        this.vy *= 0.9
        this.x += this.vx
        this.y += this.vy + 3
    }
}

export class Rect implements IRect {

    x; y; width; height; vx = 0; vy = 0; color = 'green';

    public startX = 0;

    constructor(x: number = 0, y: number = 0, width: number = 0, height = 0) {
        this.startX = this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    needDraw(ctx: CanvasRenderingContext2D) {
        return (this.x + this.width >= 0 && this.x < ctx.canvas.width && this.y >= 0 && this.y < ctx.canvas.height)
    }
}


export class Sprite extends Circle {
    image; xPos; yPos; frameCount; frameWidth; frameHeight; numFrames; numRows; framesInRow

    constructor(x: number = 0, y: number = 0, radius: number = 33) {
        super(x, y, radius)

        this.image = new Image();
        this.image.src = bird;
        this.xPos = 0
        this.yPos = 0
        this.frameCount = 0
        this.frameWidth = 100;
        this.frameHeight = 67;
        this.numFrames = 8;
        this.numRows = 2;
        this.framesInRow = this.numFrames / this.numRows;
    }

    init() {
        this.y = 300;
        this.x = 100;
    }

    draw(ctx: CanvasRenderingContext2D, frame: number) {

        if (!this.needDraw(ctx))
            return;


        if (frame % 10 == 0) {
            this.frameCount++;
        }

        let frameIndex = this.frameCount % this.numFrames
        this.xPos = frameIndex % this.framesInRow * this.frameWidth
        this.yPos = Math.floor(frameIndex / this.framesInRow) * this.frameHeight
        ctx.drawImage(this.image, this.xPos, this.yPos, this.frameWidth, this.frameHeight, this.x - this.frameWidth / 2, this.y - this.frameHeight / 2, this.frameWidth, this.frameHeight)

        //super.draw(ctx, frame)
    }
}