import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  CreditCard,
  DollarSign,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Edit
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import api from '../services/api';

interface Payment {
  _id: string;
  customerId: string;
  customerName: string;
  jobId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'online';
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  notes: string;
  createdAt: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [methodFilter, setMethodFilter] = useState<string>('');

  useEffect(() => {
    fetchPayments();
  }, [searchTerm, statusFilter, methodFilter]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/payments');
      let filteredPayments = response.data;

      if (searchTerm) {
        filteredPayments = filteredPayments.filter((payment: Payment) =>
          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.amount.toString().includes(searchTerm)
        );
      }

      if (statusFilter) {
        filteredPayments = filteredPayments.filter((payment: Payment) => payment.status === statusFilter);
      }

      if (methodFilter) {
        filteredPayments = filteredPayments.filter((payment: Payment) => payment.method === methodFilter);
      }

      setPayments(filteredPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Unknown</Badge>;
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'cash':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Cash</Badge>;
      case 'card':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Card</Badge>;
      case 'upi':
        return <Badge className="bg-purple-500 hover:bg-purple-600 text-white">UPI</Badge>;
      case 'online':
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Online</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
          <p className="text-gray-600 mt-1">Manage all financial transactions</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          New Payment
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search by customer, job ID, or amount..."
              className="pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="">All Methods</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="online">Online</option>
        </select>
      </div>

      {/* Payments Table */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-gray-900">All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((payment) => (
                      <TableRow key={payment._id} className="hover:bg-gray-50">
                        <TableCell>
                          {payment.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : payment.status === 'failed' ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {payment.customerName}
                        </TableCell>
                        <TableCell className="font-medium">{payment.jobId}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          ${payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getMethodBadge(payment.method)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={payment.notes}>
                          {payment.notes}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
