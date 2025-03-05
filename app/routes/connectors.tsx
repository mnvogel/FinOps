import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Layout from "~/components/Layout";

// Mock data for connectors
export const loader = async () => {
  return json({
    connectors: [
      { 
        id: "azure-prod", 
        name: "Azure Production", 
        type: "azure", 
        status: "active", 
        lastSync: "2023-06-07T14:30:00Z",
        resourceCount: 156
      },
      { 
        id: "azure-dev", 
        name: "Azure Development", 
        type: "azure", 
        status: "active", 
        lastSync: "2023-06-07T12:15:00Z",
        resourceCount: 89
      },
      { 
        id: "vmware-dc1", 
        name: "VMware Datacenter 1", 
        type: "vmware", 
        status: "active", 
        lastSync: "2023-06-07T10:45:00Z",
        resourceCount: 203
      },
      { 
        id: "aws-test", 
        name: "AWS Testing", 
        type: "aws", 
        status: "error", 
        lastSync: "2023-06-06T22:10:00Z",
        resourceCount: 42,
        error: "Authentication failed"
      }
    ]
  });
};

export default function Connectors() {
  const data = useLoaderData<typeof loader>();
  const [showNewConnectorModal, setShowNewConnectorModal] = useState(false);
  const [connectorType, setConnectorType] = useState("azure");

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Connectors</h1>
          <p className="mt-1 text-sm text-gray-500">Connect to your cloud providers to import cost data</p>
        </div>
        <button
          onClick={() => setShowNewConnectorModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Connector
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data.connectors.map((connector) => (
            <li key={connector.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-md flex items-center justify-center ${
                      connector.type === 'azure' ? 'bg-blue-100' : 
                      connector.type === 'vmware' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {connector.type === 'azure' && (
                        <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.05 4.24L6.56 18.05L2 18L7.09 9.24L13.05 4.24Z" />
                          <path d="M13.75 5.33L22 19.76H6.74L16.04 17.5L13.75 5.33Z" />
                        </svg>
                      )}
                      {connector.type === 'vmware' && (
                        <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 2L2 8L6 14H18L22 8L18 2H6Z" />
                        </svg>
                      )}
                      {connector.type === 'aws' && (
                        <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.75 11.35L19.9 12.8C20.05 13.04 20.05 13.32 19.9 13.56L18.75 15.03C18.6 15.27 18.32 15.38 18.05 15.32L16.65 15.03C16.38 14.97 16.1 15.08 15.95 15.32L15.3 16.5C15.15 16.74 14.95 16.85 14.7 16.85H12.95C12.7 16.85 12.45 16.74 12.35 16.5L11.7 15.32C11.55 15.08 11.28 14.97 11 15.03L9.6 15.32C9.33 15.38 9.05 15.27 8.9 15.03L7.75 13.56C7.6 13.32 7.6 13.04 7.75 12.8L8.9 11.35C9.05 11.11 9.05 10.83 8.9 10.59L7.75 9.12C7.6 8.88 7.6 8.6 7.75 8.36L8.9 6.89C9.05 6.65 9.33 6.54 9.6 6.6L11 6.89C11.28 6.95 11.55 6.84 11.7 6.6L12.35 5.42C12.5 5.18 12.7 5.07 12.95 5.07H14.7C14.95 5.07 15.2 5.18 15.3 5.42L15.95 6.6C16.1 6.84 16.38 6.95 16.65 6.89L18.05 6.6C18.32 6.54 18.6 6.65 18.75 6.89L19.9 8.36C20.05 8.6 20.05 8.88 19.9 9.12L18.75 10.59C18.6 10.83 18.6 11.11 18.75 11.35Z" />
                          <path d="M13.83 13.3C14.89 13.3 15.75 12.44 15.75 11.38C15.75 10.32 14.89 9.46 13.83 9.46C12.77 9.46 11.91 10.32 11.91 11.38C11.91 12.44 12.77 13.3 13.83 13.3Z" />
                          <path d="M6.6 19.8C7.15 19.8 7.6 19.35 7.6 18.8C7.6 18.25 7.15 17.8 6.6 17.8C6.05 17.8 5.6 18.25 5.6 18.8C5.6 19.35 6.05 19.8 6.6 19.8Z" />
                          <path d="M5.12 16.55L4.35 17.55C4.25 17.7 4.25 17.9 4.35 18.05L5.12 19.05C5.22 19.2 5.42 19.25 5.6 19.2L6.6 19.05C6.78 19 6.95 19.1 7.05 19.25L7.5 20C7.6 20.15 7.75 20.2 7.9 20.2H9.1C9.25 20.2 9.4 20.15 9.5 20L9.95 19.25C10.05 19.1 10.22 19 10.4 19.05L11.4 19.2C11.58 19.25 11.78 19.2 11.88 19.05L12.65 18.05C12.75 17.9 12.75 17.7 12.65 17.55L11.88 16.55C11.78 16.4 11.78 16.2 11.88 16.05L12.65 15.05C12.75 14.9 12.75 14.7 12.65 14.55L11.88 13.55C11.78 13.4 11.58 13.35 11.4 13.4L10.4 13.55C10.22 13.6 10.05 13.5 9.95 13.35L9.5 12.6C9.4 12.45 9.25 12.4 9.1 12.4H7.9C7.75 12.4 7.6 12.45 7.5 12.6L7.05 13.35C6.95 13.5 6.78 13.6 6.6 13.55L5.6 13.4C5.42 13.35 5.22 13.4 5.12 13.55L4.35 14.55C4.25 14.7 4.25 14.9 4.35 15.05L5.12 16.05C5.22 16.2 5.22 16.4 5.12 16.55Z" />
                          <path d="M8.5 16.8C8.5 17.35 8.05 17.8 7.5 17.8C6.95 17.8 6.5 17.35 6.5 16.8C6.5 16.25 6.95 15.8 7.5 15.8C8.05 15.8 8.5 16.25 8.5 16.8Z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600">{connector.name}</div>
                      <div className="text-xs text-gray-500">
                        {connector.type.charAt(0).toUpperCase() + connector.type.slice(1)} • {connector.resourceCount} resources
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex flex-col items-end">
                      <div className={`text-xs font-medium ${
                        connector.status === 'active' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {connector.status === 'active' ? 'Active' : 'Error'}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last sync: {new Date(connector.lastSync).toLocaleString()}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="ml-2 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Edit</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="ml-2 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Sync</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {connector.status === 'error' && connector.error && (
                  <div className="mt-2 text-sm text-red-600">
                    Error: {connector.error}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* New Connector Modal */}
      {showNewConnectorModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Connector</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Connect to your cloud provider to import cost data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4">
                <div className="mb-4">
                  <label htmlFor="connector-name" className="block text-sm font-medium text-gray-700">Connector Name</label>
                  <input
                    type="text"
                    name="connector-name"
                    id="connector-name"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Azure Production"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="connector-type" className="block text-sm font-medium text-gray-700">Provider Type</label>
                  <select
                    id="connector-type"
                    name="connector-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={connectorType}
                    onChange={(e) => setConnectorType(e.target.value)}
                  >
                    <option value="azure">Microsoft Azure</option>
                    <option value="vmware">VMware</option>
                    <option value="aws">Amazon Web Services</option>
                    <option value="gcp">Google Cloud Platform</option>
                  </select>
                </div>

                {connectorType === 'azure' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="tenant-id" className="block text-sm font-medium text-gray-700">Tenant ID</label>
                      <input
                        type="text"
                        name="tenant-id"
                        id="tenant-id"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="client-id" className="block text-sm font-medium text-gray-700">Client ID</label>
                      <input
                        type="text"
                        name="client-id"
                        id="client-id"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="client-secret" className="block text-sm font-medium text-gray-700">Client Secret</label>
                      <input
                        type="password"
                        name="client-secret"
                        id="client-secret"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                {connectorType === 'vmware' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="vcenter-url" className="block text-sm font-medium text-gray-700">vCenter URL</label>
                      <input
                        type="text"
                        name="vcenter-url"
                        id="vcenter-url"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://vcenter.example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                {connectorType === 'aws' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="access-key" className="block text-sm font-medium text-gray-700">Access Key ID</label>
                      <input
                        type="text"
                        name="access-key"
                        id="access-key"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="secret-key" className="block text-sm font-medium text-gray-700">Secret Access Key</label>
                      <input
                        type="password"
                        name="secret-key"
                        id="secret-key"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">Default Region</label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="us-east-1"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Connector
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowNewConnectorModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
