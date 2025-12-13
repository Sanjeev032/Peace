# Mood-Based Music Therapy Design System

## Overview
An emotionally responsive music therapy interface that adapts its visual design, color palette, and music recommendations based on the user's current mood.

---

## Design Philosophy

### Core Principles
- **Emotion-first**: The interface responds to how the user feels, not clinical diagnoses
- **Non-judgmental**: Every mood is valid and supported
- **Gentle transitions**: Color and animation changes are slow and soothing
- **Minimal friction**: Two taps to start therapy (mood → track)
- **Supportive, not prescriptive**: Suggestions, never demands

---

## Mood System

### Mood to Color Mapping

| Mood | Emoji | Color | Gradient | Feeling |
|------|-------|-------|----------|---------|
| **Calm** | 😌 | `#B4D4B4` (Soft Sage Green) | `#B4D4B4 → #D8E9D8` | Peaceful and centered |
| **Happy** | 😊 | `#FFD4A3` (Warm Peach) | `#FFD4A3 → #FFF4E0` | Joyful and energized |
| **Anxious** | 😰 | `#A3D5FF` (Cool Sky Blue) | `#A3D5FF → #D4EBFF` | Seeking relief |
| **Sad** | 😔 | `#C8B6E2` (Muted Lavender) | `#C8B6E2 → #E6DFF0` | Needing comfort |
| **Tired** | 😴 | `#B8B8B8` (Soft Stone Gray) | `#B8B8B8 → #E0E0E0` | Seeking rest |

### Color Application
- **Background**: Full-screen gradient (135° diagonal)
- **Accents**: Solid color for buttons, progress bars, and indicators
- **Waves**: Primary color with opacity variations
- **Cards**: White glass with mood-colored highlights

---

## Visual Style

### Background Treatment
- **No nebula or stars**: Clean, calming gradients only
- **Subtle paper texture overlay**: 30% opacity noise for organic feel
- **Smooth transitions**: 0.8s fade between mood colors
- **Gradient angle**: 135° (top-left to bottom-right)

### Glassmorphism
- **Background blur**: `backdrop-blur-md`
- **Background color**: `bg-white/10` (default), `bg-white/15` (hover), `bg-white/20` (active)
- **Border**: `border-white/20` (default), `border-white/40` (active)
- **Shadow**: Soft, contextual to mood color when active

### Typography
- **Primary font**: Inter / SF Pro
- **Headings**: Medium weight, high contrast (white/90)
- **Body**: Regular weight, softer contrast (white/60)
- **Labels**: Small, muted (white/50)
- **No medical terminology**: "Feeling Anxious" not "Anxiety Disorder"

---

## Sound Wave Visualizations

### Wave Types by Mood

#### Calm (Flowing Wave)
- **Style**: Gentle, undulating SVG paths
- **Speed**: Slow (5-6s per cycle)
- **Intensity**: Low (30% variation)
- **Colors**: Sage green gradient
- **Behavior**: Soft, continuous flow like breathing

#### Happy (Energetic Bars)
- **Style**: Vertical bar equalizer
- **Speed**: Fast (100ms updates)
- **Intensity**: High (60% variation)
- **Colors**: Warm peach
- **Behavior**: Lively, responsive, upbeat

#### Anxious (Soothing Circles)
- **Style**: Concentric breathing circles
- **Speed**: Rhythmic (3-4s per pulse)
- **Intensity**: Medium (50% variation)
- **Colors**: Cool sky blue
- **Behavior**: Expanding/contracting like breath exercises

#### Sad (Gentle Wave)
- **Style**: Very slow, soft wave
- **Speed**: Very slow (6-7s per cycle)
- **Intensity**: Very low (25% variation)
- **Colors**: Muted lavender
- **Behavior**: Comforting, minimal movement

#### Tired (Flowing Wave)
- **Style**: Slow, drifting wave
- **Speed**: Slowest (8s per cycle)
- **Intensity**: Minimal (20% variation)
- **Colors**: Soft stone gray
- **Behavior**: Drowsy, settling motion

### Wave Behavior States

**Playing**:
- Full animation at mood-specific speed
- Color at full opacity (80%)
- Subtle glow effect beneath

**Paused**:
- Slow settle to flat state (1.5s transition)
- Reduced opacity (30%)
- Minimal height/amplitude

---

## Music Library & Recommendations

