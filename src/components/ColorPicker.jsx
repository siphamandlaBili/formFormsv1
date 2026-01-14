"use client"

import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

function ColorPicker({ label, value, onChange, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button 
            className="w-full h-10 rounded-md border border-gray-300 flex items-center gap-3 px-3 hover:border-gray-400 transition-colors"
            type="button"
          >
            <div 
              className="w-6 h-6 rounded border border-gray-300" 
              style={{ backgroundColor: value || '#ffffff' }}
            />
            <span className="text-sm">{value || '#ffffff'}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={value || '#ffffff'} onChange={onChange} />
          <div className="mt-3">
            <Label htmlFor="hex-input" className="text-xs">Hex Color</Label>
            <input
              id="hex-input"
              type="text"
              value={value || '#ffffff'}
              onChange={(e) => onChange(e.target.value)}
              className="w-full mt-1 px-2 py-1 text-sm border rounded"
              placeholder="#ffffff"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ColorPicker
