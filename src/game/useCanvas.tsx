import { useRef, useEffect } from 'react'

export type Update = (context: CanvasRenderingContext2D, frameCount: number) => void

const useCanvas = (update: Update) => {

  let canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {

    const canvas = canvasRef.current

    if (!canvas)
      return;

    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId: number

    function resizeCanvasToDisplaySize(ctx: CanvasRenderingContext2D) {

      const canvas = ctx.canvas;
      const { width, height } = canvas.getBoundingClientRect()

      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)
        return true
      }

      return false
    }

    const render = () => {

      if (!context)
        throw new Error("No context");

      animationFrameId = window.requestAnimationFrame(render);
      resizeCanvasToDisplaySize(context);
      frameCount++
      update(context, frameCount)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [update])

  return canvasRef
}

export { useCanvas } 