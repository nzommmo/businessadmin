import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from '@/constants/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        navigate('/');
        return;
      }

      try {
        const response = await axiosInstance.get('/users');
        
        // Create users map with id as key and user object as value
        const usersMap = {};
        response.data.forEach(user => {
          usersMap[user.id] = user;
        });
        
        // Find the current user's ID by matching username
        const currentUserId = Object.keys(usersMap).find(
          id => usersMap[id].username === username
        );

        if (!currentUserId) {
          throw new Error('User not found');
        }

        setUserId(currentUserId);
        setCurrentEmail(usersMap[currentUserId].email);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        navigate('/');
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const handleEmailChange = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      await axiosInstance.put(`/users/${userId}`, { email: newEmail });
      setCurrentEmail(newEmail);
      setNewEmail('');
      setShowEmailModal(false);
      alert('Email updated successfully');
    } catch (error) {
      alert('Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    if (!userId) return;
    
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await axiosInstance.put(`/users/${userId}`, {
        current_password: formData.get('currentPassword'),
        new_password: formData.get('newPassword'),
      });
      alert('Password updated successfully');
      e.target.reset();
    } catch (error) {
      alert('Failed to update password');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      navigate('/');
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;
    
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      await axiosInstance.delete(`/users/${userId}`);
      handleLogout();
    } catch (error) {
      alert('Failed to delete account');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="relative sm:p-6">
        <div className="flex flex-col items-center text-start mt-20 justify-center">
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold">Account Settings</h1>
            <p className="font-normal">Email address</p>
            <div className="flex justify-between gap-10">
              <p>Your email address is <span className="font-semibold italic hover:underline">{currentEmail}</span></p>
              <button 
                className="text-CustomGold underline" 
                onClick={() => setShowEmailModal(true)}
                disabled={loading}
              >Change</button>
            </div>

            <div className="relative">
              <p className="font-normal">Password</p>
              <form onSubmit={handlePasswordChange}>
                <div className="flex lg:flex-row flex-col gap-5">
                  <div className="mt-5 flex flex-col">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" className="border rounded py-2 px-4" required />
                  </div>
                  <div className="mt-5 flex flex-col">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" className="border rounded py-2 px-4" required />
                  </div>
                </div>
                <div>
                  <p className="my-5">Can't remember your password? <span className="cursor-pointer underline">Reset your password</span></p>
                  <button type="submit" className="bg-white text-black p-2 rounded hover:bg-CustomGold hover:text-white">Save Password</button>
                </div>
              </form>
              
              <div className="pt-10">
                <hr className="opacity-25 pb-10" />
                <div>
                  <h1 className="font-semibold pb-5">Delete Account</h1>
                  <div className="flex flex-col gap-1">
                    <p>Would you like to delete your account?</p>
                    <p>Deleting your account will remove all content associated with it.</p>
                  </div>
                  <div className="py-5">
                    <button onClick={handleDeleteAccount} className="bg-white text-black p-2 rounded hover:bg-red-600 hover:text-white">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="email"
              placeholder="Enter new email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailModal(false)} disabled={loading}>Cancel</Button>
            <Button onClick={handleEmailChange} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;