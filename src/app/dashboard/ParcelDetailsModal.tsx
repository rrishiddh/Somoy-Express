'use client'

import { motion } from "motion/react"
import {  Package, User, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Parcel, ParcelStatus } from '@/type'

interface ParcelDetailsModalProps {
  parcel: Parcel
  isOpen: boolean
  onClose: () => void
}

export default function ParcelDetailsModal({ parcel, isOpen, onClose }: ParcelDetailsModalProps) {
  // console.log(parcel)
  const getStatusIcon = (status: ParcelStatus) => {
    switch (status) {
      case 'requested':
        return <Package className="h-4 w-4" />
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'dispatched':
        return <Truck className="h-4 w-4" />
      case 'in-transit':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />
      case 'returned':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: ParcelStatus) => {
    switch (status) {
      case 'requested':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'dispatched':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-transit':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'returned':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Parcel Details</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Status and Tracking */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-lg mb-2">Tracking ID</h3>
              <p className="font-mono text-xl text-blue-600">{parcel.trackingId}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-lg mb-2">Current Status</h3>
              <Badge className={`px-4 py-2 text-sm ${getStatusColor(parcel.currentStatus)}`}>
                {getStatusIcon(parcel.currentStatus)}
                <span className="ml-2">{formatStatus(parcel.currentStatus)}</span>
              </Badge>
            </div>
          </div>

          {/* Parcel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Sender Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{parcel.sender.name || `No Name`} </p>
                    <p className="text-sm text-gray-600">{parcel?.sender?.email}</p>
                    <p className="text-sm text-gray-600">{parcel?.sender?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">From Address</p>
                    <p className="font-medium">{parcel.senderAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Receiver Information</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{parcel.receiver.name}</p>
                    <p className="text-sm text-gray-600">{parcel.receiver.email}</p>
                    <p className="text-sm text-gray-600">{parcel.receiver.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">To Address</p>
                    <p className="font-medium">{parcel.receiverAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Package Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold capitalize">{parcel.parcelType}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{parcel.weight}kg</div>
                <p className="text-sm text-gray-600">Weight</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">৳{parcel.fee}</div>
                <p className="text-sm text-gray-600">Delivery Fee</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-semibold text-sm">{new Date(parcel.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{parcel.description}</p>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Delivery Timeline</h3>
            <div className="space-y-4">
              {parcel.statusLogs
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 relative"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {getStatusIcon(log.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-medium capitalize">
                          {formatStatus(log.status)}
                        </h4>
                        <time className="text-sm text-gray-500">
                          {formatDate(log.timestamp)}
                        </time>
                      </div>
                      {log.location && (
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {log.location}
                        </div>
                      )}
                      {log.note && (
                        <p className="text-sm text-gray-700 mb-1">{log.note}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Updated by: {log.updatedBy?.name || 'System'}
                      </p>
                    </div>
                    {index !== parcel.statusLogs.length - 1 && (
                      <div className="absolute left-5 top-10 w-px h-8 bg-gray-200"></div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}