### Track Categories
1. **Classical Music** - Calming compositions (Mozart, Bach)
2. **Ambient Sounds** - Nature soundscapes (rain, ocean, forest)
3. **Binaural Beats** - Frequency patterns for stress relief
4. **432 Hz Music** - Restorative tuning
5. **Nature Sounds** - Birds, streams, wind
6. **Glass Music** - Crystal bowls, glass harp

### Mood-to-Music Mapping

| Mood | Recommended Tracks |
|------|-------------------|
| **Calm** | Ocean Waves, Forest Morning, Classical Peace, Crystal Bowls, 432 Hz |
| **Happy** | Forest Morning, Uplifting Nature |
| **Anxious** | Ocean Waves, Anxiety Relief, 432 Hz |
| **Sad** | Rain Meditation, Classical Peace, Gentle Comfort, 432 Hz |
| **Tired** | Ocean Waves, Rain Meditation, Anxiety Relief, Crystal Bowls, Gentle Comfort |

---

## Component System

### MoodSelection Screen
- **Layout**: 2-column grid (mobile), 5-column (desktop)
- **Cards**: Glassmorphic with emoji, label, description
- **Color indicator**: Horizontal bar beneath each mood
- **Hover state**: Lift effect, scale 1.03-1.05
- **Helper text**: "There's no wrong answer — just choose what feels right"

### MoodWaveVisualizer
- **Container**: Rounded 24px, glassmorphic
- **Height**: 280px (mobile), 380px (desktop)
- **SVG viewBox**: 1000x400 or 400x400 (for circular)
- **Gradients**: Mood-specific, from solid to transparent
- **Transitions**: Smooth easing, no jarring movements

### MoodMusicCard
- **Layout**: Horizontal, play button + content
- **Play button**: 48px circle with mood-colored border
- **Content**: Title, description, category, duration
- **Active state**: Border glow, progress bar at bottom
- **Hover**: Lift effect, mood-colored shadow

### Player Controls
- **Play/Pause**: 80px circle with mood-colored fill
- **Skip buttons**: Simple icons, white/60
- **Volume slider**: Mood-colored fill, white/10 background
- **Progress bar**: Mood-colored, thin (2px), rounded ends

---

## Interaction Patterns

### Mood Selection
1. User sees 5 mood options
2. Taps/clicks mood card
3. **Background smoothly transitions** to mood color (0.8s)
4. Music recommendations filter instantly
5. Wave visualizer initializes

### Track Selection
1. User sees filtered tracks (3-6 recommendations)
2. Taps/clicks track card
3. Wave visualizer appears with track info
4. Music auto-plays
5. Player controls fade in

### Playback
1. **Play**: Waves animate at mood-specific speed
2. **Pause**: Waves gently settle (1.5s)
3. **Skip**: Quick fade, new track loads
4. **Volume**: Real-time slider with mood-colored fill

### Navigation
- **Change mood**: Button returns to mood selection
- **Choose different track**: Returns to recommendation list
- **Back to home**: Top-left arrow

---

## Micro-Interactions

### Card Hover
- **Scale**: 1.02 (mobile), 1.05 (desktop)
- **Y-offset**: -2px (mobile), -4px (desktop)
- **Duration**: 300ms
- **Easing**: ease-out

### Play Button Glow
- **When playing**: Pulsing shadow with mood color
- **Shadow blur**: 32px
- **Opacity cycle**: 40% → 60% → 40% (2s)

### Progress Bar
- **Animation**: Linear fill over track duration
- **Color**: Mood-specific solid color
- **Background**: white/10
- **Height**: 2px (thin, minimal)

### Mood Transition
- **Background fade**: 0.8s
- **Wave color change**: Instant
- **Content fade**: 0.4s stagger

---

## Accessibility

### Visual
- **Color contrast**: All text meets WCAG AA standards
- **No color-only indicators**: Icons + text labels
- **Large touch targets**: Minimum 44x44px
- **Clear focus states**: Visible outlines on keyboard navigation

### Motion
- **Slow animations**: No fast movements to trigger anxiety
- **Pause on stop**: Waves settle when paused
- **Respect prefers-reduced-motion**: (Future implementation)

### Language
- **Emotion words, not diagnoses**: "Feeling Anxious" not "Anxiety"
- **Supportive tone**: "Recommended for you" not "You should"
- **Non-judgmental**: No "good" or "bad" moods
- **Encouraging**: "There's no wrong answer"

