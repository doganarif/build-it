'use client';

import { useState, useEffect } from 'react';
import { getCronJobs, getCronJobRuns, executeJob } from '@/app/actions';

export default function CronJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [jobRuns, setJobRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [executeLoading, setExecuteLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [executeResult, setExecuteResult] = useState(null);

  // Load jobs and recent runs
  useEffect(() => {
    async function loadData() {
      try {
        const [jobsResult, runsResult] = await Promise.all([
          getCronJobs(),
          getCronJobRuns({ limit: 20 })
        ]);
        
        if (jobsResult.success) {
          setJobs(jobsResult.jobs);
        }
        
        if (runsResult.success) {
          setJobRuns(runsResult.jobRuns);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // Execute a job manually
  async function handleExecuteJob(jobName) {
    setExecuteLoading(true);
    setSelectedJob(jobName);
    setExecuteResult(null);
    
    try {
      const result = await executeJob({ jobName });
      setExecuteResult(result);
      
      // Refresh job runs list
      const runsResult = await getCronJobRuns({ limit: 20 });
      if (runsResult.success) {
        setJobRuns(runsResult.jobRuns);
      }
    } catch (error) {
      console.error('Error executing job:', error);
      setExecuteResult({ success: false, error: error.message });
    } finally {
      setExecuteLoading(false);
    }
  }
  
  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  }
  
  // Get status color for job run
  function getStatusColor(status) {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Cron Jobs</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Jobs List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Registered Jobs</h2>
            <p className="mt-1 text-sm text-gray-500">
              List of all registered cron jobs and their schedules
            </p>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No cron jobs registered</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.schedule}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {job.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleExecuteJob(job.name)}
                          disabled={executeLoading && selectedJob === job.name}
                          className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {executeLoading && selectedJob === job.name ? 'Running...' : 'Run Now'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Job Runs List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Job Runs</h2>
            <p className="mt-1 text-sm text-gray-500">
              History of recent cron job executions
            </p>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Loading job runs...</div>
          ) : jobRuns.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No job runs recorded</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Started
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobRuns.map((run) => (
                    <tr key={run.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {run.jobName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(run.startedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {run.duration ? `${run.duration}ms` : 'In progress'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(run.status)}`}>
                          {run.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Execute Result */}
      {executeResult && (
        <div className={`mt-8 p-4 rounded-lg ${executeResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h3 className="text-lg font-medium mb-2">
            {executeResult.success ? 'Job Executed Successfully' : 'Error Executing Job'}
          </h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify(executeResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 