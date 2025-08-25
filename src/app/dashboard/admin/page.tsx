/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Package,
  Users,
  Clock,
  CheckCircle,
  Eye,
  Search,
  Filter,
  UserCheck,
  UserX,
  Edit,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Parcel, ParcelStatus, User } from "@/type";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useGetAllParcelsQuery } from "@/redux/api/parcelApi";
import {
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} from "@/redux/api/userApi";
import { initializeAuth } from "@/redux/slices/authSlice";
import ParcelDetailsModal from "../ParcelDetailsModal";
import UpdateStatusForm from "../UpdateStatusForm";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [parcelStatusFilter, setParcelStatusFilter] = useState<
    string | undefined
  >(undefined);

  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [parcelSearchTerm, setParcelSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [updateParcelModalOpen, setUpdateParcelModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    data: parcelsData,
    isLoading: parcelsLoading,
    refetch: refetchParcels,
  } = useGetAllParcelsQuery(parcelStatusFilter || undefined);
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({
    role: userRoleFilter === "all" ? undefined : userRoleFilter,
  });

  const [toggleUserStatus] = useToggleUserStatusMutation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const parcels = (parcelsData?.parcels as any as Parcel[]) || [];
  const users = (usersData?.users as any as User[]) || [];
  // console.log("parcels admin", parcels);

  // Filter parcels based on search term
  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.trackingId
        ?.toLowerCase()
        .includes(parcelSearchTerm.toLowerCase()) ||
      parcel.sender?.name
        ?.toLowerCase()
        .includes(parcelSearchTerm.toLowerCase()) ||
      parcel.receiver?.name
        ?.toLowerCase()
        .includes(parcelSearchTerm.toLowerCase())
  );

  // Filter users based on search term

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );
  // console.log("filteredUsers", filteredUsers)

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

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: boolean
  ) => {
    try {
      await toggleUserStatus(userId).unwrap();
      toast.success(
        `User ${currentStatus ? "blocked" : "activated"} successfully`
      );
      refetchUsers();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update user status");
    }
  };

  // Dashboard stats
  const parcelStats = {
    total: parcels.length,
    delivered: parcels.filter((p) => p.currentStatus === "delivered").length,
    inTransit: parcels.filter((p) =>
      ["dispatched", "in-transit"].includes(p.currentStatus)
    ).length,
    pending: parcels.filter((p) =>
      ["requested", "approved"].includes(p.currentStatus)
    ).length,
  };

  const userStats = {
    total: users.length,
    senders: users.filter((u) => u.role === "sender").length,
    receivers: users.filter((u) => u.role === "receiver").length,
    active: users.filter((u) => u.isActive).length,
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center  min-h-screen">
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage parcels and users from here
              </p>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="parcels">Parcels</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {/* Parcel Stats */}
                {[
                  {
                    title: "Total Parcels",
                    value: parcelStats.total,
                    icon: Package,
                    color: "blue",
                  },
                  {
                    title: "Delivered",
                    value: parcelStats.delivered,
                    icon: CheckCircle,
                    color: "green",
                  },
                  {
                    title: "In Transit",
                    value: parcelStats.inTransit,
                    icon: Clock,
                    color: "yellow",
                  },
                  {
                    title: "Pending",
                    value: parcelStats.pending,
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {/* User Stats */}
                {[
                  {
                    title: "Total Users",
                    value: userStats.total,
                    icon: Users,
                    color: "blue",
                  },
                  {
                    title: "Senders",
                    value: userStats.senders,
                    icon: UserCheck,
                    color: "green",
                  },
                  {
                    title: "Receivers",
                    value: userStats.receivers,
                    icon: UserCheck,
                    color: "purple",
                  },
                  {
                    title: "Active Users",
                    value: userStats.active,
                    icon: Users,
                    color: "orange",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 4) * 0.1 }}
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
              </motion.div>
            </TabsContent>

            {/* Parcels Tab */}
            <TabsContent value="parcels" className="space-y-6">
              {/* Filters and Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search parcels by tracking ID, sender, or receiver..."
                            value={parcelSearchTerm}
                            onChange={(e) =>
                              setParcelSearchTerm(e.target.value)
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={parcelStatusFilter}
                          onValueChange={setParcelStatusFilter}
                        >
                          <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="All Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="requested">Requested</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="dispatched">
                              Dispatched
                            </SelectItem>
                            <SelectItem value="in-transit">
                              In Transit
                            </SelectItem>
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
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>All Parcels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {parcelsLoading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : filteredParcels.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No Parcels Found
                        </h3>
                        <p className="text-gray-600">
                          {parcelSearchTerm || parcelStatusFilter
                            ? "No parcels match your search criteria."
                            : "No parcels in the system yet."}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tracking ID</TableHead>
                              <TableHead>Sender</TableHead>
                              <TableHead>Receiver</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Fee</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
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
                                      {parcel.sender.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {parcel.sender.email}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">
                                      {parcel.receiver?.name || "—"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {parcel.receiver?.email || "—"}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={getStatusColor(
                                      parcel.currentStatus
                                    )}
                                  >
                                    {formatStatus(parcel.currentStatus)}
                                  </Badge>
                                </TableCell>
                                <TableCell>৳{parcel.fee}</TableCell>
                                <TableCell>
                                  {new Date(
                                    parcel.createdAt
                                  ).toLocaleDateString()}
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
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedParcel(parcel);
                                        setUpdateParcelModalOpen(true);
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
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
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              {/* Filters and Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search users by name or email..."
                            value={userSearchTerm}
                            onChange={(e) => setUserSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={userRoleFilter}
                          onValueChange={setUserRoleFilter}
                        >
                          <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="All Roles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="sender">Sender</SelectItem>
                            <SelectItem value="receiver">Receiver</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Users Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>All Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {usersLoading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No Users Found
                        </h3>
                        <p className="text-gray-600">
                          {userSearchTerm || userRoleFilter
                            ? "No users match your search criteria."
                            : "No users in the system yet."}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Phone</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Joined</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers.map((userData, index) => (
                              <TableRow
                                key={userData._id || index}
                                className="hover:bg-gray-50"
                              >
                                <TableCell className="font-medium">
                                  {userData.name}
                                </TableCell>
                                <TableCell>{userData.email}</TableCell>
                                <TableCell>{userData.phone}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {userData.role}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={
                                      userData.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {userData.isActive ? "Active" : "Blocked"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {new Date(
                                    userData.createdAt
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleToggleUserStatus(
                                        userData._id,
                                        userData.isActive
                                      )
                                    }
                                    className={
                                      userData.isActive
                                        ? "text-red-600 hover:text-red-700"
                                        : "text-green-600 hover:text-green-700"
                                    }
                                  >
                                    {userData.isActive ? (
                                      <UserX className="h-4 w-4" />
                                    ) : (
                                      <UserCheck className="h-4 w-4" />
                                    )}
                                  </Button>
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
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Parcel Details Modal */}
      {selectedParcel && !updateParcelModalOpen && (
        <ParcelDetailsModal
          parcel={selectedParcel}
          isOpen={!!selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}

      {/* Update Status Modal */}
      {selectedParcel && updateParcelModalOpen && (
        <Dialog
          open={updateParcelModalOpen}
          onOpenChange={setUpdateParcelModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Parcel Status</DialogTitle>
            </DialogHeader>
            <UpdateStatusForm
              parcel={selectedParcel}
              onSuccess={() => {
                setUpdateParcelModalOpen(false);
                setSelectedParcel(null);
                refetchParcels();
              }}
              onCancel={() => {
                setUpdateParcelModalOpen(false);
                setSelectedParcel(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
