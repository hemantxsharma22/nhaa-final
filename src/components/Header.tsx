import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { EmblemOfIndia, DigitalIndiaLogo, SamaveshLogo } from './Emblems'

interface HeaderProps {
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Hamburger + Emblem + Ministry text */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Hamburger Menu button */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6 text-[#003366]" />
          </button>

          {/* Ashoka Lion Emblem */}
          <Link to="/" className="flex-shrink-0">
            <EmblemOfIndia className="h-13 sm:h-14 w-auto" />
          </Link>

          {/* Ministry Text */}
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#FBC02D] text-slate-900 leading-tight">
                BETA
              </span>
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
                Government of India
              </span>
            </div>
            <span className="text-xs sm:text-sm text-slate-700 font-medium">
              Ministry of Social Justice & Empowerment
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#003366] tracking-tight">
              Department of Social Justice & Empowerment
            </span>
          </div>

        </div>

        {/* Right: Digital India + SAMAVESH + Admin Login */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Digital India */}
          <div className="hidden lg:block">
            <DigitalIndiaLogo />
          </div>

          {/* SAMAVESH */}
          <div className="hidden xl:block">
            <SamaveshLogo />
          </div>

          {/* Official Admin Login Button */}
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold shadow-xs transition-colors"
            id="header-admin-login-btn"
          >
            Admin Login
          </Link>

        </div>

      </div>
    </header>
  )
}
