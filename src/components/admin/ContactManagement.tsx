import React from 'react';
import axios from 'axios';
import authService from '@/services/authService';

interface ContactItem {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  createdAt: string;
}

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = React.useState<ContactItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchContacts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = authService.getToken();
      const res = await axios.get('/api/contact', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setContacts(res.data.contacts || []);
    } catch (e) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Client Contacts</h2>
        <button
          onClick={fetchContacts}
          className="px-3 py-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white"
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <div className="p-6">Loading...</div>
      ) : error ? (
        <div className="p-6 text-red-600 text-sm">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-sm truncate">{c.message || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-center text-sm text-gray-500" colSpan={5}>No contacts yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;