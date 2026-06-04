// Profile Page
// User profile management and settings

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes, FaStore, FaUserCircle, FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });
  
  // Password form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!profileData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);

    try {
      const response = await api.put('/auth/profile', {
        name: profileData.name,
        email: profileData.email,
      });

      // Update local user state
      updateUser(response.user || response.data);
      
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!passwordData.currentPassword) {
      toast.error('Current password is required');
      return;
    }

    if (!passwordData.newPassword) {
      toast.error('New password is required');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit profile
  const handleCancelEdit = () => {
    setProfileData({
      name: user.name || '',
      email: user.email || '',
    });
    setIsEditingProfile(false);
  };

  // Cancel change password
  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
        <p className="text-sm md:text-base text-gray-600">Manage your account settings</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Avatar */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 md:p-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <FaUserCircle className="text-5xl md:text-6xl text-blue-500" />
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">{user?.name}</h2>
                <p className="text-blue-100 mt-1 flex items-center gap-2">
                  <FaEnvelope className="text-sm" />
                  {user?.email}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 backdrop-blur-sm">
                    <FaStore className="mr-1" />
                    {user?.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Profile Information
              </h3>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditingProfile ? (
              // Display Mode
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="w-32 font-semibold text-gray-600">Name:</div>
                  <div className="flex-1 text-gray-900">{user?.name}</div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="w-32 font-semibold text-gray-600">Email:</div>
                  <div className="flex-1 text-gray-900">{user?.email}</div>
                </div>
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <div className="w-32 font-semibold text-gray-600">Role:</div>
                  <div className="flex-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                      {user?.role === 'admin' ? 'Administrator' : 'User'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                  >
                    <FaTimes className="inline mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaKey className="text-blue-500" />
              Change Password
            </h3>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <FaLock />
                Change Password
              </button>
            )}
          </div>

          {!isChangingPassword ? (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-600">
                Password is encrypted and secure. Click "Change Password" to update your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter new password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                  required
                />
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || (passwordData.newPassword && passwordData.newPassword !== passwordData.confirmPassword)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelPassword}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                >
                  <FaTimes className="inline mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaStore className="text-blue-500" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="text-sm text-gray-600 mb-1">Account Type</div>
              <div className="text-lg font-bold text-gray-900">
                {user?.role === 'admin' ? 'Administrator Account' : 'User Account'}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="text-sm text-gray-600 mb-1">Account Status</div>
              <div className="text-lg font-bold text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
