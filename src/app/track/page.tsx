"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { ParcelStatus, Parcel } from "@/type";
import { useLazyTrackParcelQuery } from "@/redux/api/parcelApi";

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackParcel, { data, isLoading, error }] = useLazyTrackParcelQuery();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    try {
      await trackParcel(trackingId.trim()).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Package not found");
    }
  };

  const getStatusIcon = (status: ParcelStatus) => {
    switch (status) {
      case "requested":
        return <Package className="h-5 w-5" />;
      case "approved":
        return <CheckCircle className="h-5 w-5" />;
      case "dispatched":
        return <Truck className="h-5 w-5" />;
      case "in-transit":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5" />;
      case "returned":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: ParcelStatus) => {
    switch (status) {
      case "requested":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "dispatched":
        return "bg-yellow-100 text-yellow-800";
      case "in-transit":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parcel = data?.parcel as Parcel;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Package
            </h1>
            <p className="text-xl text-blue-100 max-w-6xl mx-auto leading-relaxed">
              Enter your tracking ID below to get real-time updates on your
              package delivery status.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Enter Tracking ID</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleTrack}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID (e.g., TRK-20231201-ABC123)"
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    {isLoading ? (
                      "Tracking..."
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Track Package
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracking Results */}
          {parcel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Package Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Package Details</CardTitle>
                    <Badge
                      className={`px-4 py-2 text-sm font-medium ${getStatusColor(
                        parcel.currentStatus
                      )}`}
                    >
                      {getStatusIcon(parcel.currentStatus)}
                      <span className="ml-2">
                        {formatStatus(parcel.currentStatus)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Tracking ID
                        </h4>
                        <p className="text-lg font-mono">{parcel.trackingId}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Sender
                        </h4>
                        <p>{parcel.sender.name}</p>
                        <p className="text-sm text-gray-600">
                          {parcel.sender.email}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          From Address
                        </h4>
                        <p className="text-sm">{parcel.senderAddress}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Package Type
                        </h4>
                        <p className="capitalize">{parcel.parcelType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          Receiver
                        </h4>
                        <p>{parcel.receiver.name}</p>
                        <p className="text-sm text-gray-600">
                          {parcel.receiver.email}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">
                          To Address
                        </h4>
                        <p className="text-sm">{parcel.receiverAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {parcel.weight}kg
                      </p>
                      <p className="text-sm text-gray-600">Weight</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ৳{parcel.fee}
                      </p>
                      <p className="text-sm text-gray-600">Delivery Fee</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {parcel.statusLogs.length}
                      </p>
                      <p className="text-sm text-gray-600">Status Updates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.ceil(
                          (new Date().getTime() -
                            new Date(parcel.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Days Since Created
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Delivery Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[...parcel.statusLogs]
                      .sort(
                        (a, b) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime()
                      )
                      .map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                              index === 0
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {getStatusIcon(log.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-lg font-medium capitalize">
                                {formatStatus(log.status)}
                              </h4>
                              <time className="text-sm text-gray-600">
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
                              <p className="text-sm text-gray-700">
                                {log.note}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              Updated by: {log.updatedBy?.name || "System"}
                            </p>
                          </div>
                          {index !== parcel.statusLogs.length - 1 && (
                            <div className="absolute left-9 mt-10 w-px h-6 bg-gray-300"></div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* No Results */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Package Not Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find a package with that tracking ID. Please
                check the ID and try again.
              </p>
              <Button onClick={() => setTrackingId("")} variant="outline">
                Try Again
              </Button>
            </motion.div>
          )}

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  Can&apos;t find your package or having trouble with tracking?
                  Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="/contact">Contact Support</a>
                  </Button>
                  <Button asChild>
                    <a href="tel:+8801234567890">Call: +880 1234-567890</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
