import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons';
import { fetchInquiries, fetchApplications } from '../api/maruthi-toolings.api';

interface AdminInboxModalProps {
  onClose: () => void;
}

const AdminInboxModal: React.FC<AdminInboxModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'applications'>('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [inqData, appData] = await Promise.all([
        fetchInquiries(),
        fetchApplications(),
      ]);

      setInquiries(inqData);

      // Check local storage candidates fallback if database was offline
      const localApps = JSON.parse(localStorage.getItem('maruthi_job_applications') || '[]');
      const combinedApps = [...appData, ...localApps];

      setApplications(combinedApps);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 text-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-white/10 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-800 p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block">
              MongoDB Company Dashboard
            </span>
            <h2 className="text-2xl font-black text-white">Received Messages & Applications</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/10 bg-slate-950 px-6 gap-4">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📩 Contact Us Messages ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 font-bold text-sm border-b-2 transition ${
              activeTab === 'applications'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            💼 Career Applications ({applications.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Loading stored records...</div>
          ) : activeTab === 'inquiries' ? (
            inquiries.length === 0 ? (
              <div className="text-center py-16 text-gray-400">No contact messages received yet.</div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq, idx) => (
                  <div key={inq._id || idx} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-base text-white">{inq.name || 'Anonymous User'}</h4>
                        <span className="text-xs text-blue-400 font-medium">{inq.email}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>
                    {inq.subject && (
                      <p className="text-xs font-semibold text-cyan-300">Subject: {inq.subject}</p>
                    )}
                    <p className="text-sm text-gray-300 bg-slate-950/60 p-3 rounded-xl border border-white/5 leading-relaxed">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : (
            applications.length === 0 ? (
              <div className="text-center py-16 text-gray-400">No career applications received yet.</div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, idx) => (
                  <div key={app._id || idx} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wider block mb-1">
                          Role: {app.position}
                        </span>
                        <h4 className="font-bold text-lg text-white">{app.name}</h4>
                      </div>
                      <span className="text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                        {app.createdAt ? new Date(app.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">Email</span>
                        <span className="text-cyan-300 font-semibold">{app.email}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">Phone</span>
                        <span className="text-white font-semibold">{app.phone}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">Qualification</span>
                        <span className="text-white font-semibold">{app.qualification}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5">
                        <span className="text-gray-400 block text-[10px]">Languages</span>
                        <span className="text-white font-semibold">{app.languages}</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-xs text-gray-300">
                      <span className="text-gray-400 font-semibold block mb-1">Experience & Skills:</span>
                      <p>{app.experience}</p>
                    </div>

                    {app.resumeName && (
                      <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                        <span>📄 Attached Resume:</span>
                        <span>{app.resumeName}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminInboxModal;
