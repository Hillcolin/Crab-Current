import './style.css'

const WIDTH = 940
const HEIGHT = 620
const TERRAIN_TOP = 132
const FLUID_CELL = 5
const GRID_W = Math.floor(WIDTH / FLUID_CELL)
const GRID_H = Math.floor(HEIGHT / FLUID_CELL)
const GRID_SIZE = GRID_W * GRID_H
const FLOW_PACKET = 10
const MIN_SPLIT_AMOUNT = 0.11
const MERGE_MIN = 0.01
const MERGE_MAX = 0.24
const FIRE_COLS = 4
const FIRE_ROWS = 2
const FIRE_TOTAL_FRAMES = 8

const levels = [
  {
    id: 0,
    name: 'Level 0 · Tutorial',
    theme: 'surface',
    startValue: 1,
    targetValue: 3,
    pipeCapacity: 20,
    poolAmount: 180,
    source: { x: 116, y: 80, radius: 44 },
    goal: { x: 820, y: 530, radius: 46 },
    pockets: [
      { id: 'a', x: 320, y: 250, radius: 42, delta: 2, label: '+2 pocket' },
    ],
    rocks: [],
    tutorial: true,
  },
  {
    id: 1,
    name: 'Level 1 · Learn the combo',
    theme: 'surface',
    startValue: 5,
    targetValue: 8,
    pipeCapacity: 24,
    poolAmount: 220,
    source: { x: 116, y: 80, radius: 44 },
    goal: { x: 820, y: 530, radius: 46 },
    pockets: [
      { id: 'a', x: 320, y: 230, radius: 40, delta: 5, label: '+5 pocket' },
      { id: 'b', x: 548, y: 360, radius: 38, delta: -2, label: '-2 sponge' },
    ],
    rocks: [
      { type: 'circle', x: 426, y: 430, radius: 30 },
    ],
  },
  {
    id: 2,
    name: 'Level 2 · Route and balance',
    theme: 'surface',
    startValue: 7,
    targetValue: 6,
    pipeCapacity: 26,
    poolAmount: 240,
    source: { x: 120, y: 96, radius: 42 },
    goal: { x: 814, y: 530, radius: 44 },
    pockets: [
      { id: 'a', x: 260, y: 248, radius: 36, delta: 4, label: '+4 pocket' },
      { id: 'b', x: 486, y: 210, radius: 36, delta: -3, label: '-3 sponge' },
      { id: 'c', x: 650, y: 390, radius: 38, delta: -2, label: '-2 sponge' },
    ],
    rocks: [
      { type: 'circle', x: 390, y: 356, radius: 28 },
      { type: 'rect', x: 552, y: 446, width: 70, height: 30 },
    ],
  },
  {
    id: 3,
    name: 'Level 3 · Multi-step challenge',
    theme: 'surface',
    startValue: 4,
    targetValue: 11,
    pipeCapacity: 28,
    poolAmount: 260,
    source: { x: 118, y: 90, radius: 42 },
    goal: { x: 820, y: 534, radius: 44 },
    pockets: [
      { id: 'a', x: 274, y: 208, radius: 36, delta: 6, label: '+6 pocket' },
      { id: 'b', x: 490, y: 310, radius: 38, delta: 3, label: '+3 pocket' },
      { id: 'c', x: 640, y: 222, radius: 34, delta: -2, label: '-2 sponge' },
      { id: 'd', x: 716, y: 410, radius: 34, delta: 1, label: '+1 pocket' },
    ],
    rocks: [
      { type: 'rect', x: 334, y: 382, width: 86, height: 34 },
      { type: 'circle', x: 610, y: 474, radius: 34 },
    ],
  },
  {
    id: 4,
    name: 'Level 4 · Surface maze',
    theme: 'surface',
    startValue: 6,
    targetValue: 15,
    pipeCapacity: 32,
    poolAmount: 290,
    source: { x: 114, y: 84, radius: 44 },
    goal: { x: 824, y: 534, radius: 44 },
    pockets: [
      { id: 'a', x: 248, y: 210, radius: 36, delta: 7, label: '+7 pocket' },
      { id: 'b', x: 396, y: 304, radius: 34, delta: -2, label: '-2 sponge' },
      { id: 'c', x: 540, y: 228, radius: 36, delta: 5, label: '+5 pocket' },
      { id: 'd', x: 684, y: 346, radius: 34, delta: -1, label: '-1 sponge' },
      { id: 'e', x: 742, y: 454, radius: 32, delta: 1, label: '+1 pocket' },
    ],
    rocks: [
      { type: 'rect', x: 286, y: 430, width: 88, height: 32 },
      { type: 'circle', x: 472, y: 382, radius: 31 },
      { type: 'rect', x: 618, y: 484, width: 72, height: 30 },
    ],
  },
  {
    id: 5,
    name: 'Level 5 · Surface master flow',
    theme: 'surface',
    startValue: 9,
    targetValue: 18,
    pipeCapacity: 34,
    poolAmount: 320,
    source: { x: 118, y: 88, radius: 44 },
    goal: { x: 824, y: 534, radius: 44 },
    pockets: [
      { id: 'a', x: 236, y: 194, radius: 34, delta: 6, label: '+6 pocket' },
      { id: 'b', x: 352, y: 278, radius: 34, delta: -4, label: '-4 sponge' },
      { id: 'c', x: 474, y: 198, radius: 34, delta: 4, label: '+4 pocket' },
      { id: 'd', x: 594, y: 292, radius: 36, delta: 5, label: '+5 pocket' },
      { id: 'e', x: 682, y: 214, radius: 32, delta: -2, label: '-2 sponge' },
      { id: 'f', x: 756, y: 398, radius: 32, delta: 2, label: '+2 pocket' },
    ],
    rocks: [
      { type: 'rect', x: 248, y: 420, width: 90, height: 34 },
      { type: 'circle', x: 430, y: 372, radius: 30 },
      { type: 'rect', x: 560, y: 444, width: 90, height: 34 },
      { type: 'circle', x: 700, y: 320, radius: 30 },
    ],
  },
  {
    id: 6,
    name: 'Level 6 · Cave split paths',
    theme: 'cave',
    startValue: 8,
    targetValue: 19,
    pipeCapacity: 36,
    poolAmount: 340,
    source: { x: 120, y: 88, radius: 44 },
    goal: { x: 822, y: 530, radius: 44 },
    pockets: [
      { id: 'a', x: 250, y: 210, radius: 34, delta: 6, label: '+6 pocket' },
      { id: 'b', x: 388, y: 326, radius: 34, delta: -3, label: '-3 sponge' },
      { id: 'c', x: 516, y: 236, radius: 36, delta: 7, label: '+7 pocket' },
      { id: 'd', x: 648, y: 356, radius: 34, delta: -2, label: '-2 sponge' },
      { id: 'e', x: 752, y: 430, radius: 32, delta: 1, label: '+1 pocket' },
    ],
    rocks: [
      { type: 'rect', x: 208, y: 392, width: 116, height: 38 },
      { type: 'circle', x: 450, y: 430, radius: 36 },
      { type: 'rect', x: 576, y: 286, width: 108, height: 38 },
      { type: 'circle', x: 718, y: 506, radius: 34 },
    ],
  },
  {
    id: 7,
    name: 'Level 7 · Crystal cave finale',
    theme: 'cave',
    startValue: 10,
    targetValue: 22,
    pipeCapacity: 38,
    poolAmount: 360,
    source: { x: 120, y: 90, radius: 44 },
    goal: { x: 824, y: 534, radius: 44 },
    pockets: [
      { id: 'a', x: 230, y: 208, radius: 34, delta: 8, label: '+8 pocket' },
      { id: 'b', x: 344, y: 304, radius: 34, delta: -5, label: '-5 sponge' },
      { id: 'c', x: 462, y: 220, radius: 34, delta: 6, label: '+6 pocket' },
      { id: 'd', x: 586, y: 318, radius: 34, delta: 5, label: '+5 pocket' },
      { id: 'e', x: 684, y: 220, radius: 32, delta: -2, label: '-2 sponge' },
      { id: 'f', x: 752, y: 392, radius: 32, delta: 3, label: '+3 pocket' },
    ],
    rocks: [
      { type: 'rect', x: 192, y: 390, width: 112, height: 40 },
      { type: 'circle', x: 362, y: 438, radius: 34 },
      { type: 'rect', x: 472, y: 474, width: 116, height: 38 },
      { type: 'circle', x: 624, y: 396, radius: 36 },
      { type: 'rect', x: 706, y: 296, width: 90, height: 34 },
    ],
  },
]

