'use client'

import { useState } from 'react'
import { motion } from "motion/react";
import { MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Parcel, ParcelStatus } from '@/type'
import toast from 'react-hot-toast'
import { useUpdateParcelStatusMutation } from '@/redux/api/parcelApi';

interface UpdateStatusFormProps {
  parcel: Parcel
  onSuccess: () => void
  onCancel: () => void
}

export default function UpdateStatusForm({ parcel, onSuccess, onCancel }: UpdateStatusFormProps) {
  const [formData, setFormData] = useState({
    status: parcel.currentStatus,
    location: '',
    note: ''
  })
  
  const [updateParcelStatus, { isLoading }] = useUpdateParcelStatusMutation()

  const statusOptions: { value: ParcelStatus; label: string; description: string }[] = [
    { value: 'requested', label: 'Requested', description: 'Parcel request has been submitted' },
    { value: 'approved', label: 'Approved', description: 'Parcel request has been approved' },
    { value: 'dispatched', label: 'Dispatched', description: 'Parcel has been dispatched from origin' },
    { value: 'in-transit', label: 'In Transit', description: 'Parcel is on the way to destination' },
    { value: 'delivered', label: 'Delivered', description: 'Parcel has been delivered successfully' },
    { value: 'cancelled', label: 'Cancelled', description: 'Parcel delivery has been cancelled' },
    { value: 'returned', label: 'Returned', description: 'Parcel has been returned to sender' },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.status) {
      toast.error('Please select a status')
      return
    }

    try {
      await updateParcelStatus({
        id: parcel._id,
        status: formData.status,
        location: formData.location || undefined,
        note: formData.note || undefined
      }).unwrap()
      
      toast.success('Parcel status updated successfully!')
      onSuccess()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update parcel status')
    }
  }

  const getCurrentStatus = () => {
    return statusOptions.find(option => option.value === parcel.currentStatus)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Current Status Info */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Current Status</h4>
          <span className="text-sm text-gray-600">#{parcel.trackingId}</span>
        </div>
        <div className="text-sm">
          <p className="font-medium capitalize">{getCurrentStatus()?.label}</p>
          <p className="text-gray-600">{getCurrentStatus()?.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            New Status *
          </Label>
          <Select onValueChange={(value) => handleInputChange('status', value)} defaultValue={formData.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-600">{option.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location (Optional)
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10"
              placeholder="Enter current location of the parcel"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note" className="text-sm font-medium">
            Additional Notes (Optional)
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              className="pl-10 min-h-[100px]"
              placeholder="Add any additional information about this status update..."
            />
          </div>
        </div>

        {/* Status Change Warning */}
        {formData.status !== parcel.currentStatus && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <h4 className="font-medium text-yellow-900 mb-2">Status Change</h4>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>
                <span className="font-medium">From:</span> {getCurrentStatus()?.label}
              </p>
              <p>
                <span className="font-medium">To:</span> {statusOptions.find(s => s.value === formData.status)?.label}
              </p>
              <p className="mt-2 text-xs">
                This change will be logged and notification will be sent to both sender and receiver.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || formData.status === parcel.currentStatus}
          >
            {isLoading ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </form>

      {/* Recent Status History */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Recent Status History</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {parcel.statusLogs
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 3)
            .map((log, index) => (
              <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium capitalize">{log.status.replace('-', ' ')}</span>
                  {log.location && <span className="text-gray-600 ml-2">at {log.location}</span>}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  )
}