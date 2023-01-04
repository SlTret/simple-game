import React, { memo } from 'react'
import {Update, useCanvas} from './useCanvas'

interface CanvasProps extends React.HTMLProps<HTMLCanvasElement> {
    update: Update
} 

const Canvas = (props:CanvasProps) => {  
  
  const { update, ...rest } = props
  const canvasRef = useCanvas(update)
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default memo(Canvas);