const app = document.querySelector('#app')
app.innerHTML = `
  <main class="app-shell">
    <header class="topbar" aria-label="Game controls">
      <div>
        <h1>Crab Current Math</h1>
        <p>Guide the water to the pipe and make it equal the target.</p>
      </div>
      <div class="topbar-actions">
        <label>
          Level
          <select id="levelSelect" aria-label="Select level"></select>
        </label>
        <button id="digModeBtn" class="mode-btn" aria-label="Toggle digging mode">Dig mode: Continuous</button>
        <button id="restartBtn">Restart level</button>
        <button id="nextBtn">Next level</button>
      </div>
    </header>

    <section id="stageWrap" class="stage-wrap">
      <section id="stage" class="stage" aria-label="Physics game area"></section>
    </section>

    <section id="endModal" class="end-modal hidden" aria-live="polite" aria-label="Level result">
      <div class="end-card">
        <h2 id="endTitle">Level complete!</h2>

        <img id="endImage" class="end-image" alt="Result image" />

        <p id="endMessage">You reached the goal.</p>
        <div class="end-actions">
          <button id="retryBtn">Retry level</button>
          <button id="modalNextBtn">Next level</button>
        </div>
      </div>
    </section>

    <footer class="legend">
      <span><b>Blue pockets</b> add water value.</span>
      <span><b>Fire</b> subtracts water value.</span>
      <span><b>Gray rocks</b> cannot be dug through.</span>
      <span><b>Goal pipe</b> needs exact value and safe flow.</span>
    </footer>
  </main>
`

const levelSelect = document.querySelector('#levelSelect')
const restartBtn = document.querySelector('#restartBtn')
const nextBtn = document.querySelector('#nextBtn')
const digModeBtn = document.querySelector('#digModeBtn')
const stageWrapEl = document.querySelector('#stageWrap')
const stageEl = document.querySelector('#stage')
const endModalEl = document.querySelector('#endModal')
const endTitleEl = document.querySelector('#endTitle')
const endMessageEl = document.querySelector('#endMessage')
const retryBtn = document.querySelector('#retryBtn')
const modalNextBtn = document.querySelector('#modalNextBtn')
const endImageEl = document.querySelector('#endImage')

levels.forEach((level, index) => {
  const option = document.createElement('option')
  option.value = index
  option.textContent = level.name
  levelSelect.append(option)
})

