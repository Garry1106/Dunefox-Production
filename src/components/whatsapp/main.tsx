'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';

interface Message {
    id: number;
    text: string;
    timestamp: string;
    fromSelf: boolean;
  }
  
  interface User {
    id: string;
    name: string;
    message: string;
    time: string;
    alert: boolean;
    avatarUrl?: string;
  }

export default function WhatsappPage() {
    const [chats, setChats] = useState<any[]>([]);
      const [users, setUsers] = useState<User[]>([]);
      const [messages, setMessages] = useState<Record<string, Message[]>>({});
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [tempPhoneNumber, setTempPhoneNumber] = useState<string>(''); // Temporary state
      const [businessPhoneNumber, setBusinessPhoneNumber] = useState<string>('15551008641'); // Actual state
      const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
      const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
      const [isStarted, setIsStarted] = useState(false);
    
      useEffect(() => {
        if (!businessPhoneNumber) return;
    
        const fetchChats = async () => {
          try {
            const response = await fetch(`/api/data/${businessPhoneNumber}`);
            if (!response.ok) throw new Error('Failed to fetch chats');
    
            const result = await response.json();
            if (result.success) {
              const chatData = result.data;
    
              const usersData = chatData.map((chat: any) => {
                const lastInteraction = chat.messages[chat.messages.length - 1];
                const lastMessage =
                  lastInteraction?.response?.message || lastInteraction?.user?.message || '';
                const lastTime =
                  lastInteraction?.response?.timestamp || lastInteraction?.user?.timestamp || '';
    
                return {
                  id: chat.wa_id,
                  name: chat.wa_id,
                  message: lastMessage,
                  time: new Date(lastTime).toLocaleTimeString(),
                  alert: chat.alert, // Include the alert field here
                };
              });
    
              const messagesData = chatData.reduce((acc: Record<string, Message[]>, chat: any) => {
                acc[chat.wa_id] = chat.messages.flatMap((msg: any, index: number) => [
                  {
                    id: index * 2 + 1,
                    text: msg.user.message,
                    timestamp: new Date(msg.user.timestamp).toLocaleTimeString(),
                    fromSelf: true,
                  },
                  {
                    id: index * 2 + 2,
                    text: msg.response.message,
                    timestamp: new Date(msg.response.timestamp).toLocaleTimeString(),
                    fromSelf: false,
                  },
                ]);
                return acc;
              }, {});
    
              setUsers((prevUsers) => {
                if (JSON.stringify(prevUsers) !== JSON.stringify(usersData)) {
                  return usersData;
                }
                return prevUsers;
              });
    
              setMessages((prevMessages) => {
                const hasChanges = Object.keys(messagesData).some(
                  (key) => JSON.stringify(prevMessages[key]) !== JSON.stringify(messagesData[key])
                );
    
                if (hasChanges) {
                  return messagesData;
                }
    
                return prevMessages;
              });
    
              setChats(chatData);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        // Poll every 5 seconds
        const interval = setInterval(fetchChats, 3000);
    
        // Initial fetch
        fetchChats();
    
        // Clear interval on component unmount
        return () => clearInterval(interval);
      }, [businessPhoneNumber]);
    
      const updateResponseMode = async (waId: string, mode: 'manual' | 'auto') => {
        try {
          const response = await fetch('/api/update-response-mode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ waId, responseMode: mode, businessPhoneNumber }),
          });
    
          if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error updating response mode:', errorDetails);
            return;
          }
    
          console.log(`Response mode updated to ${mode} for user ${waId}`);
        } catch (error) {
          console.error('Error updating response mode:', error);
        }
      };
    
      const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (tempPhoneNumber.length < 10 || tempPhoneNumber.length > 12) {
          setPhoneNumberError(
            'Business Phone Number must be at least 10 digits and no more than 12 digits'
          );
          return;
        }
    
        setPhoneNumberError(null);
        setBusinessPhoneNumber(tempPhoneNumber); // Set validated phone number
        setIsStarted(true);
      };
    
      const handleToggleRealTime = async (isRealTime: boolean) => {
        if (selectedUserId) {
          const newMode = isRealTime ? 'manual' : 'auto';
          await updateResponseMode(selectedUserId, newMode);
        }
      };
    
      const selectedMessages = selectedUserId ? messages[selectedUserId] || [] : [];
      const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        users={users}
        onSelectUser={(id: string) => {
          console.log('Selected user waId:', id);
          setSelectedUserId(id);
        }}
        businessPhoneNumber={businessPhoneNumber}
      />
      <Chat
        messages={selectedMessages}
        userName={selectedUser ? selectedUser.name : null}
        waId={selectedUserId || ''}
        businessPhoneNumber={businessPhoneNumber}
        onToggleRealTime={handleToggleRealTime}
      />
    </div>
  )
}