---

## Responsive Design

### Mobile (< 1024px)
- 2-column mood grid
- Stacked player layout
- Full-width track cards
- Hidden track list when playing

### Desktop (≥ 1024px)
- 5-column mood grid
- 2/3 player + 1/3 sidebar layout
- Persistent track recommendations
- Larger visualizer (380px height)

---

## States & Variants

### Mood Selection
- **Default**: All moods visible
- **Hovered**: Card lifts, color bar glows

### Track Card
- **Default**: Glass card, play button
- **Hovered**: Lift, mood-colored shadow
- **Active**: Highlighted border, progress bar
- **Playing**: Pulsing glow on play button

### Wave Visualizer
- **Idle**: Minimal animation, low opacity
- **Playing**: Full animation, mood-specific behavior
- **Paused**: Settling animation to flat state

### Player
- **No track selected**: Hidden
- **Track loaded, paused**: Controls visible, play button
- **Playing**: Pause button, animated waves, progress bar moving

---

## Animation Timing

| Element | Duration | Easing | Repeat |
|---------|----------|--------|--------|
| **Mood background transition** | 800ms | ease-in-out | Once |
| **Wave animation (Calm)** | 5-6s | ease-in-out | Infinite |
| **Wave animation (Happy)** | 100ms | ease-out | Continuous |
| **Wave animation (Anxious)** | 3-4s | ease-in-out | Infinite |
| **Wave animation (Sad)** | 6-7s | ease-in-out | Infinite |
| **Wave animation (Tired)** | 8s | ease-in-out | Infinite |
| **Card hover** | 300ms | ease-out | Once |
| **Button press** | 150ms | ease-out | Once |
| **Progress bar** | Track duration | linear | Once |
| **Glow pulse** | 2s | ease-in-out | Infinite |

---

## Design Tokens

### Colors (CSS Variables)
```css
/* Mood Colors */
--mood-calm: #B4D4B4;
--mood-happy: #FFD4A3;
--mood-anxious: #A3D5FF;
--mood-sad: #C8B6E2;
--mood-tired: #B8B8B8;

/* Glass Tokens */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-bg-hover: rgba(255, 255, 255, 0.15);
--glass-bg-active: rgba(255, 255, 255, 0.2);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-border-active: rgba(255, 255, 255, 0.4);

/* Text Opacity */
--text-high: 0.9;
--text-medium: 0.6;
--text-low: 0.5;
--text-subtle: 0.4;
```

### Border Radius
- **Small**: 16px
- **Medium**: 20px
- **Large**: 24px
- **Full**: 9999px (circles)

### Spacing
- **Card padding**: 20px (mobile), 32px (desktop)
- **Section gap**: 24px
- **Card gap**: 12px (mobile), 16px (desktop)

---

## Success Criteria

A successful mood-based music therapy session means:

1. ✅ User can select mood in ≤ 2 taps
2. ✅ Background color matches emotional state
3. ✅ Music recommendations feel personally relevant
4. ✅ Wave animation creates calm, not distraction
5. ✅ No aggressive CTAs or medical language
6. ✅ User feels emotionally safe and supported
7. ✅ Smooth, gentle transitions throughout
8. ✅ Clear path to return or change selection

---

## Future Enhancements

- **Mood tracking over time**: Visualize mood patterns
- **Custom playlists**: User-created mood collections
- **Breathing sync**: Wave speed matches breath guidance
- **Haptic feedback**: Gentle vibrations on mobile
- **Voice control**: "Play calming music"
- **Integration with journal**: Music suggested based on entries

---

## Technical Stack

- **Framework**: React + TypeScript
- **Animation**: Motion (Framer Motion)
- **Styling**: Tailwind CSS v4
- **SVG**: Inline for wave visualizations
- **State**: React useState (local component state)
- **Routing**: Screen-based navigation

---

## File Structure

```
/components
  ├── MoodBasedMusicTherapy.tsx    # Main container
  ├── MoodSelection.tsx             # Mood selection grid
  ├── MoodWaveVisualizer.tsx        # Wave animations
  └── MoodMusicCard.tsx             # Track recommendation card
```

---

This design system creates a safe, supportive space where music therapy adapts to emotional needs, not the other way around.