const canvas = document.createElement('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
canvas.className = 'play-canvas'
stageEl.replaceChildren(canvas)
const ctx = canvas.getContext('2d')

const terrainCanvas = document.createElement('canvas')
terrainCanvas.width = WIDTH
terrainCanvas.height = HEIGHT
const terrainCtx = terrainCanvas.getContext('2d')

const waterFieldCanvas = document.createElement('canvas')
waterFieldCanvas.width = GRID_W
waterFieldCanvas.height = GRID_H
const waterFieldCtx = waterFieldCanvas.getContext('2d', { willReadFrequently: true })
const waterFieldImage = waterFieldCtx.createImageData(GRID_W, GRID_H)

const state = {
  currentLevelIndex: 0,
  currentValue: 0,
  goalHits: 0,
  digCount: 0,
  hasConnectedToGoal: false,
  hasResolvedRound: false,
  crabState: 'neutral',
  activeOperations: new Set(),
  mouseDown: false,
  digMode: 'continuous',
  terrainImageData: null,
  frameHandle: null,
  lastFrameAt: performance.now(),
  waterGrid: new Float32Array(GRID_SIZE),
  prevWaterGrid: new Float32Array(GRID_SIZE),
  solidMask: new Uint8Array(GRID_SIZE),
  poolLeft: 0,
  goalFlowBuffer: 0,
  firstGoalAt: null,
  lastGoalFlowAt: null,
  earnedStars: 0,
  bottleFillDisplay: 0,   // what is currently shown (animated)
  bottleFillTarget: 0,    // where it should go (based on math)
  showBottleUI: false,
  isFillingBottle: false,
  introOverlayStartedAt: performance.now(),
  introOverlayDismissed: false,
  hasInteracted: false,
  hoveredPocketId: null,
}

const evaporationParticles = []
const floatingEquations = []

const fireSprite = new Image()
fireSprite.src = '/fire.png'

const smallRockSprite = new Image()
smallRockSprite.src = '/small_rock.png'

const longRockSprite = new Image()
longRockSprite.src = '/long_rock.png'

const bottleSprite = new Image()
bottleSprite.src = '/waterbottle.png'

function idxOf(x, y) {
  return y * GRID_W + x
}

function circleContains(x, y, circle) {
  const dx = x - circle.x
  const dy = y - circle.y
  return dx * dx + dy * dy <= circle.radius * circle.radius
}

function pointInRock(x, y, rock) {
  if (rock.type === 'circle') {
    return circleContains(x, y, rock)
  }

  return (
    x >= rock.x - rock.width / 2 &&
    x <= rock.x + rock.width / 2 &&
    y >= rock.y - rock.height / 2 &&
    y <= rock.y + rock.height / 2
  )
}

function isRockCell(gx, gy, level) {
  const x = gx * FLUID_CELL + FLUID_CELL * 0.5
  const y = gy * FLUID_CELL + FLUID_CELL * 0.5
  return (level.rocks || []).some((rock) => pointInRock(x, y, rock))
}

function clearTerrainMask(level) {
  terrainCtx.clearRect(0, 0, WIDTH, HEIGHT)
  const baseDirt = level.theme === 'cave' ? '#735744' : '#9f7a58'
  const stripeDirt = level.theme === 'cave' ? '#5b4537' : '#8a6549'

  terrainCtx.fillStyle = baseDirt
  terrainCtx.fillRect(0, TERRAIN_TOP, WIDTH, HEIGHT - TERRAIN_TOP)

  const carveCircle = (x, y, radius) => {
    terrainCtx.globalCompositeOperation = 'destination-out'
    terrainCtx.beginPath()
    terrainCtx.arc(x, y, radius, 0, Math.PI * 2)
    terrainCtx.fill()
    terrainCtx.globalCompositeOperation = 'source-over'
  }

  terrainCtx.fillStyle = stripeDirt
  for (let y = TERRAIN_TOP; y < HEIGHT; y += 14) {
    const variance = Math.sin(y * 0.18) * 3
    terrainCtx.fillRect(0, y + variance, WIDTH, 2)
  }

  carveCircle(level.source.x, level.source.y, level.source.radius + 40)
  // carveCircle(level.goal.x, level.goal.y, level.goal.radius)
  level.pockets.forEach((pocket) => carveCircle(pocket.x, pocket.y, pocket.radius))

  state.terrainImageData = terrainCtx.getImageData(0, 0, WIDTH, HEIGHT)
  rebuildSolidMask(level)
}

function rebuildSolidMask(level) {
  for (let gy = 0; gy < GRID_H; gy += 1) {
    for (let gx = 0; gx < GRID_W; gx += 1) {
      const x = Math.floor(gx * FLUID_CELL + FLUID_CELL * 0.5)
      const y = Math.floor(gy * FLUID_CELL + FLUID_CELL * 0.5)
      const pixelIndex = (y * WIDTH + x) * 4 + 3
      const isSolid = state.terrainImageData.data[pixelIndex] > 0
      const isRock = isRockCell(gx, gy, level)
      const edge = gx === 0 || gx === GRID_W - 1 || gy === GRID_H - 1
      state.solidMask[idxOf(gx, gy)] = isSolid || isRock || edge ? 1 : 0
    }
  }
}

function setStatus(text) {
  return text
}

function setFeedback(text) {
  return text
}

function setStars(starCount) {
  return starCount
}

function showEndModal(title, message, stars, showNext, imageSrc) {
  const view = ['☆', '☆', '☆']
  for (let index = 0; index < stars; index += 1) {
    view[index] = '★'
  }

  endTitleEl.textContent = title
  endMessageEl.textContent = message
  modalNextBtn.disabled = !showNext
  endModalEl.classList.remove('hidden')
  endImageEl.src = imageSrc
}

function hideEndModal() {
  endModalEl.classList.add('hidden')
}

function computeStars(level) {
  const kidDigScore = Math.ceil(state.digCount / 12)

  if (kidDigScore <= 90) {
    return 3
  }

  if (kidDigScore <= 150) {
    return 2
  }

  return 1
}

function resolveRound(reason) {
  if (state.hasResolvedRound) {
    return
  }

  state.hasResolvedRound = true
  const level = levels[state.currentLevelIndex]

  if (reason === 'overflow' || state.goalHits > level.pipeCapacity || state.currentValue > level.targetValue) {
    state.crabState = 'blown'
    setStatus('Pipe burst! Too much pressure. Try a different operation route.')
    setFeedback('Crab outcome: blown away 🌊🦀')
    state.earnedStars = 0
    setStars(0)
    showEndModal('Level failed', 'Too much water overflowed the water bottle.', 0, false, '/too_much.png')
    return
  }

  if (state.currentValue < level.targetValue) {
    state.crabState = 'sad'
    setStatus('Not enough water value reached the pipe.')
    setFeedback('Crab outcome: disappointed by a trickle 😞')
    state.earnedStars = 0
    setStars(0)
    showEndModal('Level failed', 'Not enough water to fill the bottle.', 0, false, '/no_water.png')
    return
  }

  state.crabState = 'happy'
  setStatus('Perfect match! The crab is happy and the water bottle is filled.')
  setFeedback('Exact arithmetic achieved ✅')
  state.earnedStars = computeStars(level)
  setStars(state.earnedStars)
  showEndModal('Level complete!', `You hit the target value ${level.targetValue}.`, state.earnedStars, true, '/perfect_amount.png')
}

function handlePocketActivation(pocket) {
  if (state.activeOperations.has(pocket.id)) return

  const previousValue = state.currentValue
  state.activeOperations.add(pocket.id)

  // FIRE POCKET
  if (pocket.delta < 0) {
    spawnEvaporation(pocket.x, pocket.y)

    pocket.fireState = 'coal'
  }

  state.currentValue += pocket.delta

  state.bottleFillTarget = state.currentValue / levels[state.currentLevelIndex].targetValue

  const prefix = pocket.delta > 0 ? '+' : ''
  setFeedback(`Applied ${prefix}${pocket.delta}. Current value is now ${state.currentValue}.`)
  spawnEquationFeedback(pocket, previousValue, pocket.delta, state.currentValue)
}

function spawnEvaporation(x, y) {
  for (let i = 0; i < 18; i++) {
    evaporationParticles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -Math.random() * 2.5,
      life: 40 + Math.random() * 20,
    })
  }
}

function spawnEquationFeedback(pocket, before, delta, after) {
  const operator = delta >= 0 ? '+' : '-'
  const magnitude = Math.abs(delta)
  floatingEquations.push({
    x: pocket.x,
    y: pocket.y - pocket.radius - 12,
    driftX: (Math.random() - 0.5) * 0.4,
    life: 0,
    maxLife: 240,
    text: `${before} ${operator} ${magnitude} = ${after}`,
    color: delta >= 0 ? '#ff9b37' : '#ff6b57',
  })
}

function seedInitialPool(level) {
  state.waterGrid.fill(0)
  state.poolLeft = level.poolAmount

  const sourceCells = []
  const fillRadius = level.source.radius * 0.8

  for (let gy = 1; gy < GRID_H - 1; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const x = gx * FLUID_CELL + FLUID_CELL * 0.5
      const y = gy * FLUID_CELL + FLUID_CELL * 0.5
      if (y < level.source.y - 6) {
        continue
      }

      if (circleContains(x, y, { x: level.source.x, y: level.source.y, radius: fillRadius })) {
        const index = idxOf(gx, gy)
        if (!state.solidMask[index]) {
          sourceCells.push(index)
        }
      }
    }
  }

  const perCell = Math.min(1, level.poolAmount / Math.max(1, sourceCells.length))
  let remaining = level.poolAmount

  for (const index of sourceCells) {
    if (remaining <= 0) {
      break
    }

    const placed = Math.min(perCell, remaining)
    state.waterGrid[index] = placed
    remaining -= placed
  }

  state.poolLeft = remaining + sourceCells.reduce((sum, index) => sum + state.waterGrid[index], 0)
}

function seedPositivePockets(level) {

  for (const pocket of level.pockets) {

    if (pocket.delta <= 0) continue

    const waterPerCell = (pocket.delta * 15) / pocket.cells.length

    for (const index of pocket.cells) {

      if (state.solidMask[index]) continue

      state.waterGrid[index] += waterPerCell

    }

  }

}

