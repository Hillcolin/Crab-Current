# Crab Current Math

An educational physics-style web game built with Vite and a custom canvas simulation for practicing addition and subtraction through direct manipulation.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

## Core gameplay

- Start with a visible **Current** value.
- Start each level with a **finite water pool** at the source.
- Dig smooth tunnels through **solid dirt** from the source pool to operation pockets and the goal pipe.
- Entering a pocket applies its operation once:
  - Blue pocket: add value
  - Sponge pocket: subtract value
- Reach the goal pipe with:
  - exact value match (`Current === Target`)
  - safe flow (`Goal Flow <= Capacity`)

Water now uses a grid-based cellular flow model (gravity + sideways spread + diagonal settling) so it behaves closer to sand/water puzzle games.

## Controls

- **Mouse drag/hold**: continuous digging mode
- **Click**: chunk digging mode
- **Dig mode button**: toggles continuous/chunk digging
- Dig cursor size has been reduced by 50% for more precise carving.
- **Level selector**: jump between 3 levels
- **Restart level** and **Next level** buttons

## HCI principles implemented

- **Direct manipulation**: hold and dig tunnels in the world itself.
- **Immediate feedback**: live HUD, operation status text, and dynamic flow counts.
- **Visibility of system state**: always-visible Current, Target, Capacity, Goal Flow, Digs, Time.
- **Reduced cognitive load**: operation pockets are clearly color-coded with large numeric labels.
- **Consistency**: same controls and visual language across all levels.
- **Accessibility**: large controls, high-contrast text, browser-based interaction.

## Level progression

- **Level 1**: intro combo route (+ and -)
- **Level 2**: branch balancing with multiple subtractors
- **Level 3**: multi-step operation planning

## Outcome animations

At goal connection, the crab reacts based on result:

- **Happy**: exact target met
- **Disappointed**: value too low
- **Blown away**: value too high or overflow pressure
