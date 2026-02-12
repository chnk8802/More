import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Store,
  MapPin,
  Phone,
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

interface Shop {
  _id: string;
  name: string;
  type: 'sparePart' | 'service' | 'both';
  phone: string;
  email: string;
  address: string;
  city: string;
  status: 'active' | 'inactive';
  totalParts: number;
  createdAt: string;
}

const Shops: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchShops();
  }, [searchTerm, typeFilter, statusFilter]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const response = await api.get('/shops');
      let filteredShops = response.data;

      if (searchTerm) {
        filteredShops = filteredShops.filter((shop: Shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.phone.includes(searchTerm)
        );
      }

      if (typeFilter) {
        filteredShops = filteredShops.filter((shop: Shop) => shop.type === typeFilter);
      }

      if (statusFilter) {
        filteredShops = filteredShops.filter((shop: Shop) => shop.status === statusFilter);
      }

      setShops(filteredShops);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'sparePart':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Spare Parts</Badge>;
      case 'service':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Service</Badge>;
      case 'both':
        return <Badge className="bg-purple-500 hover:bg-purple-600 text-white">Both</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Inactive
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shops</h2>
          <p className="text-gray-600 mt-1">Manage shops and inventory</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-2" />
          New Shop
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              type="text"
              placeholder="Search by name, city, or phone..."
              className="pl-10 pr-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="sparePart">Spare Parts</option>
          <option value="service">Service</option>
          <option value="both">Both</option>
        </select>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Shops Table */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-gray-900">All Shops</CardTitle>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Parts</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shops.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                        No shops found
                      </TableCell>
                    </TableRow>
                  ) : (
                    shops.map((shop) => (
                      <TableRow key={shop._id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Store className="h-4 w-4 text-gray-600" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell>{getTypeBadge(shop.type)}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {shop.phone}
                        </TableCell>
                        <TableCell>{shop.email || 'N/A'}</TableCell>
                        <TableCell className="flex items-start gap-2 max-w-xs">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                          <span className="truncate">{shop.address}</span>
                        </TableCell>
                        <TableCell>{shop.city}</TableCell>
                        <TableCell>{getStatusBadge(shop.status)}</TableCell>
                        <TableCell>{shop.totalParts}</TableCell>
                        <TableCell>
                          {new Date(shop.createdAt).toLocaleDateString('en-US', {
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

export default Shops;
