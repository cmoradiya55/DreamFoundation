'use client';

import React from 'react';
import { 
  Heart, 
  Star, 
  Circle, 
  Square, 
  Triangle, 
  Diamond, 
  Hexagon,
  Sparkles,
  Zap,
  Sun,
  Moon,
  Cloud,
  Leaf,
  Flower,
  Bird,
  Fish,
  Mountain
} from 'lucide-react';

interface IconData {
  icon: React.ComponentType<any>;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}

const BackgroundIcons: React.FC = () => {
  const icons = [
    Heart, Star, Circle, Square, Triangle, Diamond, Hexagon,
    Sparkles, Zap, Sun, Moon, Cloud, Leaf, Flower,
    Bird, Fish, Mountain
  ];

  const colors = [
    'text-gray-400',
    'text-gray-500',
    'text-blue-300',
    'text-purple-300',
    'text-indigo-300',
    'text-slate-400'
  ];

  // Generate random icon data with collision detection
  const generateRandomIcons = (): IconData[] => {
    const iconCount = 100; // Reduced for better performance with collision detection
    const randomIcons: IconData[] = [];
    const minDistance = 60; // Minimum distance between icons
    const maxAttempts = 50; // Maximum attempts to place an icon

    // Define areas to avoid (form content areas)
    const avoidAreas = [
      { x: 10, y: 10, width: 80, height: 90 }, // Main form area (approximate)
    ];

    const isPositionValid = (x: number, y: number, size: number): boolean => {
      // Check collision with existing icons
      for (const existingIcon of randomIcons) {
        const distance = Math.sqrt(
          Math.pow(x - existingIcon.x, 2) + Math.pow(y - existingIcon.y, 2)
        );
        if (distance < minDistance) {
          return false;
        }
      }

      // Check if position is in avoid areas
      for (const area of avoidAreas) {
        if (
          x >= area.x &&
          x <= area.x + area.width &&
          y >= area.y &&
          y <= area.y + area.height
        ) {
          return false;
        }
      }

      return true;
    };

    for (let i = 0; i < iconCount; i++) {
      let attempts = 0;
      let validPosition = false;
      let randomX = 0;
      let randomY = 0;

      // Try to find a valid position
      while (!validPosition && attempts < maxAttempts) {
        randomX = Math.random() * 100;
        randomY = Math.random() * 100;
        const randomSize = Math.random() * 20 + 8; // 8-28px
        
        if (isPositionValid(randomX, randomY, randomSize)) {
          validPosition = true;
        }
        attempts++;
      }

      // If we found a valid position, add the icon
      if (validPosition) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomSize = Math.random() * 20 + 8; // 8-28px
        const randomRotation = Math.random() * 360; // 0-360 degrees
        const randomOpacity = Math.random() * 0.4 + 0.2; // 0.2-0.6 opacity
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        randomIcons.push({
          icon: randomIcon,
          x: randomX,
          y: randomY,
          size: randomSize,
          rotation: randomRotation,
          opacity: randomOpacity,
          color: randomColor,
        });
      }
    }

    return randomIcons;
  };

  const iconData = generateRandomIcons();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {iconData.map((iconItem, index) => {
        const IconComponent = iconItem.icon;
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${iconItem.x}%`,
              top: `${iconItem.y}%`,
              transform: `rotate(${iconItem.rotation}deg)`,
              opacity: iconItem.opacity,
            }}
          >
            <IconComponent
              size={iconItem.size}
              className={iconItem.color}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BackgroundIcons;
