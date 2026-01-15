"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Shield, XCircle, Calendar } from "lucide-react"

function FormSettings({ formSettings, onUpdateSettings }) {
  const handleToggleAuth = (checked) => {
    onUpdateSettings({
      ...formSettings,
      requireAuth: checked
    })
  }

  const handleToggleAcceptResponses = (checked) => {
    onUpdateSettings({
      ...formSettings,
      acceptResponses: checked
    })
  }

  const handleCloseDateChange = (e) => {
    onUpdateSettings({
      ...formSettings,
      closeDate: e.target.value || null
    })
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Form Settings</h2>
        </div>

        <Separator />

        {/* Accept Responses Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="accept-responses" className="text-base font-medium">
                Accept Responses
              </Label>
              <p className="text-sm text-gray-500">
                Allow or stop accepting new form submissions
              </p>
            </div>
            <Switch
              id="accept-responses"
              checked={formSettings?.acceptResponses !== false}
              onCheckedChange={handleToggleAcceptResponses}
            />
          </div>
        </div>

        <Separator />

        {/* Close Date */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="close-date" className="text-base font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Close Form On
            </Label>
            <p className="text-sm text-gray-500">
              Automatically stop accepting responses after this date
            </p>
            <Input
              id="close-date"
              type="datetime-local"
              value={formSettings?.closeDate || ''}
              onChange={handleCloseDateChange}
              className="w-full"
            />
            {formSettings?.closeDate && (
              <p className="text-xs text-gray-500">
                Form will close on {new Date(formSettings.closeDate).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Require Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="require-auth" className="text-base font-medium">
                Require Authentication
              </Label>
              <p className="text-sm text-gray-500">
                Respondents must sign in to submit this form
              </p>
            </div>
            <Switch
              id="require-auth"
              checked={formSettings?.requireAuth || false}
              onCheckedChange={handleToggleAuth}
            />
          </div>
        </div>

        <Separator />

        {/* Info Messages */}
        {!formSettings?.acceptResponses && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-800">
                <strong>Form is closed.</strong> New responses will not be accepted until you enable "Accept Responses".
              </p>
            </div>
          </div>
        )}

        {formSettings?.requireAuth && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> When authentication is required, respondents will be asked to sign in with their email before they can submit the form.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormSettings
