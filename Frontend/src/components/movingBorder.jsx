import React from 'react'

export default function movingBorder() {
  return (
<div
  className="relative h-max w-full p-5 rounded-2xl flex justify-center items-center flex-wrap 
  bg-slate-900 border border-transparent 
  [background:linear-gradient(45deg,#1e1b4b,#312e81)_padding-box,conic-gradient(from_var(--border-angle),#9333ea_0%,#a855f7_20%,#ec4899_40%,#9333ea_60%,#a855f7_80%,#ec4899_100%)_border-box]
  animate-border-rotate"
>
  {/* Your form inside */}
</div>  )
}

