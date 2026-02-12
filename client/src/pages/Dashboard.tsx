import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface Stats {
  totalRevenue: number;
  pendingJobs: number;
  completedJobs: number;
  totalCustomers: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    pendingJobs: 0,
    completedJobs: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard statistics
    const fetchStats = async () => {
      try {
        const mockStats: Stats = {
          totalRevenue: 25840,
          pendingJobs: 12,
          completedJobs: 34,
          totalCustomers: 86
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm text-gray-500">
            Here's an overview of your business today.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold mt-2 text-gray-900">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    12.5% increase
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Jobs */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Jobs
                </p>
                <p className="text-2xl font-bold mt-2 text-gray-900">
                  {stats.pendingJobs}
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 mr-1 text-amber-600" />
                  <span className="text-sm font-medium text-amber-600">
                    Requires attention
                  </span>
                </div>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Jobs */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed Jobs
                </p>
                <p className="text-2xl font-bold mt-2 text-gray-900">
                  {stats.completedJobs}
                </p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    85% success rate
                  </span>
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Customers
                </p>
                <p className="text-2xl font-bold mt-2 text-gray-900">
                  {stats.totalCustomers}
                </p>
                <div className="flex items-center mt-2">
                  <Users className="w-4 h-4 mr-1 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">
                    3 new this week
                  </span>
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Job Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg mr-4">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    New job created
                  </p>
                  <p className="text-sm text-gray-500">
                    iPhone 14 Pro Max repair scheduled for tomorrow
                  </p>
                  <p className="text-xs text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-50 p-2 rounded-lg mr-4">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Job completed
                  </p>
                  <p className="text-sm text-gray-500">
                    MacBook Pro battery replacement finished
                  </p>
                  <p className="text-xs text-gray-400">
                    5 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-red-50 p-2 rounded-lg mr-4">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Payment failed
                  </p>
                  <p className="text-sm text-gray-500">
                    Customer payment declined for Samsung Galaxy S22
                  </p>
                  <p className="text-xs text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Status Chart */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Job Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bars */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Pending</span>
                  <span className="text-sm text-gray-500">{stats.pendingJobs}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div 
                    className="h-full bg-amber-500 rounded-full" 
                    style={{ width: `${(stats.pendingJobs / (stats.pendingJobs + stats.completedJobs)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Completed</span>
                  <span className="text-sm text-gray-500">{stats.completedJobs}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${(stats.completedJobs / (stats.pendingJobs + stats.completedJobs)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3 text-gray-500">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link 
                    to="/jobs" 
                    className="flex items-center p-3 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-900"
                  >
                    <Activity className="w-5 h-5 mr-3" />
                    View all jobs
                  </Link>
                  <Link 
                    to="/customers" 
                    className="flex items-center p-3 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-900"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    Manage customers
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
