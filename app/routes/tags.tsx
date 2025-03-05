import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Layout from "~/components/Layout";

// Mock data for tags
export const loader = async () => {
  return json({
    tags: [
      { 
        id: "env", 
        name: "Environment", 
        type: "string", 
        values: ["Production", "Development", "Testing", "Staging"],
        resourceCount: 448
      },
      { 
        id: "dept", 
        name: "Department", 
        type: "string", 
        values: ["Engineering", "Marketing", "Sales", "Finance", "HR"],
        resourceCount: 356
      },
      { 
        id: "project", 
        name: "Project", 
        type: "string", 
        values: ["Website", "Mobile App", "API", "Data Warehouse", "CRM"],
        resourceCount: 289
      },
      { 
        id: "cost-center", 
        name: "Cost Center", 
        type: "string", 
        values: ["CC001", "CC002", "CC003", "CC004", "CC005"],
        resourceCount: 412
      },
      { 
        id: "owner", 
        name: "Owner", 
        type: "string", 
        values: ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams"],
        resourceCount: 267
      }
    ]
  });
};

export default function Tags() {
  const data = useLoaderData<typeof loader>();
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Tags</h1>
          <p className="mt-1 text-sm text-gray-500">Manage virtual tags to organize and allocate costs</p>
        </div>
        <button
          onClick={() => setShowNewTagModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Tag
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {data.tags.map((tag) => (
            <li key={tag.id}>
              <div 
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedTag === tag.id ? 'bg-blue-50' : ''}`}
                onClick={() => setSelectedTag(selectedTag === tag.id ? null : tag.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600">{tag.name}</div>
                      <div className="text-xs text-gray-500">
                        ID: {tag.id} • Type: {tag.type} • {tag.resourceCount} resources
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="text-xs text-gray-500">
                        {tag.values.length} values
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
                        <span className="sr-only">Delete</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedTag === tag.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tag Values</h4>
                    <div className="flex flex-wrap gap-2">
                      {tag.values.map((value) => (
                        <span key={value} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {value}
                        </span>
                      ))}
                      <button className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                        <svg className="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                          <path fillRule="evenodd" d="M4 0a1 1 0 011 1v2h2a1 1 0 110 2H5v2a1 1 0 11-2 0V5H1a1 1 0 010-2h2V1a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Value
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Resource Distribution</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {tag.values.map((value) => (
                          <div key={value} className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-purple-600 h-2.5 rounded-full" 
                                style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* New Tag Modal */}
      {showNewTagModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Tag</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Create a new tag to organize and allocate costs across resources.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4">
                <div className="mb-4">
                  <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700">Tag Name</label>
                  <input
                    type="text"
                    name="tag-name"
                    id="tag-name"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Department"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="tag-id" className="block text-sm font-medium text-gray-700">Tag ID</label>
                  <input
                    type="text"
                    name="tag-id"
                    id="tag-id"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., dept"
                  />
                  <p className="mt-1 text-xs text-gray-500">Used in reports and API calls. Cannot contain spaces.</p>
                </div>

                <div className="mb-4">
                  <label htmlFor="tag-type" className="block text-sm font-medium text-gray-700">Tag Type</label>
                  <select
                    id="tag-type"
                    name="tag-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Initial Values</label>
                  <div className="mt-1">
                    <textarea
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter values separated by commas"
                    ></textarea>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Enter comma-separated values. You can add more values later.</p>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Create Tag
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowNewTagModal(false)}
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
