// Icons.js - SVG Icon Components (Heroicons based)
import React from 'react';

// Utility wrapper for consistent sizing
const IconWrapper = ({ children, size = 24, className = '', style = {} }) => (
  <span className={`icon ${className}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, ...style }}>
    {children}
  </span>
);

// ✅ Check Circle - Success
export const CheckCircleIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  </IconWrapper>
);

// ❌ X Circle - Error
export const XCircleIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  </IconWrapper>
);

// ⚠️ Exclamation Triangle - Warning
export const ExclamationTriangleIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  </IconWrapper>
);

// ℹ️ Information Circle - Info
export const InformationCircleIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  </IconWrapper>
);

// ✕ Close / X
export const CloseIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </IconWrapper>
);

// 💳 Credit Card
export const CreditCardIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  </IconWrapper>
);

// 🎫 Ticket
export const TicketIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
    </svg>
  </IconWrapper>
);

// 👤 User
export const UserIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  </IconWrapper>
);

// 📝 Document Text
export const DocumentTextIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  </IconWrapper>
);

// 📅 Calendar
export const CalendarIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  </IconWrapper>
);

// 🔒 Lock Closed
export const LockClosedIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  </IconWrapper>
);

// 📧 Envelope / Mail
export const EnvelopeIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  </IconWrapper>
);

// 📞 Phone
export const PhoneIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  </IconWrapper>
);

// 📍 Map Pin / Location
export const MapPinIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  </IconWrapper>
);

// ⏰ Clock
export const ClockIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  </IconWrapper>
);

// ⚙️ Cog / Settings
export const CogIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  </IconWrapper>
);

// 🚪 Arrow Right on Rectangle / Logout
export const LogoutIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  </IconWrapper>
);

// ✏️ Pencil / Edit
export const PencilIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
  </IconWrapper>
);

// ➕ Plus
export const PlusIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </IconWrapper>
);

// 🗑️ Trash
export const TrashIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  </IconWrapper>
);

// 🚌 Bus
export const BusIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 4c3.4 0 6 3.64 6 8v5a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-6.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-11a2 2 0 0 1 2 -2zm-11 12a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m12 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m-.76 -9.989l1.068 4.989h2.636c-.313 -2.756 -1.895 -4.82 -3.704 -4.989m-11.24 -.011h-3v3h3zm5 0h-3v3h3zm4.191 0h-2.191v3h2.834z" />
    </svg>
  </IconWrapper>
);

// ⏳ Loading Spinner (Animated)
export const LoadingSpinner = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size}
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        opacity="0.25"
      />
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
        strokeDashoffset="62.8"
        style={{ 
          animation: 'spinner-dash 1.5s ease-in-out infinite',
          transformOrigin: 'center'
        }}
      />
    </svg>
  </IconWrapper>
);

// 🌐 Globe / Web
export const GlobeIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  </IconWrapper>
);

// 💡 Light Bulb / Idea
export const LightBulbIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  </IconWrapper>
);

// Facebook
export const FacebookIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </IconWrapper>
);

// Instagram
export const InstagramIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  </IconWrapper>
);

// Twitter/X
export const TwitterIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </IconWrapper>
);

// LinkedIn
export const LinkedInIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </IconWrapper>
);

// 🔄 Refresh / Arrow Path
export const RefreshIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  </IconWrapper>
);

// 📋 Clipboard List
export const ClipboardListIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color} width={size} height={size}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
    </svg>
  </IconWrapper>
);

// 🪑 Chair / Seat
export const ChairIcon = ({ size = 24, color = 'currentColor', className = '' }) => (
  <IconWrapper size={size} className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 13a2 2 0 0 1 2 2v4h-3v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2h-4v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2h-3v-4a2 2 0 0 1 2 -2zm-4.172 -10a2 2 0 0 1 1.993 1.85l.007 .15l.022 5.29a3.003 3.003 0 0 1 2.15 2.71h-10a3.003 3.003 0 0 1 2.15 -2.71l.022 -5.29a2 2 0 0 1 1.85 -1.993l.15 -.007h1.656z" />
    </svg>
  </IconWrapper>
);

// CSS for animations (add to your CSS file or use styled-components)
export const iconAnimationStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes spinner-dash {
    0% { stroke-dashoffset: 62.8; }
    50% { stroke-dashoffset: 15.7; }
    100% { stroke-dashoffset: 62.8; }
  }
`;

// Export all icons as a collection
export default {
  CheckCircle: CheckCircleIcon,
  XCircle: XCircleIcon,
  ExclamationTriangle: ExclamationTriangleIcon,
  InformationCircle: InformationCircleIcon,
  Close: CloseIcon,
  CreditCard: CreditCardIcon,
  Ticket: TicketIcon,
  User: UserIcon,
  DocumentText: DocumentTextIcon,
  Calendar: CalendarIcon,
  LockClosed: LockClosedIcon,
  Envelope: EnvelopeIcon,
  Phone: PhoneIcon,
  MapPin: MapPinIcon,
  Clock: ClockIcon,
  Cog: CogIcon,
  Logout: LogoutIcon,
  Pencil: PencilIcon,
  Plus: PlusIcon,
  Trash: TrashIcon,
  Bus: BusIcon,
  Globe: GlobeIcon,
  LightBulb: LightBulbIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedInIcon,
  Refresh: RefreshIcon,
  ClipboardList: ClipboardListIcon,
  Chair: ChairIcon,
  LoadingSpinner: LoadingSpinner
};
