import React, { useState } from 'react';
import { Driver } from './data/drivers';

interface DriverAvatarProps {
  driver: Driver;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  interactive?: boolean;
  showNumber?: boolean;
  onClick?: () => void;
}

export function DriverAvatar({ 
  driver, 
  size = 'lg', 
  className = '', 
  interactive = false,
  showNumber = true,
  onClick
}: DriverAvatarProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Mobile-first responsive sizing system
  const sizeClasses = {
    xs: 'avatar-xs',      // w-8 h-8 -> w-10 h-10 on sm+
    sm: 'avatar-sm',      // w-10 h-10 -> w-12 h-12 on sm+
    md: 'avatar-md',      // w-12 h-12 -> w-14 h-14 on sm+
    lg: 'avatar-lg',      // w-16 h-16 -> w-18 h-18 on sm+
    xl: 'avatar-xl',      // w-20 h-20 -> w-24 h-24 on sm+
    '2xl': 'avatar-2xl',  // w-24 h-24 -> w-28 h-28 on sm+
    '3xl': 'avatar-3xl',  // w-32 h-32 -> w-36 h-36 on sm+
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
    '2xl': 'text-4xl sm:text-5xl',
    '3xl': 'text-5xl sm:text-6xl'
  };

  const numberSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl'
  };

  const handleTouchStart = () => {
    if (interactive) setIsPressed(true);
  };

  const handleTouchEnd = () => {
    if (interactive) {
      setIsPressed(false);
      if (onClick) onClick();
    }
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    rounded-2xl 
    flex items-center justify-center 
    shadow-xl 
    border-2 
    transition-all duration-300
    ${interactive ? 'cursor-pointer card-interactive' : ''}
    ${isPressed ? 'scale-95' : ''}
    ${className}
  `;

  const renderHelmetAvatar = () => (
    <div 
      className={baseClasses}
      style={{
        background: `linear-gradient(135deg, ${driver.primaryColor} 0%, ${driver.secondaryColor} 100%)`,
        borderColor: driver.primaryColor
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <div className={`${iconSizes[size]} filter drop-shadow-lg`}>
        {driver.helmet}
      </div>
    </div>
  );

  const renderStylizedAvatar = () => (
    <div 
      className={`${baseClasses} relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${driver.primaryColor} 0%, ${driver.secondaryColor} 100%)`,
        borderColor: driver.primaryColor
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      {/* Racing helmet silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          className="w-3/4 h-3/4" 
          viewBox="0 0 100 100" 
          fill="none"
        >
          <defs>
            <linearGradient id={`helmet-${driver.id}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>
          {/* Helmet shape */}
          <ellipse 
            cx="50" 
            cy="45" 
            rx="35" 
            ry="40" 
            fill={`url(#helmet-${driver.id}-${size})`}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1"
          />
          {/* Visor */}
          <ellipse 
            cx="50" 
            cy="40" 
            rx="25" 
            ry="15" 
            fill="rgba(0,0,0,0.7)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.5"
          />
          {/* Racing number */}
          {showNumber && ['lg', 'xl', '2xl', '3xl'].includes(size) && (
            <text 
              x="50" 
              y="75" 
              textAnchor="middle" 
              fontSize={size === 'lg' ? '10' : size === 'xl' ? '12' : '14'} 
              fill="rgba(255,255,255,0.9)"
              fontWeight="bold"
            >
              {driver.number}
            </text>
          )}
        </svg>
      </div>
    </div>
  );

  const renderMinimalAvatar = () => (
    <div 
      className={baseClasses}
      style={{
        background: `linear-gradient(135deg, ${driver.primaryColor} 0%, ${driver.secondaryColor} 100%)`,
        borderColor: driver.primaryColor
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <div className="text-center">
        {showNumber && (
          <div className={`font-bold text-white ${numberSizes[size]}`}>
            {driver.number}
          </div>
        )}
        <div className={`text-white/80 text-xs font-medium ${['xs', 'sm'].includes(size) ? 'hidden' : ''}`}>
          {driver.flag}
        </div>
      </div>
    </div>
  );

  switch (driver.avatarStyle) {
    case 'helmet':
      return renderHelmetAvatar();
    case 'stylized':
      return renderStylizedAvatar();
    case 'minimal':
      return renderMinimalAvatar();
    default:
      return renderHelmetAvatar();
  }
}

// Simple flag avatar for compact displays
export function DriverFlagAvatar({ 
  driver, 
  size = 'md', 
  className = '', 
  interactive = false,
  onClick 
}: DriverAvatarProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    xs: 'avatar-xs',
    sm: 'avatar-sm', 
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
    '2xl': 'avatar-2xl',
    '3xl': 'avatar-3xl'
  };

  const iconSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const handleTouchStart = () => {
    if (interactive) setIsPressed(true);
  };

  const handleTouchEnd = () => {
    if (interactive) {
      setIsPressed(false);
      if (onClick) onClick();
    }
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center 
        border-2 
        shadow-lg 
        transition-all duration-300
        ${interactive ? 'cursor-pointer card-interactive' : ''}
        ${isPressed ? 'scale-95' : ''}
        ${className}
      `}
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: driver.primaryColor
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <span className={iconSizes[size]}>{driver.flag}</span>
    </div>
  );
}

// Compact driver info card with avatar
export function DriverCard({ 
  driver, 
  onClick, 
  className = '',
  showStats = true 
}: { 
  driver: Driver; 
  onClick?: () => void; 
  className?: string;
  showStats?: boolean;
}) {
  return (
    <div 
      className={`
        p-4 rounded-2xl border glass-card shadow-lg card-interactive
        transition-all duration-300 hover:shadow-xl
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{ 
        borderColor: `rgba(${driver.primaryColor.replace('#', '')}, 0.2)` 
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <DriverAvatar 
          driver={driver} 
          size="md" 
          interactive={!!onClick}
          onClick={onClick}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold ensure-contrast truncate">
            {driver.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="truncate">{driver.team}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold" style={{ color: driver.primaryColor }}>
            P{driver.currentSeasonPosition}
          </div>
          <div className="text-xs text-muted-foreground">2025</div>
        </div>
      </div>
      
      {showStats && (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-sm font-bold text-yellow-600">{driver.wins}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </div>
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-sm font-bold text-green-600">{driver.podiums}</div>
            <div className="text-xs text-muted-foreground">Podiums</div>
          </div>
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="text-sm font-bold text-blue-600">{driver.poles}</div>
            <div className="text-xs text-muted-foreground">Poles</div>
          </div>
        </div>
      )}
    </div>
  );
}