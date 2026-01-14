"use client"

import React, { useState, useEffect } from 'react'
import ColorPicker from '@/components/ColorPicker'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Palette } from 'lucide-react'

function ThemeController({ jsonFormData, onUpdateFormData }) {
  const [theme, setTheme] = useState({
    backgroundColor: jsonFormData?.theme?.backgroundColor || '#ffffff',
    textColor: jsonFormData?.theme?.textColor || '#000000',
    labelColor: jsonFormData?.theme?.labelColor || '#374151',
    inputBorderColor: jsonFormData?.theme?.inputBorderColor || '#d1d5db',
    inputBgColor: jsonFormData?.theme?.inputBgColor || '#ffffff',
    buttonColor: jsonFormData?.theme?.buttonColor || '#3b82f6',
    buttonTextColor: jsonFormData?.theme?.buttonTextColor || '#ffffff',
    accentColor: jsonFormData?.theme?.accentColor || '#3b82f6',
  })

  // Sync theme state when jsonFormData changes
  useEffect(() => {
    if (jsonFormData?.theme) {
      setTheme({
        backgroundColor: jsonFormData.theme.backgroundColor || '#ffffff',
        textColor: jsonFormData.theme.textColor || '#000000',
        labelColor: jsonFormData.theme.labelColor || '#374151',
        inputBorderColor: jsonFormData.theme.inputBorderColor || '#d1d5db',
        inputBgColor: jsonFormData.theme.inputBgColor || '#ffffff',
        buttonColor: jsonFormData.theme.buttonColor || '#3b82f6',
        buttonTextColor: jsonFormData.theme.buttonTextColor || '#ffffff',
        accentColor: jsonFormData.theme.accentColor || '#3b82f6',
      })
    }
  }, [jsonFormData?.theme])

  const handleColorChange = (key, value) => {
    const updatedTheme = {
      ...theme,
      [key]: value
    }
    setTheme(updatedTheme)
    
    // Apply immediately without requiring button click
    const updatedFormData = {
      ...jsonFormData,
      theme: updatedTheme
    }
    onUpdateFormData(updatedFormData, false)
  }

  const handleApplyTheme = async () => {
    try {
      console.log('Applying theme:', theme)
      const updatedFormData = {
        ...jsonFormData,
        theme: theme
      }
      console.log('Updated form data:', updatedFormData)
      await onUpdateFormData(updatedFormData, true)
    } catch (error) {
      console.error('Theme apply error:', error)
      toast.error('Failed to apply theme')
    }
  }

  const presetThemes = [
    {
      name: 'Default',
      colors: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        labelColor: '#374151',
        inputBorderColor: '#d1d5db',
        inputBgColor: '#ffffff',
        buttonColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        accentColor: '#3b82f6',
      }
    },
    {
      name: 'Dark Mode',
      colors: {
        backgroundColor: '#1f2937',
        textColor: '#f9fafb',
        labelColor: '#e5e7eb',
        inputBorderColor: '#4b5563',
        inputBgColor: '#374151',
        buttonColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        accentColor: '#60a5fa',
      }
    },
    {
      name: 'Ocean',
      colors: {
        backgroundColor: '#e0f2fe',
        textColor: '#0c4a6e',
        labelColor: '#075985',
        inputBorderColor: '#7dd3fc',
        inputBgColor: '#ffffff',
        buttonColor: '#0284c7',
        buttonTextColor: '#ffffff',
        accentColor: '#0ea5e9',
      }
    },
    {
      name: 'Forest',
      colors: {
        backgroundColor: '#f0fdf4',
        textColor: '#14532d',
        labelColor: '#166534',
        inputBorderColor: '#86efac',
        inputBgColor: '#ffffff',
        buttonColor: '#16a34a',
        buttonTextColor: '#ffffff',
        accentColor: '#22c55e',
      }
    }
  ]

  const applyPreset = (preset) => {
    setTheme(preset.colors)
    // Apply preset immediately
    const updatedFormData = {
      ...jsonFormData,
      theme: preset.colors
    }
    onUpdateFormData(updatedFormData, false)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Theme & Colors</h2>
        </div>

        {/* Preset Themes */}
        <div>
          <h3 className="text-sm font-medium mb-3">Preset Themes</h3>
          <div className="grid grid-cols-2 gap-2">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="p-3 border rounded-lg hover:border-primary transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: preset.colors.accentColor }}
                  />
                  <span className="text-sm font-medium">{preset.name}</span>
                </div>
                <div className="flex gap-1">
                  {Object.values(preset.colors).slice(0, 5).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-3 h-3 rounded-sm border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Custom Colors */}
        <div>
          <h3 className="text-sm font-medium mb-3">Custom Colors</h3>
          
          <div className="space-y-4">
            <ColorPicker
              label="Background Color"
              value={theme.backgroundColor}
              onChange={(value) => handleColorChange('backgroundColor', value)}
            />

            <ColorPicker
              label="Text Color"
              value={theme.textColor}
              onChange={(value) => handleColorChange('textColor', value)}
            />

            <ColorPicker
              label="Label Color"
              value={theme.labelColor}
              onChange={(value) => handleColorChange('labelColor', value)}
            />

            <ColorPicker
              label="Input Border Color"
              value={theme.inputBorderColor}
              onChange={(value) => handleColorChange('inputBorderColor', value)}
            />

            <ColorPicker
              label="Input Background"
              value={theme.inputBgColor}
              onChange={(value) => handleColorChange('inputBgColor', value)}
            />

            <ColorPicker
              label="Button Background"
              value={theme.buttonColor}
              onChange={(value) => handleColorChange('buttonColor', value)}
            />

            <ColorPicker
              label="Button Text Color"
              value={theme.buttonTextColor}
              onChange={(value) => handleColorChange('buttonTextColor', value)}
            />

            <ColorPicker
              label="Accent Color"
              value={theme.accentColor}
              onChange={(value) => handleColorChange('accentColor', value)}
            />
          </div>
        </div>

        <Button 
          onClick={handleApplyTheme} 
          className="w-full"
        >
          Apply Theme
        </Button>
      </div>
    </div>
  )
}

export default ThemeController
