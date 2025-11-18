import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Tag, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalContacts: number;
  featuredProducts: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalContacts: 0,
    featuredProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch all data in parallel
      const [productsRes, categoriesRes, contactsRes] = await Promise.all([
        axios.get('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit: 1000 }
        }),
        axios.get('/api/categories/all', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/api/contact', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const products = productsRes.data.products || [];
      const categories = categoriesRes.data.categories || [];
      const contacts = contactsRes.data.contacts || [];

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalContacts: contacts.length,
        featuredProducts: products.filter((p: any) => p.featured).length
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      name: 'Categories',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      link: '/admin/categories'
    },
    {
      name: 'WhatsApp Contacts',
      value: stats.totalContacts,
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/contacts'
    },
    {
      name: 'Featured Products',
      value: stats.featuredProducts,
      icon: TrendingUp,
      color: 'bg-orange-500',
      link: '/admin/products?featured=true'
    }
  ];

  const quickActions = [
    {
      name: 'Add New Product',
      description: 'Add a new skincare product to your catalog',
      icon: Plus,
      link: '/admin/products/add',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Add New Category',
      description: 'Create a new product category',
      icon: Tag,
      link: '/admin/categories/add',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'View All Products',
      description: 'Manage your entire product catalog',
      icon: Package,
      link: '/admin/products',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your Eterna Skincare admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {statCards.map((card) => (
          <Link
            key={card.name}
            to={card.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow h-full"
          >
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.name}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.link}
              className={`${action.color} text-white rounded-lg p-4 flex items-center justify-between transition-colors h-full`}
            >
              <div className="flex items-center">
                <action.icon className="h-5 w-5 mr-3" />
                <div>
                  <h3 className="font-medium">{action.name}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;