function fluidStep() {
  const level = levels[state.currentLevelIndex]
  const flowOrderLeftToRight = Math.random() > 0.5

  for (let gy = GRID_H - 2; gy >= 1; gy -= 1) {
    if (flowOrderLeftToRight) {
      for (let gx = 1; gx < GRID_W - 1; gx += 1) {
        moveCell(gx, gy)
      }
    } else {
      for (let gx = GRID_W - 2; gx >= 1; gx -= 1) {
        moveCell(gx, gy)
      }
    }
  }

  let drainedThisStep = 0
  for (let gy = 1; gy < GRID_H - 1; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const index = idxOf(gx, gy)
      if (state.solidMask[index]) {
        continue
      }

      const amount = state.waterGrid[index]
      if (amount <= 0.01) {
        continue
      }

      const x = gx * FLUID_CELL + FLUID_CELL * 0.5
      const y = gy * FLUID_CELL + FLUID_CELL * 0.5

      if (circleContains(x, y, level.goal)) {
        const drained = Math.min(amount, 0.1)
        state.waterGrid[index] -= drained
        drainedThisStep += drained
      }
    }
  }

  if (drainedThisStep > 0) {
    state.hasConnectedToGoal = true

    // turn ON bottle UI ONLY when water actually arrives
    state.showBottleUI = true
    state.isFillingBottle = true

    if (!state.firstGoalAt) {
      state.firstGoalAt = performance.now()
    }
    state.lastGoalFlowAt = performance.now()

    state.poolLeft = Math.max(0, state.poolLeft - drainedThisStep)
    state.goalFlowBuffer += drainedThisStep

    while (state.goalFlowBuffer >= FLOW_PACKET) {
      state.goalFlowBuffer -= FLOW_PACKET
      state.goalHits += 1
    }

    if (!state.hasResolvedRound && state.goalHits > level.pipeCapacity) {
      resolveRound('overflow')
    }
  }

  checkPocketTouches(level)
}

function moveCell(gx, gy) {
  const from = idxOf(gx, gy)
  if (state.solidMask[from]) {
    return
  }

  let amount = state.waterGrid[from]
  if (amount <= 0.001) {
    return
  }

  const below = idxOf(gx, gy + 1)
  const belowBlocked = state.solidMask[below]
  if (!state.solidMask[below]) {
    const downFlow = Math.min(amount, 1 - state.waterGrid[below], 0.76)
    if (downFlow > 0) {
      state.waterGrid[from] -= downFlow
      state.waterGrid[below] += downFlow
      amount -= downFlow
    }
  }

  if (amount <= 0.001) {
    return
  }

  const left = idxOf(gx - 1, gy)
  const right = idxOf(gx + 1, gy)
  const downLeft = idxOf(gx - 1, gy + 1)
  const downRight = idxOf(gx + 1, gy + 1)

  const canDownLeft = !state.solidMask[downLeft]
  const canDownRight = !state.solidMask[downRight]

  if ((canDownLeft || canDownRight) && amount > MIN_SPLIT_AMOUNT) {
    const first = Math.random() > 0.5 ? downLeft : downRight
    const second = first === downLeft ? downRight : downLeft

    if (!state.solidMask[first]) {
      const diagonalFlow = Math.min(amount, 1 - state.waterGrid[first], 0.42)
      if (diagonalFlow > 0) {
        state.waterGrid[from] -= diagonalFlow
        state.waterGrid[first] += diagonalFlow
        amount -= diagonalFlow
      }
    }

    if (amount > MIN_SPLIT_AMOUNT && !state.solidMask[second]) {
      const diagonalFlow = Math.min(amount, 1 - state.waterGrid[second], 0.16)
      if (diagonalFlow > 0) {
        state.waterGrid[from] -= diagonalFlow
        state.waterGrid[second] += diagonalFlow
        amount -= diagonalFlow
      }
    }
  }

  if (amount <= 0.001) {
    return
  }

  const sideOrder = Math.random() > 0.5 ? [left, right] : [right, left]
  const sideBoost = belowBlocked ? 1.65 : 1
  for (const side of sideOrder) {
    if (state.waterGrid[from] < MIN_SPLIT_AMOUNT) {
      break
    }

    if (state.solidMask[side]) {
      continue
    }

    const diff = state.waterGrid[from] - state.waterGrid[side]
    if (diff <= 0.04) {
      continue
    }

    const sideFlow = Math.min(state.waterGrid[from], diff * 0.28 * sideBoost, 0.2 * sideBoost)
    if (sideFlow > 0) {
      state.waterGrid[from] -= sideFlow
      state.waterGrid[side] += sideFlow
    }
  }
}

function mergeDroplets() {
  for (let gy = 1; gy < GRID_H - 1; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const from = idxOf(gx, gy)
      if (state.solidMask[from]) {
        continue
      }

      const amount = state.waterGrid[from]
      if (amount < MERGE_MIN || amount > MERGE_MAX) {
        continue
      }

      const candidates = [
        idxOf(gx, gy + 1),
        idxOf(gx - 1, gy),
        idxOf(gx + 1, gy),
        idxOf(gx, gy - 1),
      ]

      let bestIndex = -1
      let bestAmount = amount

      for (const candidate of candidates) {
        if (state.solidMask[candidate]) {
          continue
        }

        const candidateAmount = state.waterGrid[candidate]
        if (candidateAmount > bestAmount) {
          bestAmount = candidateAmount
          bestIndex = candidate
        }
      }

      if (bestIndex !== -1 && bestAmount - amount > 0.05) {
        const transfer = Math.min(amount * 0.55, 0.08)
        state.waterGrid[from] -= transfer
        state.waterGrid[bestIndex] += transfer
      }
    }
  }
}

function pocketTriggeredByFlow(gx, gy, pocket) {
  const neighbors = [
    idxOf(gx - 1, gy),
    idxOf(gx + 1, gy),
    idxOf(gx, gy - 1),
    idxOf(gx, gy + 1),
  ]

  for (const n of neighbors) {
    if (state.waterGrid[n] > 0.12) {
      return true
    }
  }

  return false
}

function checkPocketTouches(level) {

  for (const pocket of level.pockets) {

    if (state.activeOperations.has(pocket.id)) continue
    if (pocket.waitingForExternalFlow) continue

    for (const index of pocket.edgeCells) {

      const prev = state.prevWaterGrid[index]
      const now = state.waterGrid[index]

      if (prev < 0.01 && now > 0.08) {

        const gx = index % GRID_W
        const gy = Math.floor(index / GRID_W)

        const neighbors = [
          idxOf(gx - 1, gy),
          idxOf(gx + 1, gy),
          idxOf(gx, gy - 1),
          idxOf(gx, gy + 1),
        ]

        for (const n of neighbors) {

          if (pocket.cellSet.has(n)) continue

          if (state.prevWaterGrid[n] > 0.15) {

            handlePocketActivation(pocket)
            break

          }

        }

      }

    }

  }

}

