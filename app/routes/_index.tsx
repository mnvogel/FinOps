import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "FinOps Cost Tracking Platform" },
    { name: "description", content: "Track and manage your infrastructure costs across multiple cloud providers" },
  ];
};

export default function Index() {
  // Use client-side only rendering for any dynamic content
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-define the current year to avoid hydration mismatch
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">FinOps Cost Tracking Platform</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Welcome to the FinOps Cost Tracking Platform</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Track and manage your infrastructure costs across multiple cloud providers</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-blue-900">Cost Tracking</h3>
                  <p className="mt-2 text-sm text-blue-700">Monitor your infrastructure costs across multiple providers in one place.</p>
                  {isClient && (
                    <Link to="/dashboard" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                      View Dashboard
                    </Link>
                  )}
                  {!isClient && (
                    <span className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600">
                      View Dashboard
                    </span>
                  )}
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-green-900">Data Integration</h3>
                  <p className="mt-2 text-sm text-green-700">Connect to Azure, VMware, and other providers to import cost data.</p>
                  {isClient && (
                    <Link to="/connectors" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                      Setup Connectors
                    </Link>
                  )}
                  {!isClient && (
                    <span className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600">
                      Setup Connectors
                    </span>
                  )}
                </div>
                <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-purple-900">Resource Tagging</h3>
                  <p className="mt-2 text-sm text-purple-700">Organize resources with virtual tags for better cost allocation.</p>
                  {isClient && (
                    <Link to="/tags" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                      Manage Tags
                    </Link>
                  )}
                  {!isClient && (
                    <span className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600">
                      Manage Tags
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Getting Started</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Follow these steps to set up your FinOps platform</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">1. Connect Data Sources</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Set up connectors to your cloud providers to start importing cost data.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">2. Define Tag Structure</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Create virtual tags to organize resources by environment, project, or department.
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">3. Set Up Customers</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Add your customers and assign resources to them for accurate billing.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">4. Configure Alerts</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Set up cost thresholds and alerts to be notified of unusual spending patterns.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} FinOps Cost Tracking Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
