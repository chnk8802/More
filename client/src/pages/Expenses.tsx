import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  TrendingDown,
  DollarSign,
  Calendar,
  User,
  ShoppingCart,
  Edit,
  Trash2
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

interface Expense {
  _id: string;
  category: 'sparePart' | 'party' | 'shopMaintenance' | 'other';
  name: string;
  amount: number;
  vendor: string;
  paidBy: string;
  paymentMethod: 'cash' | 'card' | 'upi' | 'online';
  notes: string;
  expenseDate: string;
  createdAt: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [methodFilter, setMethodFilter] = useState<string>('');

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, categoryFilter, methodFilter]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/expenses');
      let filteredExpenses = response.data;

      if (searchTerm) {
        filteredExpenses = filteredExpenses.filter((expense: Expense) =>
          expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.paidBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.amount.toString().includes(searchTerm)
        );
      }

      if (categoryFilter) {
        filteredExpenses = filteredExpenses.filter((expense: Expense) => expense.category === categoryFilter);
      }

      if (methodFilter) {
        filteredExpenses = filteredExpenses.filter((expense: Expense) => expense.paymentMethod === methodFilter);
      }

      setExpenses(filteredExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'sparePart':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Spare Parts</Badge>;
      case 'party':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Party</Badge>;
      case 'shopMaintenance':
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Shop Maintenance</Badge>;
      case 'other':
        return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Other</Badge>;
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
          <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
          <p className="text-gray-600 mt-1">Manage all business expenses</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          New Expense
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search by name, vendor, or amount..."
              className="pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="sparePart">Spare Parts</option>
          <option value="party">Party</option>
          <option value="shopMaintenance">Shop Maintenance</option>
          <option value="other">Other</option>
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

      {/* Expenses Table */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-gray-900">All Expenses</CardTitle>
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
                    <TableHead>Category</TableHead>
                    <TableHead>Expense Name</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid By</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Expense Date</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                        No expenses found
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenses.map((expense) => (
                      <TableRow key={expense._id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <TrendingDown className="h-4 w-4 text-gray-600" />
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(expense.category)}</TableCell>
                        <TableCell className="font-medium">{expense.name}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-gray-400" />
                          {expense.vendor}
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          ${expense.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {expense.paidBy}
                        </TableCell>
                        <TableCell>{getMethodBadge(expense.paymentMethod)}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(expense.expenseDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={expense.notes}>
                          {expense.notes}
                        </TableCell>
                        <TableCell>
                          {new Date(expense.createdAt).toLocaleDateString('en-US', {
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
                              <DropdownMenuItem className="flex items-center text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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

export default Expenses;
