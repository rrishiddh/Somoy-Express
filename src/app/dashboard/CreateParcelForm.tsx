'use client'

import { useState } from 'react'
import { motion } from "motion/react";
import { Mail, MapPin, Package, Weight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateParcelData } from '@/type'
import toast from 'react-hot-toast'
import { useCreateParcelMutation } from '@/redux/api/parcelApi';

interface CreateParcelFormProps {
  onSuccess: () => void
}

export default function CreateParcelForm({ onSuccess }: CreateParcelFormProps) {
  const [formData, setFormData] = useState<CreateParcelData>({
    receiverEmail: '',
    receiverAddress: '',
    parcelType: '',
    weight: 0,
    description: ''
  })
  
  const [createParcel, { isLoading }] = useCreateParcelMutation()

  const handleInputChange = (field: keyof CreateParcelData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateEstimatedFee = () => {
    const baseRate = 50
    const weightRate = 10
    let typeMultiplier = 1

    switch (formData.parcelType.toLowerCase()) {
      case 'fragile':
        typeMultiplier = 1.5
        break
      case 'express':
        typeMultiplier = 2
        break
      case 'document':
        typeMultiplier = 0.8
        break
      default:
        typeMultiplier = 1
    }

    return Math.round((baseRate + (formData.weight * weightRate)) * typeMultiplier)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.receiverEmail || !formData.receiverAddress || !formData.parcelType || !formData.weight || !formData.description) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.weight <= 0) {
      toast.error('Weight must be greater than 0')
      return
    }

    try {
      await createParcel(formData).unwrap()
      toast.success('Parcel created successfully!')
      onSuccess()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create parcel')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-3 overflow-y-scroll max-h-[70vh] pr-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="receiverEmail" className="text-sm font-medium">
            Receiver Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="receiverEmail"
              type="email"
              value={formData.receiverEmail}
              onChange={(e) => handleInputChange('receiverEmail', e.target.value)}
              className="pl-10"
              placeholder="receiver@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parcelType" className="text-sm font-medium">
            Parcel Type *
          </Label>
          <div className="relative">
            <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
            <Select onValueChange={(value) => handleInputChange('parcelType', value)}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select parcel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="package">Package</SelectItem>
                <SelectItem value="fragile">Fragile Item</SelectItem>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="food">Food Item</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="receiverAddress" className="text-sm font-medium">
          Delivery Address *
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="receiverAddress"
            type="text"
            value={formData.receiverAddress}
            onChange={(e) => handleInputChange('receiverAddress', e.target.value)}
            className="pl-10"
            placeholder="Enter complete delivery address"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium">
            Weight (kg) *
          </Label>
          <div className="relative">
            <Weight className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="weight"
              type="number"
              step="0.1"
              min="0.1"
              value={formData.weight || ''}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
              className="pl-10"
              placeholder="0.0"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Estimated Fee</Label>
          <div className="h-10 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center">
            <span className="text-lg font-semibold text-blue-600">
              ৳{formData.weight > 0 && formData.parcelType ? calculateEstimatedFee() : 0}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Package Description *
        </Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="pl-10 min-h-[100px]"
            placeholder="Describe the contents of your package..."
            required
          />
        </div>
      </div>

      {/* Fee Breakdown */}
      {formData.weight > 0 && formData.parcelType && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h4 className="font-medium text-blue-900 mb-3">Fee Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Rate:</span>
              <span>৳50</span>
            </div>
            <div className="flex justify-between">
              <span>Weight ({formData.weight}kg × ৳10):</span>
              <span>৳{formData.weight * 10}</span>
            </div>
            <div className="flex justify-between">
              <span>Type Multiplier ({formData.parcelType}):</span>
              <span>
                {formData.parcelType === 'fragile' ? '1.5x' :
                 formData.parcelType === 'express' ? '2.0x' :
                 formData.parcelType === 'document' ? '0.8x' : '1.0x'}
              </span>
            </div>
            <div className="border-t border-blue-300 pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>৳{calculateEstimatedFee()}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Parcel...' : 'Create Parcel'}
        </Button>
      </div>

   
    </motion.form>
  )
}