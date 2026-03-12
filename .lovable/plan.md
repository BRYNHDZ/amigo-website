

## Fix Mobile Header Layout - Mascot Overlapping Nav Links

### The Problem
On mobile viewport, the mascot GIF (80x80px) is crowding the navigation area, causing overlap with the "Home" and "Property Planner" links. The current layout tries to fit the logo, mascot, nav links, and a 90px call button in limited horizontal space.

### The Solution

**`src/components/Header.tsx`** - Three targeted fixes:

1. **Hide mascot on mobile** - Show only on tablet/desktop (`hidden sm:block` or similar). This gives the nav links room to breathe on small screens while keeping the mascot for larger viewports.

2. **Add horizontal spacing to nav links** - Increase gap between nav items on mobile (`gap-2` → `gap-4` or use `space-x-`) so they're not squished against the mascot or call button.

3. **Consider nav link text size** - The Property Planner text might be too long for mobile; could truncate to "Planner" below a certain breakpoint, or accept the spacing fix alone.

### Result
Clean mobile header with clear separation between logo, navigation, and call button. Mascot remains visible on desktop/tablet for brand recognition.

### Files to change
- **`src/components/Header.tsx`** — Add responsive classes to hide mascot on mobile and improve nav link spacing.

