'use client';
import React, { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockNotifications } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout role="patient">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="w-3.5 h-3.5 mr-1" /> Mark All Read
            </Button>
          )}
        </div>

        <div className="space-y-1.5">
          {notifications.map(notification => (
            <Card
              key={notification.id}
              className={cn(
                'p-3 cursor-pointer transition-colors',
                !notification.read && 'border-l-2 border-l-primary-500 bg-primary-50/30'
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  notification.type === 'success' ? 'bg-emerald-50 text-emerald-500' :
                  notification.type === 'warning' ? 'bg-amber-50 text-amber-500' :
                  notification.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-primary-50 text-primary-500'
                )}>
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={cn('text-[0.8125rem] font-medium', !notification.read ? 'text-gray-900' : 'text-gray-600')}>
                      {notification.title}
                    </h3>
                    {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-[0.8125rem] text-gray-500 mt-0.5">{notification.message}</p>
                  <p className="text-[0.6875rem] text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-gray-200 mx-auto mb-2" />
            <h3 className="text-[0.9375rem] font-medium text-gray-900">No Notifications</h3>
            <p className="text-[0.8125rem] text-gray-500">You&apos;re all caught up</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
