'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignForm } from './CampaignForm';
import { CampaignList } from './CampaignList';
import { Campaign } from './types';
import { toast } from 'react-toastify';


export default function CampaignPage() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/Whatsapp/campaign');
                const data = await response.json();
                setCampaigns(data);
            } catch (error) {
                toast.error('Failed to fetch campaigns')
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, [toast]);

    const handleCreateCampaign = async (values: any) => {
        try {
            // Simulate API call
            const response = await fetch('/api/Whatsapp/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const newCampaign = await response.json();
            setCampaigns([...campaigns, newCampaign]);
            toast.success('Campaign created successfully')
        } catch (error) {
            toast.error('Failed to create campaign',)
        }
    };

    const handleDuplicate = (id: string) => {
        const campaignToDuplicate = campaigns.find((campaign) => campaign.id === id);
        if (campaignToDuplicate) {
            const duplicatedCampaign = { ...campaignToDuplicate, id: Date.now().toString() };
            setCampaigns([...campaigns, duplicatedCampaign]);
            toast.success('Campaign duplicated successfully')
        }
    };

    const handleEdit = (id: string) => {
        // Navigate to edit page or open a modal
        console.log('Editing campaign:', id);
        toast.info(`Editing campaign with ID: ${id}`)
    };

    const handleView = (id: string) => {
        // Navigate to view page or open a modal
        console.log('Viewing campaign:', id);
        toast.info(`Viewing campaign with ID: ${id}`)
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="w-full mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Megaphone className="h-8 w-8 text-[#41b658]" />
                    <div>
                        <h1 className="text-3xl font-bold">Campaign Manager</h1>
                        <p className="text-sm text-gray-500">Create, manage, and track your marketing campaigns.</p>
                    </div>
                </div>

                <Tabs defaultValue="create" className="space-y-6">
                    <TabsList className="bg-white shadow-sm border border-gray-200 rounded-lg py-6 gap-2">
                        <TabsTrigger
                            value="create"
                            className="data-[state=active]:bg-[#41b658] data-[state=active]:text-white px-6 py-2 rounded-md transition-colors hover:bg-gray-100"
                        >
                            Create Campaign
                        </TabsTrigger>
                        <TabsTrigger
                            value="list"
                            className="data-[state=active]:bg-[#41b658] data-[state=active]:text-white px-6 py-2 rounded-md transition-colors hover:bg-gray-100"
                        >
                            My Campaigns
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="create" className="space-y-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Create a New Campaign</h2>
                            <p className="text-sm text-gray-500 mb-6">
                                Fill out the form below to create a new marketing campaign. Ensure all details are accurate before submitting.
                            </p>
                            <CampaignForm onSubmit={handleCreateCampaign} />
                        </div>
                    </TabsContent>

                    <TabsContent value="list">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-10 w-10 animate-spin text-[#41b658]" />
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6">My Campaigns</h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    Below is a list of all your marketing campaigns. You can view, edit, or duplicate them as needed.
                                </p>
                                <CampaignList
                                    campaigns={campaigns}
                                    onDuplicate={handleDuplicate}
                                    onEdit={handleEdit}
                                    onView={handleView}
                                />
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}