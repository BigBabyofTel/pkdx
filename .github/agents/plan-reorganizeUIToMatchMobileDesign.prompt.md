# Plan: Reorganize UI to Match Mobile Design

## Summary

Restructure the Pokédex detail view from a two-column layout to a vertical mobile-first design. The current layout uses `grid-cols-2` for info/stats side-by-side, but the target design shows a single-column stack: header → image/name/types → stats radar → physical info → description → moves. We'll adjust component positioning in `controlPanel.vue` and fine-tune styling without major component rewrites.

## Steps

1. **Restructure main content layout in controlPanel.vue** — Replace the `grid-cols-2` with a single-column flex layout; position `ImagePortal` with name/types, then `StatsDisplay` (radar chart), `InfoDisplay` (height/weight), `DataView` (entry text), and `MovesList` (bottom section).

2. **Optimize imagePortal.vue styling** — Increase image size from `w-48 h-48` to `w-56 h-56` or `w-64 h-64` for better mobile visibility; ensure name, ID, and type badges stack cleanly.

3. **Adjust statsDisplay.vue spacing** — Add full-width padding/margins; ensure radar chart scales responsively for mobile widths without overflow.

4. **Update infoDisplay.vue layout** — Change from flex column to a horizontal layout (height/weight side-by-side in a `grid-cols-2`) for compact mobile presentation.

5. **Ensure dataView.vue and movesList.vue are full-width** — Add consistent padding/margins; verify moves display works well at mobile width (currently shows first 10 moves with scrollable overflow).

6. **Add responsive breakpoints** — Use Tailwind `sm:`, `md:`, `lg:` prefixes to optimize layout on larger screens (optional multi-column return) while keeping mobile as default.

## Further Considerations

1. **Moves display format** — Currently shows first 10 moves in vertical list. Should we: (A) Keep vertical scrolling / (B) Display all moves with pagination / (C) Show moves in a grid layout with type badges? Type badges would match the design mockup better.

2. **Stats radar sizing** — On mobile, does the radar feel cramped or appropriately sized? Should we cap its max-width or let it scale flexibly?

3. **Search/Filter UX** — The search input is currently `hidden`. Should we add a modal/overlay for search, or surface it in the header as a visible input field?

## Current Component Structure

### controlPanel.vue (Main container)
- Header with Back/Search/Filter buttons
- Error message display
- Hidden search input
- Main content area with flex column layout
- Contains: ImagePortal → InfoDisplay/StatsDisplay (grid-cols-2) → DataView → MovesList

### imagePortal.vue
- Gradient red background
- Image: `w-48 h-48`
- Pokemon number and name (centered)
- Type badges (flex gap-2)

### statsDisplay.vue
- Radar chart using PrimeVue Chart component
- Displays 6 base stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
- Centered flex column with max-width-xs

### infoDisplay.vue
- Unit toggle (Metric/Imperial with el-switch)
- Height display in metric or imperial
- Weight display in metric or imperial
- Uses computed properties for unit conversion

### dataView.vue
- Full-width white background
- Heading: "Pokedex Entry"
- Flavor text from species data

### movesList.vue
- Full-width white background with top border
- Shows first 10 moves (default)
- Vertical scrollable list with max-height-64
- Shows move name with count indicator

## Files to Modify

- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/controlPanel.vue`
- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/imagePortal.vue`
- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/statsDisplay.vue`
- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/infoDisplay.vue`
- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/dataView.vue`
- `/Users/bigbabyoftel/Documents/GitHub/pkdx/components/movesList.vue`

## Design Target

The mobile design shows:
- Red header with navigation buttons (Back, Search, Filter)
- Centered Pokemon image with curved top (image portal)
- Pokemon ID and name below image
- Type badges (Fire, Flying, etc.)
- Height and Weight displayed side-by-side (compact)
- Stats radar chart centered
- "Pokedex Entry" section with description text
- "Moves" section at bottom with move names and type badges

