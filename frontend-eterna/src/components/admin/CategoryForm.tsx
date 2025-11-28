import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface Category {
  _id?: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState<Category>({
    name: '',
    description: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
  }, [id, isEdit]);

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(response.data.category);
    } catch (error: any) {
      console.error('Error fetching category:', error);
      setError(error.response?.data?.message || 'Failed to fetch category');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const url = isEdit ? `/api/categories/${id}` : '/api/categories';
      const method = isEdit ? 'put' : 'post';
      
      await axios({
        method,
        url,
        data: formData,
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/admin/categories');
    } catch (error: any) {
      console.error('Error saving category:', error);
      setSubmitError(error.response?.data?.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error</h3>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/admin/categories')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-10">
      <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg ring-1 ring-white/50 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Category' : 'Add New Category'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {isEdit ? 'Update category information' : 'Create a new product category'}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/categories')}
            className="inline-flex items-center px-4 py-2 border border-white/60 text-sm font-medium rounded-md text-gray-700 bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg ring-1 ring-white/50 p-6">
        {/* Error Message */}
        {submitError && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{submitError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white/70"
              placeholder="Enter category name"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white/70"
              placeholder="Enter category description (optional)"
            />
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white/70"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600/90 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? 'Update Category' : 'Create Category'}
              </>
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CategoryForm;
