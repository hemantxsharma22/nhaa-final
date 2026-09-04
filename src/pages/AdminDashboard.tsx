import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LogOut,
  AlertOctagon,
  FileText,
  CheckCircle2,
  Eye,
  Building,
} from 'lucide-react'
import { EmblemOfIndia } from '../components/Emblems'

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'urgent' | 'pending' | 'resolved'>('all')

  const mockCases = [
    {
      urn: 'NHAA-2026-GRV-88392',
      victim: 'Jagdish Chandra',
      type: 'Social Boycott & Water Denial',
      district: 'Ghaziabad, UP',
      ps: 'Kotwali Sadar',
      priority: 'HIGH',
      status: 'Investigation (FIR Filed)',
      date: '02 Sep 2026',
    },
    {
      urn: 'RESCUE-90142',
      victim: 'Anita Devi & Family',
      type: 'Mob Encirclement & Physical Threat',
      district: 'Aligarh, UP',
      ps: 'Atrauli Police Stn',
      priority: 'CRITICAL',
      status: 'Police Force Deployed',
      date: '03 Sep 2026 (12 mins ago)',
    },
    {
      urn: 'NHAA-2026-GRV-87114',
      victim: 'Maheshwar Paswan',
      type: 'Land Dispossession / Eviction',
      district: 'Patna, Bihar',
      ps: 'Phulwari Sharif',
      priority: 'MEDIUM',
      status: 'DM Notice Issued',
      date: '31 Aug 2026',
    },
    {
      urn: 'NHAA-2026-GRV-86501',
      victim: 'Devika Bai',
      type: 'Public Humiliation & Abuse',
      district: 'Bhopal, MP',
      ps: 'Govindpura',
      priority: 'RESOLVED',
      status: 'ATR Submitted & Closed',
      date: '27 Aug 2026',
    },
  ]

  const filteredCases = mockCases.filter((c) => {
    if (selectedStatus === 'urgent') return c.priority === 'CRITICAL' || c.priority === 'HIGH'
    if (selectedStatus === 'pending') return c.priority !== 'RESOLVED'
    if (selectedStatus === 'resolved') return c.priority === 'RESOLVED'
    return true
  })

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Officer Portal Navigation Bar */}
      <header className="bg-[#0b1f36] text-white border-b border-slate-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EmblemOfIndia className="h-10 w-auto text-amber-300" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold tracking-wide">
                  NHAA Nodal Officer Administration Console
                </span>
                <span className="text-[10px] bg-blue-700 text-blue-100 px-2 py-0.5 rounded font-mono font-semibold">
                  SECURE v2.4
                </span>
              </div>
              <span className="text-xs text-slate-300 block">
                Department of Social Justice and Empowerment, Government of India
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right text-xs">
              <span className="font-bold text-white">Shri A.K. Srivastava (IAS)</span>
              <span className="text-slate-300">District Nodal Officer (Special Cell)</span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white text-xs font-semibold shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-header / Quick Links */}
      <div className="bg-[#122e4d] text-slate-200 text-xs py-2 px-4 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-amber-300">Active Jurisdiction:</span>
            <span>Western Region Zone-1 (NCR & UP-West)</span>
          </div>
          <Link to="/" className="text-blue-200 hover:text-white underline">
            Public Portal Homepage
          </Link>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Assigned Complaints</span>
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">128</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">14 pending initial scrutiny</span>
          </div>

          <div className="bg-red-50 border border-red-300 rounded p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700 uppercase">Emergency Rescues</span>
              <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
            </div>
            <div className="text-2xl font-extrabold text-red-900 font-mono mt-2">3 ACTIVE</div>
            <span className="text-[11px] text-red-700 mt-0.5 block">Immediate police dispatch underway</span>
          </div>

          <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">FIRs Tracked</span>
              <Building className="w-5 h-5 text-indigo-700" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">94</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Section 3(1) & 3(2) PoA Act</span>
          </div>

          <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Relief Disbursed</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-800 font-mono mt-2">₹1.48 Cr</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Direct Benefit Transfer (DBT)</span>
          </div>

        </div>

        {/* Triage & Management Queue */}
        <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
          
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Atrocities Grievance & Distress Triage Queue
              </h2>
              <p className="text-xs text-slate-500">
                Incoming citizen cases under the SC/ST (Prevention of Atrocities) Act
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1 rounded font-medium ${selectedStatus === 'all' ? 'bg-blue-800 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All Cases
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('urgent')}
                className={`px-3 py-1 rounded font-medium ${selectedStatus === 'urgent' ? 'bg-red-700 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Distress / SOS
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('pending')}
                className={`px-3 py-1 rounded font-medium ${selectedStatus === 'pending' ? 'bg-blue-800 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Under Investigation
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatus('resolved')}
                className={`px-3 py-1 rounded font-medium ${selectedStatus === 'resolved' ? 'bg-emerald-700 text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Disposed
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Reference URN</th>
                  <th className="p-3">Victim / Informer</th>
                  <th className="p-3">Alleged Offence</th>
                  <th className="p-3">District & Police Station</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Workflow Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCases.map((c) => (
                  <tr key={c.urn} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-blue-900">{c.urn}</td>
                    <td className="p-3 font-medium text-slate-900">
                      <div>{c.victim}</div>
                      <span className="text-[10px] text-slate-500">{c.date}</span>
                    </td>
                    <td className="p-3 text-slate-700 max-w-xs">{c.type}</td>
                    <td className="p-3 text-slate-600">
                      <div className="font-medium text-slate-800">{c.district}</div>
                      <div className="text-[10px] text-slate-500">{c.ps}</div>
                    </td>
                    <td className="p-3">
                      {c.priority === 'CRITICAL' && (
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase animate-pulse">
                          CRITICAL SOS
                        </span>
                      )}
                      {c.priority === 'HIGH' && (
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px] uppercase">
                          HIGH
                        </span>
                      )}
                      {c.priority === 'MEDIUM' && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px] uppercase">
                          MEDIUM
                        </span>
                      )}
                      {c.priority === 'RESOLVED' && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                          RESOLVED
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {c.status}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Dossier ${c.urn} opened for review.`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0f3460] hover:bg-[#162447] text-white text-[11px] font-semibold transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
            Showing {filteredCases.length} records. Automated synchronization with State Police CCTNS network active.
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0b1f36] text-slate-400 py-3 text-center text-xs border-t border-slate-700">
        <p>National Informatics Centre (NIC) • Department of Social Justice and Empowerment, Government of India</p>
      </footer>
    </div>
  )
}
