import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Layout from "~/components/Layout";

// Mock data for reports
export const loader = async () => {
  return json({
    reports: [
      { 
        id: "monthly-cost", 
        name: "Monthly Cost Summary", 
        description: "Summary of costs across all providers by month",
        lastRun: "2023-06-07T14:30:00Z",
        schedule: "Daily",
        format: "PDF, CSV"
      },
      { 
        id: "cost-by-provider", 
        name: "Cost by Provider", 
        description: "Breakdown of costs by cloud provider",
        lastRun: "2023-06-07T12:15:00Z",
        schedule: "Weekly",
        format: "PDF, CSV, Excel"
      },
      { 
        id: "cost-by-tag", 
        name: "Cost by Tag", 
        description: "Cost allocation by resource tags",
        lastRun: "2023-06-06T10:45:00Z",
        schedule: "Weekly",
        format: "PDF, CSV"
      },
      { 
        id: "customer-billing", 
        name: "Customer Billing Report", 
        description: "Detailed billing report for each customer",
        lastRun: "2023-06-05T22:10:00Z",
        schedule: "Monthly",
        format: "PDF, CSV, Excel"
      },
      { 
        id: "resource-utilization", 
        name: "Resource Utilization", 
        description: "Analysis of resource utilization vs. cost",
        lastRun: "2023-06-04T18:30:00Z",
        schedule: "Weekly",
        format: "PDF"
      }
    ],
    recentReports: [
      {
        id: "report-001",
        name: "Monthly Cost Summary - May 2023",
        type: "monthly-cost",
        generated: "2023-06-01T10:15:00Z",
        size: "1.2 MB",
        format: "PDF"
      },
      {
        id: "report-002",
        name: "Cost by Provider - Week 22",
        type: "cost-by-provider",
        generated: "2023-06-04T14:30:00Z",
        size: "845 KB",
        format: "Excel"
      },
      {
        id: "report-003",
        name: "Customer Billing - Acme Corp - May 2023",
        type: "customer-billing",
        generated: "2023-06-02T09:45:00Z",
        size: "1.5 MB",
        format: "PDF"
      }
    ]
  });
};

export default function Reports() {
  const data = useLoaderData<typeof loader>();
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("monthly-cost");

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">Generate and schedule cost reports</p>
        </div>
        <button
          onClick={() => setShowNewReportModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Report Templates */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Report Templates</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {data.reports.map((report) => (
              <li key={report.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-blue-600">{report.name}</div>
                        <div className="text-xs text-gray-500">
                          {report.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 flex flex-col items-end">
                        <div className="text-xs text-gray-500">
                          Schedule: {report.schedule}
                        </div>
                        <div className="text-xs text-gray-500">
                          Formats: {report.format}
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <button
                          type="button"
                          className="ml-2 relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => {
                            setSelectedReportType(report.id);
                            setShowNewReportModal(true);
                          }}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Reports */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {data.recentReports.map((report) => (
              <li key={report.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        {report.format === 'PDF' && (
                          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {report.format === 'Excel' && (
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {report.format === 'CSV' && (
                          <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                        <div className="text-xs text-gray-500">
                          Generated: {new Date(report.generated).toLocaleString()} • {report.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex">
                      <button
                        type="button"
                        className="ml-2 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Download</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="ml-2 relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Share</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showNewReportModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Generate Report</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Configure and generate a new report.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4">
                <div className="mb-4">
                  <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">Report Type</label>
                  <select
                    id="report-type"
                    name="report-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                  >
                    {data.reports.map((report) => (
                      <option key={report.id} value={report.id}>{report.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="time-period" className="block text-sm font-medium text-gray-700">Time Period</label>
                  <select
                    id="time-period"
                    name="time-period"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-90-days">Last 90 Days</option>
                    <option value="month-to-date">Month to Date</option>
                    <option value="last-month">Last Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700">Format</label>
                  <select
                    id="format"
                    name="format"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="schedule"
                        name="schedule"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="schedule" className="font-medium text-gray-700">Schedule this report</label>
                      <p className="text-gray-500">Set up recurring generation of this report</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  >
                    Generate
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setShowNewReportModal(false)}
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
