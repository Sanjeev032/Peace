# Music Therapy Feature - Peace App

## Overview
The Music Therapy experience is an immersive, calming interface designed to help users achieve deep relaxation through therapeutic audio combined with responsive visual feedback.

## Features

### 🎵 Therapeutic Music Categories

1. **Classical Music**
   - Calming compositions by Mozart, Bach, and Beethoven
   - 45 minutes of focused, peaceful music
   - Elegant flowing wave visualization
   - Soft gold accent highlights

2. **Ambient Sounds**
   - Natural soundscapes: Ocean waves, rainfall, forest birds
   - 30 minutes of grounding audio
   - Slow flowing wave patterns
   - Calming blue gradients

3. **Binaural Beats**
   - Stress-relief frequency music
   - 20 minutes of deep relaxation
   - Animated bar visualization
   - Symmetrical wave patterns in lavender

4. **432 Hz Frequency Music**
   - Natural tuning for emotional balance
   - 25 minutes of restorative sound
   - Harmonic concentric circle visualization
   - Cyan/teal color palette

5. **Nature-Based Tracks**
   - Rain, ocean, wind, and leaves
   - 35 minutes of reassuring nature sounds
   - Organic flowing shapes
   - Sky blue gradients

6. **Glass Music**
   - Crystal bowl and glass harp sounds
   - 15 minutes of meditative audio
   - Circular radiating visualization
   - Translucent purple/lavender palette

### 🌊 Sound Wave Visualizations

Each music category features a unique, animated visualization type:

- **Flowing Waves**: Smooth, undulating SVG paths that ebb and flow
- **Bar Visualizer**: Vertical bars that pulse with simulated audio frequencies
- **Circular Waves**: Radiating bars emanating from a central point
- **Harmonic Circles**: Concentric rings that expand and contract harmoniously

All visualizations:
- React to playback state (playing vs paused)
- Use smooth easing transitions
- Feature glassmorphic overlays
- Include subtle glow effects
- Settle gently when paused

### 🎛️ Music Player Controls

The glassmorphic player includes:

- **Play/Pause Button**: Large, centered control with glow effect when active
- **Skip Controls**: Previous and next track buttons
- **Volume Slider**: Smooth gradient slider (0-100%)
- **Progress Bar**: Visual timeline with current time and total duration
- **Track Information**: Title and description display

### 🎨 Design System

**Color Palette:**
- Background: `#071224`, `#081A2F` (deep midnight blue)
- Accent 1: `#8FD3FF` (calm sky blue)
- Accent 2: `#A68BFF` (soft lavender)
- Category-specific colors for visual variety

**Visual Effects:**
- Glassmorphism with `backdrop-blur-md`
- Subtle border highlights with `border-white/10-30`
- Soft shadows and inset highlights
- Animated background nebula gradients
- Color-specific glows for each category

**Typography:**
- Large, readable text
- Generous spacing
- White text with 60-90% opacity for hierarchy

### 🖥️ Responsive Design

**Mobile View:**
- Full-screen visualizer
- Stacked layout for easy thumb access
- Category selection on separate view
- Touch-optimized controls

**Desktop View:**
- Two-column layout
- Visualizer and player on left (2/3 width)
- Category sidebar on right (1/3 width)
- Persistent category access
- Highlighted active category

### ✨ Micro-Interactions

- **Cards**: Lift on hover with soft glow
- **Buttons**: Scale animations on press
- **Player**: Glows when music is playing
- **Waves**: Smooth transitions between play/pause states
- **Background**: Subtle nebula animation reacts to playback

### 🧘 Accessibility Features

- Large touch targets (minimum 44x44px)
- High contrast text (90% opacity on dark)
- Clear visual state indicators
- Keyboard-accessible controls
- Screen reader friendly labels

## Technical Implementation

### Components

1. **MusicTherapy.tsx** - Main container
2. **SoundWaveVisualizer.tsx** - Audio visualization engine
3. **MusicCategoryCard.tsx** - Category selection cards

### State Management

- `isPlaying`: Boolean for playback state
- `selectedCategory`: Active music therapy type
- `volume`: Audio level (0-100)
- `progress`: Playback progress percentage

### Animation

All animations use Motion (formerly Framer Motion):
- Smooth easing curves
- Infinite loops for ambient effects
- Conditional animations based on playback state
- Staggered entrance animations

## Usage

Access Music Therapy from:
1. Home screen Quick Tools → "Music" button
2. Navigate through categories
3. Select a therapy type to begin
4. Visual feedback confirms playback
5. Return home or switch categories anytime

## Design Intent

This feature creates a "protected calm space" where users can:
- Escape anxiety through immersive visuals
- Regulate breathing with slow animations
- Find emotional safety in gentle, non-aggressive design
- Experience therapeutic sound combined with visual meditation

The goal is to slow heart rate, deepen breathing, and provide a refuge from stress through multi-sensory calm.
