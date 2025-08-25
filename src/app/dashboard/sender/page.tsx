/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCancelParcelMutation,
  useGetSenderParcelsQuery,
} from "@/redux/api/parcelApi";
import { initializeAuth } from "@/redux/slices/authSlice";
import { ParcelStatus, Parcel } from "@/type";
import CreateParcelForm from "../CreateParcelForm";
import ParcelDetailsModal from "../ParcelDetailsModal";

export default function SenderDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: parcelsData,
    isLoading,
    refetch,
  } = useGetSenderParcelsQuery(statusFilter || undefined);
  const [cancelParcel] = useCancelParcelMutation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

    const parcels = (parcelsData?.parcels as any as Parcel[]) || [];

  // console.log("parcels sender", parcels);

  // Filter parcels based on search term
 const filteredParcels = parcels.filter(
  (parcel) =>
    parcel.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.receiver?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.receiver?.email?.toLowerCase().includes(searchTerm.toLowerCase())
);


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

  const handleCancelParcel = async (parcelId: string) => {
    try {
      await cancelParcel(parcelId).unwrap();
      toast.success("Parcel cancelled successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel parcel");
    }
  };

  const canCancelParcel = (status: ParcelStatus) => {
    return !["dispatched", "in-transit", "delivered", "cancelled"].includes(
      status
    );
  };

  // Dashboard stats
  const stats = {
    total: parcels.length,
    delivered: parcels.filter((p) => p.currentStatus === "delivered").length,
    inTransit: parcels.filter((p) =>
      ["dispatched", "in-transit"].includes(p.currentStatus)
    ).length,
    pending: parcels.filter((p) =>
      ["requested", "approved"].includes(p.currentStatus)
    ).length,
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Sender Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {user.name}</p>
              </div>
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Parcel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="mx-auto">Create New Parcel</DialogTitle>
                  </DialogHeader>
                  <CreateParcelForm
                    onSuccess={() => {
                      setShowCreateForm(false);
                      refetch();
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Parcels",
                  value: stats.total,
                  icon: Package,
                  color: "blue",
                },
                {
                  title: "Delivered",
                  value: stats.delivered,
                  icon: CheckCircle,
                  color: "green",
                },
                {
                  title: "In Transit",
                  value: stats.inTransit,
                  icon: Clock,
                  color: "yellow",
                },
                {
                  title: "Pending",
                  value: stats.pending,
                  icon: Clock,
                  color: "orange",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <p className="text-3xl font-bold mt-2">
                            {stat.value}
                          </p>
                        </div>
                        <div
                          className={`p-3 rounded-full bg-${stat.color}-100`}
                        >
                          <stat.icon
                            className={`h-6 w-6 text-${stat.color}-600`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by tracking ID, receiver name, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="requested">Requested</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="dispatched">Dispatched</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parcels Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Parcels Listing</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : filteredParcels.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No Parcels Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter
                        ? "No parcels match your search criteria."
                        : "You haven't created any parcels yet."}
                    </p>
                    {!searchTerm && !statusFilter && (
                      <Button onClick={() => setShowCreateForm(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Parcel
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tracking ID</TableHead>
                          <TableHead>Receiver</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParcels.map((parcel) => (
                          <TableRow
                            key={parcel._id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-mono text-sm">
                              {parcel.trackingId}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {parcel.receiver.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {parcel.receiver.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {parcel.receiverAddress}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={getStatusColor(parcel.currentStatus)}
                              >
                                {formatStatus(parcel.currentStatus)}
                              </Badge>
                            </TableCell>
                            <TableCell>৳{parcel.fee}</TableCell>
                            <TableCell>
                              {new Date(parcel.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedParcel(parcel)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {canCancelParcel(parcel.currentStatus) && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelParcel(parcel._id)
                                    }
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Parcel Details Modal */}
      {selectedParcel && (
        <ParcelDetailsModal
          parcel={selectedParcel}
          isOpen={!!selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}
    </>
  );
}
