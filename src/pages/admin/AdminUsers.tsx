import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    Shield,
    UserPlus,
    UserMinus,
    Crown,
    User,
    Settings,
    ArrowLeft,
    Mail,
    Calendar,
    Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

interface AdminUser {
    id: string;
    user_id: string;
    role: 'super_admin' | 'admin' | 'moderator';
    is_active: boolean;
    created_at: string;
    updated_at: string;
    user_email?: string;
    user_name?: string;
    last_sign_in?: string;
}

const AdminUsers = () => {
    const { user, isAdmin, adminRole } = useAuth();
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminRole, setNewAdminRole] = useState<'admin' | 'moderator'>('admin');
    const [creatingAdmin, setCreatingAdmin] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (!user || !isAdmin) {
            return;
        }
        fetchAdminUsers();
    }, [user, isAdmin]);

    const fetchAdminUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select(`
          *,
          user:auth.users!user_id(
            email,
            raw_user_meta_data,
            last_sign_in_at
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedData = data?.map(item => ({
                ...item,
                user_email: item.user?.email,
                user_name: item.user?.raw_user_meta_data?.full_name,
                last_sign_in: item.user?.last_sign_in_at
            })) || [];

            setAdminUsers(formattedData);
        } catch (error) {
            console.error('Error fetching admin users:', error);
            setMessage({ type: 'error', text: 'Failed to fetch admin users' });
        } finally {
            setLoading(false);
        }
    };

    const createAdminUser = async () => {
        if (!newAdminEmail.trim()) {
            setMessage({ type: 'error', text: 'Please enter an email address' });
            return;
        }

        setCreatingAdmin(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .rpc('create_admin_user', {
                    admin_email: newAdminEmail.trim(),
                    admin_role: newAdminRole
                });

            if (error) {
                setMessage({ type: 'error', text: error.message });
            } else {
                setMessage({ type: 'success', text: 'Admin user created successfully!' });
                setNewAdminEmail('');
                fetchAdminUsers();
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to create admin user' });
        } finally {
            setCreatingAdmin(false);
        }
    };

    const toggleAdminStatus = async (adminUserId: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('admin_users')
                .update({ is_active: !currentStatus })
                .eq('id', adminUserId);

            if (error) throw error;

            setMessage({ type: 'success', text: `Admin ${currentStatus ? 'deactivated' : 'activated'} successfully!` });
            fetchAdminUsers();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update admin status' });
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'super_admin':
                return <Crown className="h-4 w-4 text-yellow-600" />;
            case 'admin':
                return <Shield className="h-4 w-4 text-blue-600" />;
            case 'moderator':
                return <User className="h-4 w-4 text-green-600" />;
            default:
                return <User className="h-4 w-4 text-gray-600" />;
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'super_admin':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'admin':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'moderator':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (!user || !isAdmin) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/admin/dashboard"
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Back to Dashboard
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Shield className="h-6 w-6 text-blue-600" />
                            <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
                        </div>
                    </div>
                </motion.div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg mb-6 ${message.type === 'success'
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-800'
                            }`}
                    >
                        {message.text}
                    </motion.div>
                )}

                {/* Create New Admin */}
                {adminRole === 'super_admin' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
                            Create New Admin
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    value={newAdminRole}
                                    onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'moderator')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="moderator">Moderator</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={createAdminUser}
                                    disabled={creatingAdmin || !newAdminEmail.trim()}
                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {creatingAdmin ? 'Creating...' : 'Create Admin'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Admin Users List */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-blue-600" />
                            Admin Users ({adminUsers.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Activity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {adminUsers.map((adminUser) => (
                                    <motion.tr
                                        key={adminUser.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Mail className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {adminUser.user_name || 'No name'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {adminUser.user_email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getRoleIcon(adminUser.role)}
                                                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(adminUser.role)}`}>
                                                    {adminUser.role.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${adminUser.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {adminUser.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Activity className="h-4 w-4 mr-1" />
                                                {adminUser.last_sign_in
                                                    ? new Date(adminUser.last_sign_in).toLocaleDateString()
                                                    : 'Never'
                                                }
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {adminRole === 'super_admin' && adminUser.role !== 'super_admin' && (
                                                <button
                                                    onClick={() => toggleAdminStatus(adminUser.id, adminUser.is_active)}
                                                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${adminUser.is_active
                                                            ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                                            : 'text-green-700 bg-green-100 hover:bg-green-200'
                                                        }`}
                                                >
                                                    {adminUser.is_active ? (
                                                        <>
                                                            <UserMinus className="h-4 w-4 mr-1" />
                                                            Deactivate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="h-4 w-4 mr-1" />
                                                            Activate
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminUsers; 