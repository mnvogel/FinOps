import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { useState } from "react";

// Mock data for the dashboard
export const loader = async () => {
  return json({
    totalCost: 12345.67,
    costByProvider: [
      { provider: "Azure", cost: 7890.12, percentage: 63.9 },
      { provider: "VMware", cost: 3456.78, percentage: 28.0 },
      { provider: "AWS", cost: 998.77, percentage: 8.1 }
    ],
    costByEnvironment: [
      { environment: "Production", cost: 8765.43, percentage: 71.0 },
      { environment: "Development", cost: 2345.67, percentage: 19.0 },
      { environment: "Testing", cost: 1234.57, percentage: 10.0 }
    ],
    recentCosts: [
      { date: "2023-06-01", cost: 410.23 },
      { date: "2023-06-02", cost: 402.45 },
      { date: "2023-06-03", cost: 389.67 },
      { date: "2023-06-04", cost: 425.12 },
      { date: "2023-06-05", cost: 401.34 },
      { date: "2023-06-06", cost: 412.56 },
      { date: "2023-06-07", cost: 398.76 }
    ],
    alerts: [
      { id: 1, severity: "high", message: "Unusual spending detected in Production environment", date: "2023-06-07" },
      { id: 2, severity: "medium", message: "Development costs increased by 15% this month", date: "2023-06-05" },
      { id: 3, severity: "low", message: "New resources added without proper tagging", date: "2023-06-03" }
    ]
  });
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cost Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your infrastructure costs</p>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="inline-flex shadow-sm rounded-md">
          <button
            type="button"
            onClick={() => setTimeRange("7d")}
            className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
              timeRange === "7d" ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            7 days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange("30d")}
            className={`relative inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
              timeRange === "30d" ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            30 days
          </button>
          <button
            type="button"
            onClick={() => setTimeRange("90d")}
            className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
              timeRange === "90d" ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            90 days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Total Cost Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Cost (Last 30 Days)</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">${data.totalCost.toLocaleString()}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Alerts</h3>
            <div className="mt-2 max-h-48 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {data.alerts.map((alert) => (
                  <li key={alert.id} className="py-3">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full ${
                        alert.severity === "high" ? "bg-red-500" : 
                        alert.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"
                      }`}></div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cost by Provider */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Cost by Provider</h3>
            <div className="mt-5">
              <div className="space-y-6">
                {data.costByProvider.map((item) => (
                  <div key={item.provider}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{item.provider}</div>
                      <div className="text-sm font-medium text-gray-500">${item.cost.toLocaleString()} ({item.percentage}%)</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.provider === "Azure" ? "bg-blue-600" : 
                          item.provider === "VMware" ? "bg-green-600" : "bg-yellow-600"
                        }`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost by Environment */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Cost by Environment</h3>
            <div className="mt-5">
              <div className="space-y-6">
                {data.costByEnvironment.map((item) => (
                  <div key={item.environment}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{item.environment}</div>
                      <div className="text-sm font-medium text-gray-500">${item.cost.toLocaleString()} ({item.percentage}%)</div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          item.environment === "Production" ? "bg-purple-600" : 
                          item.environment === "Development" ? "bg-indigo-600" : "bg-pink-600"
                        }`} 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Cost Trends */}
        <div className="bg-white overflow-hidden shadow rounded-lg col-span-1 lg:col-span-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Daily Cost Trend</h3>
            <div className="mt-5 h-64 relative">
              {/* This is a placeholder for a chart - in a real app, you'd use a charting library */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-48">
                  <div className="flex h-full items-end justify-between">
                    {data.recentCosts.map((day, index) => (
                      <div key={day.date} className="flex flex-col items-center w-1/8">
                        <div 
                          className="bg-blue-500 w-12" 
                          style={{ 
                            height: `${(day.cost / Math.max(...data.recentCosts.map(d => d.cost))) * 100}%`,
                            opacity: 0.7 + (index / (data.recentCosts.length * 2))
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">{day.date.split('-')[2]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