function drawBackground() {
  const level = levels[state.currentLevelIndex]

  if (level.theme === 'cave') {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    gradient.addColorStop(0, '#1f2d3a')
    gradient.addColorStop(0.45, '#203849')
    gradient.addColorStop(1, '#2f4f5f')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = 'rgba(94, 168, 190, 0.16)'
    for (let i = 0; i < 9; i += 1) {
      const x = 60 + i * 102
      const y = 78 + (i % 3) * 24
      ctx.beginPath()
      ctx.arc(x, y, 24 + (i % 2) * 8, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = '#2c4658'
    for (let i = 0; i < 13; i += 1) {
      const x = i * 76
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + 16, 0)
      ctx.lineTo(x + 8, 26 + (i % 4) * 12)
      ctx.closePath()
      ctx.fill()
    }
    return
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  gradient.addColorStop(0, '#aee3ff')
  gradient.addColorStop(0.58, '#8ed4f7')
  gradient.addColorStop(1, '#7dcaf0')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.82)'
  const clouds = [
    [130, 62, 34],
    [306, 48, 28],
    [516, 70, 36],
    [738, 54, 30],
  ]

  clouds.forEach(([x, y, size]) => {
    ctx.beginPath()
    ctx.arc(x - 20, y, size * 0.55, 0, Math.PI * 2)
    ctx.arc(x + 10, y - 8, size * 0.62, 0, Math.PI * 2)
    ctx.arc(x + 36, y + 1, size * 0.5, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.fillStyle = '#ffd96b'
  ctx.beginPath()
  ctx.arc(84, 62, 28, 0, Math.PI * 2)
  ctx.fill()
}

function drawRocks(level) {

  for (const rock of level.rocks || []) {

    if (rock.type === 'circle') {

      const size = rock.radius * 2

      drawImageWithWhiteOutline(
        ctx,
        smallRockSprite,
        rock.x - rock.radius,
        rock.y - rock.radius,
        size,
        size
      )

    } else {

      drawImageWithWhiteOutline(
        ctx,
        longRockSprite,
        rock.x - rock.width / 2,
        rock.y - rock.height / 2,
        rock.width,
        rock.height
      )

    }

  }

}

function drawImageWithWhiteOutline(ctx, img, x, y, w, h) {
  if (!img.complete || !img.naturalWidth) {
    return
  }

  const outlineCanvas = document.createElement('canvas')
  outlineCanvas.width = Math.ceil(w)
  outlineCanvas.height = Math.ceil(h)
  const octx = outlineCanvas.getContext('2d')

  // draw original sprite shape
  octx.clearRect(0, 0, outlineCanvas.width, outlineCanvas.height)
  octx.drawImage(img, 0, 0, w, h)

  // replace visible pixels with solid white
  octx.globalCompositeOperation = 'source-in'
  octx.fillStyle = '#ffffff'
  octx.fillRect(0, 0, outlineCanvas.width, outlineCanvas.height)
  octx.globalCompositeOperation = 'source-over'

  const offsets = [
    [-2, 0], [2, 0], [0, -2], [0, 2],
    [-2, -2], [2, -2], [-2, 2], [2, 2],
  ]

  // draw white outline copies
  for (const [ox, oy] of offsets) {
    ctx.drawImage(outlineCanvas, x + ox, y + oy, w, h)
  }

  // draw actual rock on top
  ctx.drawImage(img, x, y, w, h)
}

function updateEvaporation() {
  for (let i = evaporationParticles.length - 1; i >= 0; i--) {
    const p = evaporationParticles[i]

    p.x += p.vx
    p.y += p.vy
    p.vy -= 0.02
    p.life -= 1

    if (p.life <= 0) {
      evaporationParticles.splice(i, 1)
    }
  }
}

function drawWater() {
  const pixels = waterFieldImage.data

  for (let gy = 1; gy < GRID_H - 1; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const index = idxOf(gx, gy)
      const pixel = index * 4

      if (state.solidMask[index]) {
        pixels[pixel + 0] = 0
        pixels[pixel + 1] = 0
        pixels[pixel + 2] = 0
        pixels[pixel + 3] = 0
        continue
      }

      const amount = state.waterGrid[index]
      const smooth =
        amount * 0.52 +
        state.waterGrid[idxOf(gx - 1, gy)] * 0.1 +
        state.waterGrid[idxOf(gx + 1, gy)] * 0.1 +
        state.waterGrid[idxOf(gx, gy - 1)] * 0.1 +
        state.waterGrid[idxOf(gx, gy + 1)] * 0.1 +
        state.waterGrid[idxOf(gx - 1, gy - 1)] * 0.04 +
        state.waterGrid[idxOf(gx + 1, gy - 1)] * 0.04

      if (smooth <= 0.02) {
        pixels[pixel + 0] = 0
        pixels[pixel + 1] = 0
        pixels[pixel + 2] = 0
        pixels[pixel + 3] = 0
        continue
      }

      const alpha = Math.min(255, Math.floor(68 + smooth * 170))
      pixels[pixel + 0] = 24
      pixels[pixel + 1] = 150
      pixels[pixel + 2] = 226
      pixels[pixel + 3] = alpha
    }
  }

  waterFieldCtx.putImageData(waterFieldImage, 0, 0)

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.filter = 'blur(3.2px) saturate(122%)'
  ctx.drawImage(waterFieldCanvas, 0, 0, WIDTH, HEIGHT)
  ctx.filter = 'blur(1.2px)'
  ctx.globalAlpha = 0.9
  ctx.drawImage(waterFieldCanvas, 0, 0, WIDTH, HEIGHT)
  ctx.globalAlpha = 1
  ctx.filter = 'none'

  ctx.strokeStyle = 'rgba(178, 232, 255, 0.38)'
  ctx.lineWidth = 2
  for (let gy = 1; gy < GRID_H - 2; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const amount = state.waterGrid[idxOf(gx, gy)]
      if (amount < 0.22) {
        continue
      }

      const above = state.waterGrid[idxOf(gx, gy - 1)]
      if (above > 0.08) {
        continue
      }

      const x = gx * FLUID_CELL
      const y = gy * FLUID_CELL
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + FLUID_CELL, y)
      ctx.stroke()
    }
  }
  ctx.restore()
}

function drawEvaporation() {
  ctx.save()

  for (const p of evaporationParticles) {
    ctx.globalAlpha = p.life / 60
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
  ctx.restore()
}

function drawTerrain(level) {
  ctx.drawImage(terrainCanvas, 0, 0)

  if (level.theme === 'surface') {
    ctx.fillStyle = '#54b953'
    ctx.fillRect(0, TERRAIN_TOP - 10, WIDTH, 10)
    ctx.fillStyle = '#3d8f3c'
    ctx.fillRect(0, TERRAIN_TOP - 3, WIDTH, 3)
  }

  drawRocks(level)

  level.pockets.forEach((pocket) => {
    const active = state.activeOperations.has(pocket.id)
    const isMinus = pocket.delta < 0
    const hovered = state.hoveredPocketId === pocket.id
    const pulse = 0.5 + Math.sin(performance.now() * 0.007 + pocket.x * 0.01) * 0.5
    const glowRadius = pocket.radius + (hovered ? 18 : 10) + pulse * 6

    ctx.beginPath()
    ctx.arc(pocket.x, pocket.y, glowRadius, 0, Math.PI * 2)
    ctx.fillStyle = isMinus
      ? `rgba(255, 129, 51, ${hovered ? 0.3 : 0.18})`
      : `rgba(68, 182, 255, ${hovered ? 0.28 : 0.18})`
    ctx.fill()

    ctx.beginPath()
    ctx.arc(pocket.x, pocket.y, pocket.radius, 0, Math.PI * 2)

    if (isMinus) {

      if (pocket.fireState === 'burning') {

        const frame = Math.floor(pocket.fireFrame)

        const frameWidth = fireSprite.width / FIRE_COLS
        const frameHeight = fireSprite.height / FIRE_ROWS

        const col = frame % FIRE_COLS
        const row = Math.floor(frame / FIRE_COLS)

        ctx.drawImage(
          fireSprite,
          col * frameWidth,
          row * frameHeight,
          frameWidth,
          frameHeight,
          pocket.x - pocket.radius,
          pocket.y - pocket.radius,
          pocket.radius * 2,
          pocket.radius * 2
        )

      }

      if (pocket.fireState === 'coal') {
        ctx.fillStyle = '#2a2a2a'
      }

    } else {
      ctx.fillStyle = active
        ? 'rgba(84,230,120,0.34)'
        : 'rgba(123,210,255,0.34)'
    }

    ctx.fill()

    ctx.lineWidth = 4
    ctx.strokeStyle = isMinus ? '#ff6b00' : '#2f9ee2'
    ctx.stroke()
  })

  ctx.beginPath()
  ctx.arc(level.source.x, level.source.y, level.source.radius, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(87, 193, 255, 0.34)'
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#1f85cb'
  ctx.stroke()

  /*
  ctx.beginPath()
  ctx.arc(level.goal.x, level.goal.y, level.goal.radius, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(126, 236, 165, 0.3)'
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = state.hasConnectedToGoal ? '#1a9b4f' : '#2aa862'
  ctx.stroke()
  */

  const bottleW = level.goal.radius * 2.5
  const bottleH = level.goal.radius * 2.4

  const bottleX = level.goal.x - bottleW / 3.5
  const bottleY = level.goal.y - bottleH / 2

  if (bottleSprite.complete) {
    ctx.drawImage(bottleSprite, bottleX, bottleY, bottleW, bottleH)
  }
}

function drawOverlay() {
  const level = levels[state.currentLevelIndex]
  ctx.save()

  drawSourceValueBadge(level)
  drawPipeTargetBadge(level)
  drawStartPrompt(level)

  level.pockets.forEach((pocket) => {
    const active = state.activeOperations.has(pocket.id)
    const isMinus = pocket.delta < 0

    ctx.beginPath()
    ctx.arc(pocket.x, pocket.y, pocket.radius, 0, Math.PI * 2)

    if (!isMinus && active) {
      ctx.fillStyle = 'rgba(68, 219, 119, 0.28)' // green only for positive
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    }

    ctx.fill()

    const hovered = state.hoveredPocketId === pocket.id
    const bounce = hovered ? Math.sin(performance.now() * 0.014) * 4 : 0

    ctx.font = '900 28px "Trebuchet MS", Arial, sans-serif'
    ctx.fillStyle = pocket.delta < 0 ? (pocket.fireState == 'burning' ? '#aa4300' : '#ff7300') : '#0c6fb5'
    const text = pocket.delta > 0 ? `+${pocket.delta}` : `${pocket.delta}`
    const labelWidth = ctx.measureText(text).width
    ctx.fillText(text, pocket.x - labelWidth / 2, pocket.y + 10 + bounce)
  })

  const crabOffset = 64
  const crabY = state.crabState === 'sad' ? level.goal.y + 32 : level.goal.y + 32
  const crabFace = state.crabState === 'happy' ? '🦀🙂' : state.crabState === 'sad' ? '🦀☹️' : '🦀🌊'
  ctx.font = '3vw Arial'
  ctx.fillText(state.crabState === 'neutral' ? '🦀' : crabFace, level.goal.x - 24 + crabOffset, crabY)

  const bottleW = level.goal.radius * 1.6
  const bottleH = level.goal.radius * 2.4

  const bottleX = level.goal.x - bottleW / 2
  const bottleY = level.goal.y - bottleH / 2

  // fill amount
  if (state.showBottleUI) {
    const fillRatio = state.bottleFillDisplay
    const fillHeight = bottleH * fillRatio

    ctx.fillStyle = 'rgba(50, 170, 255, 0.6)'

    ctx.fillRect(
      bottleX + bottleW * 0.15,
      bottleY + bottleH - fillHeight,
      bottleW * 0.7,
      fillHeight
    )

      if (fillRatio >= 1 - 0.2) {
        // glowing warning
        ctx.fillStyle = 'rgba(255, 60, 60, 0.25)'
        ctx.fillRect(bottleX, bottleY, bottleW, bottleH)

        // overflow spill (top)
        //ctx.fillStyle = 'rgba(50, 170, 255, 0.5)'

        ctx.fillRect(
          bottleX + bottleW * 0.2,
          bottleY - 8,
          bottleW * 0.6,
          8
        )
      }
  }

  const targetRatio = state.bottleFillTarget
  const targetY = bottleY + 23

  ctx.strokeStyle = '#ff3b3b'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(bottleX + bottleW * 0.1, targetY)
  ctx.lineTo(bottleX + bottleW * 0.9, targetY)
  ctx.stroke()

  drawFloatingEquations()
  ctx.restore()
}

function drawSourceValueBadge(level) {
  const anchor = getWaterLabelPosition(level)
  const currentText = `${Math.round(state.currentValue)}`
  const sublabel = 'Current'

  ctx.save()
  ctx.shadowColor = 'rgba(0, 93, 158, 0.24)'
  ctx.shadowBlur = 18
  ctx.fillStyle = 'rgba(255, 255, 255, 0.96)'
  roundRectPath(anchor.x - 34, anchor.y - 30, 68, 54, 18)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.lineWidth = 3
  ctx.strokeStyle = '#2796da'
  ctx.stroke()

  ctx.fillStyle = '#1e6fa8'
  ctx.font = '700 13px "Trebuchet MS", Arial, sans-serif'
  const subWidth = ctx.measureText(sublabel).width
  ctx.fillText(sublabel, anchor.x - subWidth / 2, anchor.y - 10)

  ctx.fillStyle = '#0e5d95'
  ctx.font = '900 26px "Trebuchet MS", Arial, sans-serif'
  const textWidth = ctx.measureText(currentText).width
  ctx.fillText(currentText, anchor.x - textWidth / 2, anchor.y + 16)
  ctx.restore()
}

function drawPipeTargetBadge(level) {
  const label = `Target: ${level.targetValue}`
  const x = level.goal.x - 70
  const y = level.goal.y - level.goal.radius - 78

  ctx.save()
  ctx.shadowColor = 'rgba(15, 110, 52, 0.22)'
  ctx.shadowBlur = 16
  ctx.fillStyle = 'rgba(245, 255, 246, 0.95)'
  roundRectPath(x, y, 140, 42, 14)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.lineWidth = 3
  ctx.strokeStyle = '#2aa862'
  ctx.stroke()

  ctx.fillStyle = '#1f7a47'
  ctx.font = '900 20px "Trebuchet MS", Arial, sans-serif'
  const textWidth = ctx.measureText(label).width
  ctx.fillText(label, x + 70 - textWidth / 2, y + 27)

  ctx.strokeStyle = '#2aa862'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(x + 70, y + 42)
  ctx.lineTo(level.goal.x, level.goal.y - level.goal.radius - 10)
  ctx.stroke()
  ctx.restore()
}

function drawStartPrompt(level) {
  if (state.introOverlayDismissed) {
    return
  }

  const pulse = 0.5 + Math.sin(performance.now() * 0.01) * 0.5
  const digStartX = level.source.x + 34
  const digStartY = level.source.y + level.source.radius + 42
  const labelX = digStartX - 56
  const labelY = digStartY - 66
  const isTutorial = Boolean(level.tutorial)

  ctx.save()

  if (isTutorial) {
    ctx.fillStyle = 'rgba(7, 48, 70, 0.82)'
    roundRectPath(WIDTH / 2 - 230, 18, 460, 138, 20)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.font = '900 24px "Trebuchet MS", Arial, sans-serif'
    const title = 'Welcome to the tutorial'
    const titleWidth = ctx.measureText(title).width
    ctx.fillText(title, WIDTH / 2 - titleWidth / 2, 50)

    ctx.font = '700 16px "Trebuchet MS", Arial, sans-serif'
    const lines = [
      'Drag or hold to carve a tunnel from the source to the pipe.',
      'Click to dig a single chunk instead of dragging.',
      'Reach the goal with exactly the target value: 3.',
      'Use the blue bubble nearby to add +2 to the water value.',
    ]

    lines.forEach((line, index) => {
      ctx.fillText(line, WIDTH / 2 - 208, 78 + index * 22)
    })

    ctx.strokeStyle = 'rgba(74, 204, 255, 0.85)'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(level.pockets[0].x, level.pockets[0].y, level.pockets[0].radius + 12, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.font = '800 15px "Trebuchet MS", Arial, sans-serif'
    const pocketHint = 'Tap this bubble to add +2'
    const pocketHintWidth = ctx.measureText(pocketHint).width
    ctx.fillText(pocketHint, level.pockets[0].x - pocketHintWidth / 2, level.pockets[0].y - level.pockets[0].radius - 18)
  } else {
    ctx.fillStyle = 'rgba(7, 48, 70, 0.72)'
    roundRectPath(WIDTH / 2 - 180, 24, 360, 54, 18)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = '900 24px "Trebuchet MS", Arial, sans-serif'
    const message = `Make the water equal ${level.targetValue}`
    const textWidth = ctx.measureText(message).width
    ctx.fillText(message, WIDTH / 2 - textWidth / 2, 58)

    ctx.fillStyle = 'rgba(7, 48, 70, 0.82)'
    roundRectPath(labelX - 10, labelY - 24, 148, 34, 12)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = 'rgba(255, 248, 226, 0.98)'
    ctx.font = '800 17px "Trebuchet MS", Arial, sans-serif'
    ctx.fillText('Start digging here', labelX, labelY)

    ctx.strokeStyle = `rgba(255, 196, 72, ${0.6 + pulse * 0.25})`
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(labelX + 94, labelY + 8)
    ctx.lineTo(digStartX + 10, digStartY - 18)
    ctx.stroke()

    ctx.fillStyle = `rgba(255, 196, 72, ${0.8 + pulse * 0.15})`
    ctx.beginPath()
    ctx.moveTo(digStartX + 2, digStartY - 2)
    ctx.lineTo(digStartX + 30, digStartY - 12)
    ctx.lineTo(digStartX + 12, digStartY - 30)
    ctx.closePath()
    ctx.fill()

    ctx.lineWidth = 4
    ctx.strokeStyle = `rgba(255, 231, 163, ${0.5 + pulse * 0.35})`
    ctx.beginPath()
    ctx.arc(digStartX + 4, digStartY + 4, 18 + pulse * 8, 0, Math.PI * 2)
    ctx.stroke()
  }

  ctx.restore()
}

function drawFloatingEquations() {
  floatingEquations.forEach((entry) => {
    const alpha = 1 - entry.life / entry.maxLife
    const rise = entry.life * 0.55

    ctx.save()
    ctx.globalAlpha = Math.max(0, alpha)
    ctx.font = '800 18px "Trebuchet MS", Arial, sans-serif'
    const width = Math.max(132, ctx.measureText(entry.text).width + 22)
    ctx.fillStyle = 'rgba(255,255,255,0.96)'
    roundRectPath(entry.x - width / 2, entry.y - rise - 24, width, 34, 14)
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = entry.color
    ctx.stroke()
    ctx.fillStyle = entry.color
    ctx.fillText(entry.text, entry.x - ctx.measureText(entry.text).width / 2, entry.y - rise - 2)
    ctx.restore()
  })
}

function updateFloatingEquations() {
  for (let i = floatingEquations.length - 1; i >= 0; i -= 1) {
    const entry = floatingEquations[i]
    entry.life += 1
    entry.x += entry.driftX
    if (entry.life >= entry.maxLife) {
      floatingEquations.splice(i, 1)
    }
  }
}

function getWaterLabelPosition(level) {
  let weightedX = 0
  let weightedY = 0
  let total = 0

  for (let gy = 1; gy < GRID_H - 1; gy += 1) {
    for (let gx = 1; gx < GRID_W - 1; gx += 1) {
      const amount = state.waterGrid[idxOf(gx, gy)]
      if (amount < 0.24) {
        continue
      }

      const x = gx * FLUID_CELL + FLUID_CELL * 0.5
      const y = gy * FLUID_CELL + FLUID_CELL * 0.5
      weightedX += x * amount
      weightedY += y * amount
      total += amount
    }
  }

  if (total < 1) {
    return { x: level.source.x, y: level.source.y + 6 }
  }

  return {
    x: weightedX / total,
    y: weightedY / total,
  }
}

function roundRectPath(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function dismissIntroOverlay() {
  state.introOverlayDismissed = true
  state.hasInteracted = true
}

function digAt(worldX, worldY, radius) {
  if (state.hasResolvedRound) {
    return
  }

  dismissIntroOverlay()

  terrainCtx.globalCompositeOperation = 'destination-out'
  terrainCtx.beginPath()
  terrainCtx.arc(worldX, worldY, radius, 0, Math.PI * 2)
  terrainCtx.fill()
  terrainCtx.globalCompositeOperation = 'source-over'
  state.terrainImageData = terrainCtx.getImageData(0, 0, WIDTH, HEIGHT)
  rebuildSolidMask(levels[state.currentLevelIndex])

  state.digCount += 1
  setFeedback('Digging tunnel through solid dirt...')
}

function setupDigHandlers() {
  const pointerToWorld = (event) => {
    const rect = canvas.getBoundingClientRect()
  
    const scaleX = WIDTH / rect.width
    const scaleY = HEIGHT / rect.height 
   
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    }
  }

  canvas.addEventListener('pointerdown', (event) => {
    dismissIntroOverlay()
    state.mouseDown = true
    const { x, y } = pointerToWorld(event)
    if (state.digMode !== 'continuous') {
      digAt(x, y, 29)
    }
  })

  window.addEventListener('pointerup', () => {
    state.mouseDown = false
  })

  canvas.addEventListener('pointermove', (event) => {
    const { x, y } = pointerToWorld(event)
    const level = levels[state.currentLevelIndex]
    const hoveredPocket = level.pockets.find((pocket) => circleContains(x, y, pocket))
    state.hoveredPocketId = hoveredPocket ? hoveredPocket.id : null

    if (!state.mouseDown || state.digMode !== 'continuous') {
      return
    }

    dismissIntroOverlay()
    digAt(x, y, 21)
  })

  canvas.addEventListener('pointerleave', () => {
    state.hoveredPocketId = null
  })
}

function loadLevel(levelIndex) {
  state.currentLevelIndex = levelIndex
  levelSelect.value = String(levelIndex)

  const level = levels[levelIndex]
  state.currentValue = level.startValue
  state.goalHits = 0
  state.digCount = 0
  state.hasConnectedToGoal = false
  state.hasResolvedRound = false
  state.crabState = 'neutral'
  state.activeOperations.clear()
  state.goalFlowBuffer = 0
  state.firstGoalAt = null
  state.lastGoalFlowAt = null
  state.earnedStars = 0
  state.showBottleUI = false
  state.isFillingBottle = false
  state.bottleFillDisplay = 0
  state.bottleFillTarget = 0
  state.hoveredPocketId = null
  state.hasInteracted = false
  state.introOverlayDismissed = false
  state.introOverlayStartedAt = performance.now()
  floatingEquations.length = 0

  for (const pocket of level.pockets) {

    pocket.waitingForExternalFlow = true
    pocket.cells = []

    const minX = Math.max(1, Math.floor((pocket.x - pocket.radius) / FLUID_CELL))
    const maxX = Math.min(GRID_W - 2, Math.ceil((pocket.x + pocket.radius) / FLUID_CELL))
    const minY = Math.max(1, Math.floor((pocket.y - pocket.radius) / FLUID_CELL))
    const maxY = Math.min(GRID_H - 2, Math.ceil((pocket.y + pocket.radius) / FLUID_CELL))

    for (let gy = minY; gy <= maxY; gy++) {
      for (let gx = minX; gx <= maxX; gx++) {

        const x = gx * FLUID_CELL + FLUID_CELL * 0.5
        const y = gy * FLUID_CELL + FLUID_CELL * 0.5

        if (circleContains(x, y, pocket)) {
          pocket.cells.push(idxOf(gx, gy))
        }

      }
    }

    pocket.cellSet = new Set(pocket.cells)

    pocket.edgeCells = pocket.cells.filter((index) => {
      const gx = index % GRID_W
      const gy = Math.floor(index / GRID_W)

      const neighbors = [
        idxOf(gx - 1, gy),
        idxOf(gx + 1, gy),
        idxOf(gx, gy - 1),
        idxOf(gx, gy + 1),
      ]

      // keep only boundary cells (touching outside)
      return neighbors.some((n) => !pocket.cellSet.has(n))
    })

    if (pocket.delta < 0) {
      pocket.fireState = 'burning'
      pocket.fireFrame = 0
    }

  }

  setTimeout(() => {
    for (const pocket of level.pockets) {
      pocket.waitingForExternalFlow = false
    }
  }, 200)

  setStars(0)
  hideEndModal()
  clearTerrainMask(level)
  seedInitialPool(level)
  seedPositivePockets(level)

  setStatus('Finite pool loaded. Dig a route before your water runs out.')
  setFeedback(`Reach ${level.targetValue}. Modifier bubbles change your current value.`)
}

function updateFluidAndResolve() {
  state.prevWaterGrid.set(state.waterGrid)

  if (state.hasResolvedRound) {
    return
  }

  for (let i = 0; i < 5; i += 1) {
    fluidStep()
  }

  mergeDroplets()

  if (state.hasResolvedRound) {
    return
  }

  if (state.goalHits > levels[state.currentLevelIndex].pipeCapacity) {
    resolveRound('overflow')
    return
  }

  if (state.hasConnectedToGoal && state.lastGoalFlowAt && performance.now() - state.lastGoalFlowAt > 1800) {
    resolveRound('goal-connected')
    return
  }

  if (state.poolLeft < 1 && !state.hasConnectedToGoal) {
    resolveRound('goal-connected')
  }
}

function updateFire(level) {

  for (const pocket of level.pockets) {

    if (pocket.delta < 0 && pocket.fireState === 'burning') {

      pocket.fireFrame += 0.15

      if (pocket.fireFrame >= FIRE_TOTAL_FRAMES) {
        pocket.fireFrame = 0
      }

    }

  }

}

function tick(now) {
  state.lastFrameAt = now

  updateFluidAndResolve()
  updateEvaporation()
  updateFloatingEquations()
  updateFire(levels[state.currentLevelIndex])

  // smooth animation toward target
  if (state.isFillingBottle) {
    const speed = 0.02
    state.bottleFillDisplay += (state.bottleFillTarget - state.bottleFillDisplay - 0.2) * speed
  }

  drawBackground()
  drawTerrain(levels[state.currentLevelIndex])
  drawWater()
  drawEvaporation()
  drawOverlay()

  state.frameHandle = requestAnimationFrame(tick)
}

function syncStageSize() {
  const viewportHeight = window.innerHeight
  const wrapRect = stageWrapEl.getBoundingClientRect()
  const availableHeight = Math.max(260, viewportHeight - wrapRect.top - 16)
  const aspect = WIDTH / HEIGHT
  const availableWidth = Math.max(280, stageWrapEl.clientWidth)
  const stageWidth = Math.min(availableWidth, availableHeight * aspect)
  stageEl.style.width = `${stageWidth}px`
  stageEl.style.height = `${stageWidth / aspect}px`
}

setupDigHandlers()
loadLevel(0)
syncStageSize()
state.frameHandle = requestAnimationFrame(tick)

window.addEventListener('resize', syncStageSize)

levelSelect.addEventListener('change', (event) => {
  const nextIndex = Number(event.target.value)
  loadLevel(nextIndex)
})

restartBtn.addEventListener('click', () => {
  loadLevel(state.currentLevelIndex)
})

nextBtn.addEventListener('click', () => {
  const nextIndex = (state.currentLevelIndex + 1) % levels.length
  loadLevel(nextIndex)
})

digModeBtn.addEventListener('click', () => {
  if (state.digMode === 'continuous') {
    state.digMode = 'chunk'
    digModeBtn.textContent = 'Dig mode: Chunk'
    return
  }

  state.digMode = 'continuous'
  digModeBtn.textContent = 'Dig mode: Continuous'
})

retryBtn.addEventListener('click', () => {
  loadLevel(state.currentLevelIndex)
})

modalNextBtn.addEventListener('click', () => {
  if (modalNextBtn.disabled) {
    return
  }

  const nextIndex = (state.currentLevelIndex + 1) % levels.length
  loadLevel(nextIndex)
})


