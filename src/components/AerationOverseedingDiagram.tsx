import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Animated educational diagram for the overseeding service page.
 *
 * Shows a real spreader pattern: a single green "snake head" traces a
 * continuous back-and-forth zigzag path, leaving a seed trail behind it.
 *
 * Three panels in a synchronized loop:
 *   1. First Pass  — zigzag down column 1 / up column 2 / down column 3...
 *                    across all 8 vertical columns (N↔S boustrophedon).
 *   2. Second Pass — same zigzag rotated 90°, across all 8 horizontal rows
 *                    (W↔E boustrophedon).
 *   3. Result      — the full cross pattern holds with a "no gaps" badge.
 *
 * Respects prefers-reduced-motion — shows the final static state with no
 * motion if the visitor opts out.
 */

// ─── Grid / timing constants ────────────────────────────
const NUM_LINES = 8;
const VERT_SEGMENT = 0.3; // seconds per vertical (or horizontal) pass
const HORIZ_SEGMENT = 0.07; // seconds per 90° turn at the end of each pass

const PANEL_DURATION =
  NUM_LINES * VERT_SEGMENT + (NUM_LINES - 1) * HORIZ_SEGMENT;

const PHASE1_START = 0;
const PHASE1_END = PHASE1_START + PANEL_DURATION;
const PHASE2_START = PHASE1_END + 0.25;
const PHASE2_END = PHASE2_START + PANEL_DURATION;
const RESULT_START = PHASE2_END + 0.2;
const RESULT_END = RESULT_START + 0.6;
const BADGE_START = RESULT_START + 0.35;
const HOLD_END = RESULT_END + 1.3;
const FADEOUT_END = HOLD_END + 0.5;
const CYCLE = FADEOUT_END + 0.3;

const n = (t: number) => t / CYCLE;

// ─── Geometry ───────────────────────────────────────────
const VIEWBOX = 130;
const LAWN_X = 18;
const LAWN_Y = 18;
const LAWN_SIZE = 96;
const LAWN_END = LAWN_X + LAWN_SIZE;
const LAWN_CENTER_X = LAWN_X + LAWN_SIZE / 2;
const LAWN_CENTER_Y = LAWN_Y + LAWN_SIZE / 2;

const linePositions = Array.from(
  { length: NUM_LINES },
  (_, i) => LAWN_X + (i + 1) * (LAWN_SIZE / (NUM_LINES + 1)),
);

const LAWN_TOP = LAWN_Y + 3;
const LAWN_BOTTOM = LAWN_END - 3;
const LAWN_LEFT = LAWN_X + 3;
const LAWN_RIGHT = LAWN_END - 3;

const BRAND = "hsl(var(--color-brand))";
const SEED = "hsl(var(--color-highlight))";

// ─── Path builders (zigzag / boustrophedon) ─────────────
interface Waypoint {
  x: number;
  y: number;
  t: number;
}

const buildPanel1Path = (): Waypoint[] => {
  // Vertical zigzag: down col 0 → across → up col 1 → across → down col 2...
  const points: Waypoint[] = [];
  for (let i = 0; i < NUM_LINES; i++) {
    const colX = linePositions[i];
    const goingDown = i % 2 === 0;
    const startY = goingDown ? LAWN_TOP : LAWN_BOTTOM;
    const endY = goingDown ? LAWN_BOTTOM : LAWN_TOP;
    const colStart = PHASE1_START + i * (VERT_SEGMENT + HORIZ_SEGMENT);
    const colEnd = colStart + VERT_SEGMENT;
    points.push({ x: colX, y: startY, t: colStart });
    points.push({ x: colX, y: endY, t: colEnd });
  }
  return points;
};

const buildPanel2Path = (): Waypoint[] => {
  // Horizontal zigzag: right across row 0 → down → left across row 1 → down...
  const points: Waypoint[] = [];
  for (let i = 0; i < NUM_LINES; i++) {
    const rowY = linePositions[i];
    const goingRight = i % 2 === 0;
    const startX = goingRight ? LAWN_LEFT : LAWN_RIGHT;
    const endX = goingRight ? LAWN_RIGHT : LAWN_LEFT;
    const rowStart = PHASE2_START + i * (VERT_SEGMENT + HORIZ_SEGMENT);
    const rowEnd = rowStart + VERT_SEGMENT;
    points.push({ x: startX, y: rowY, t: rowStart });
    points.push({ x: endX, y: rowY, t: rowEnd });
  }
  return points;
};

const panel1Path = buildPanel1Path();
const panel2Path = buildPanel2Path();

// ─── Shared pieces ──────────────────────────────────────
const loopTransition = {
  duration: CYCLE,
  repeat: Infinity,
  ease: "linear" as const,
};

const Panel = ({
  label,
  sublabel,
  children,
  caption,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
  caption: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="text-center mb-3">
      <div className="font-headline text-sm md:text-base text-ink font-extrabold uppercase tracking-wider">
        {label}
      </div>
      <div className="font-body text-xs md:text-sm text-brand font-bold">
        {sublabel}
      </div>
    </div>
    {children}
    <p className="font-body text-xs text-paragraph text-center mt-3 max-w-[220px] leading-snug">
      {caption}
    </p>
  </div>
);

const LawnBackground = () => (
  <rect
    x={LAWN_X}
    y={LAWN_Y}
    width={LAWN_SIZE}
    height={LAWN_SIZE}
    rx="6"
    fill="hsl(var(--color-brand) / 0.08)"
    stroke="hsl(var(--color-brand) / 0.25)"
    strokeWidth="1"
  />
);

const DirectionLabel = ({
  orientation,
}: {
  orientation: "NS" | "WE";
}) => {
  if (orientation === "NS") {
    return (
      <>
        <text
          x={10}
          y={14}
          fontSize="6"
          fontWeight="800"
          fill={BRAND}
          textAnchor="middle"
        >
          N
        </text>
        <text
          x={10}
          y={LAWN_END + 8}
          fontSize="6"
          fontWeight="800"
          fill={BRAND}
          textAnchor="middle"
        >
          S
        </text>
      </>
    );
  }
  return (
    <>
      <text
        x={LAWN_X - 10}
        y={LAWN_Y + 4}
        fontSize="6"
        fontWeight="800"
        fill={BRAND}
        textAnchor="middle"
      >
        W
      </text>
      <text
        x={LAWN_END + 10}
        y={LAWN_Y + 4}
        fontSize="6"
        fontWeight="800"
        fill={BRAND}
        textAnchor="middle"
      >
        E
      </text>
    </>
  );
};

// ─── Snake head ────────────────────────────────────────
// A filled green circle with a subtle pulsing glow. Follows a zigzag path
// defined by a Waypoint[] and is hidden outside its active phase via opacity.
const SnakeHead = ({
  path,
  phaseStart,
  phaseEnd,
}: {
  path: Waypoint[];
  phaseStart: number;
  phaseEnd: number;
}) => {
  // Position keyframes across the full cycle — after the phase ends, the
  // snake holds its last waypoint (invisible) and snaps back to the first
  // waypoint right at the end of the cycle for a seamless loop.
  const xValues = path.map((p) => p.x);
  const yValues = path.map((p) => p.y);
  const tValues = path.map((p) => n(p.t));

  // Append hold point at end of cycle pointing back at start
  const last = path[path.length - 1];
  const first = path[0];
  xValues.push(last.x, first.x);
  yValues.push(last.y, first.y);
  tValues.push(n(CYCLE - 0.05), 1);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
      transition={{
        ...loopTransition,
        times: [
          0,
          n(Math.max(0, phaseStart - 0.02)),
          n(phaseStart),
          n(phaseEnd),
          n(phaseEnd + 0.2),
          1,
        ],
      }}
    >
      <motion.circle
        r="4"
        fill={BRAND}
        stroke="white"
        strokeWidth="1"
        initial={{ cx: first.x, cy: first.y }}
        animate={{ cx: xValues, cy: yValues }}
        transition={{
          ...loopTransition,
          times: tValues,
        }}
      />
    </motion.g>
  );
};

const AerationOverseedingDiagram = () => {
  const shouldReduceMotion = useReducedMotion();

  // ───────────────────────────────────────────────────────
  // Reduced motion: static final state, no animation
  // ───────────────────────────────────────────────────────
  if (shouldReduceMotion) {
    return (
      <figure
        className="bg-callout border-2 border-brand/15 rounded-3xl p-5 md:p-8"
        aria-label="Diagram showing how Amigos overseeds with two full back-and-forth passes — one vertical, one horizontal — for even coverage with no gaps"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {(["NS", "WE", "both"] as const).map((mode, idx) => (
            <Panel
              key={mode}
              label={
                idx === 0 ? "First Pass" : idx === 1 ? "Second Pass" : "Result"
              }
              sublabel={
                idx === 0
                  ? "N ↔ S"
                  : idx === 1
                    ? "W ↔ E"
                    : "Even, Full Coverage"
              }
              caption={
                idx === 0
                  ? "A continuous back-and-forth pass across every column."
                  : idx === 1
                    ? "A second pass rotated 90° from the first."
                    : "Two perpendicular zigzag passes leave no thin spots."
              }
            >
              <svg
                viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
                className="w-full max-w-[200px] aspect-square"
                role="presentation"
              >
                <LawnBackground />
                {mode === "NS" && <DirectionLabel orientation="NS" />}
                {mode === "WE" && <DirectionLabel orientation="WE" />}
                {(mode === "NS" || mode === "both") &&
                  linePositions.map((x, i) => (
                    <line
                      key={`v-${i}`}
                      x1={x}
                      y1={LAWN_TOP}
                      x2={x}
                      y2={LAWN_BOTTOM}
                      stroke={SEED}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="2 3"
                    />
                  ))}
                {(mode === "WE" || mode === "both") &&
                  linePositions.map((y, i) => (
                    <line
                      key={`h-${i}`}
                      x1={LAWN_LEFT}
                      y1={y}
                      x2={LAWN_RIGHT}
                      y2={y}
                      stroke={SEED}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="2 3"
                    />
                  ))}
              </svg>
              {mode === "both" && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-brand text-white font-body font-bold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3" />
                  No thin spots, no gaps
                </div>
              )}
            </Panel>
          ))}
        </div>
        <figcaption className="text-center font-body text-sm md:text-base text-paragraph mt-6 md:mt-8 font-bold">
          Two full back-and-forth passes — vertical first, then horizontal —
          so your lawn gets perfectly even coverage.
        </figcaption>
      </figure>
    );
  }

  // ───────────────────────────────────────────────────────
  // Main looping animation
  // ───────────────────────────────────────────────────────
  return (
    <figure
      className="bg-callout border-2 border-brand/15 rounded-3xl p-5 md:p-8"
      aria-label="Animated diagram showing how Amigos overseeds with two full back-and-forth passes — one vertical, one horizontal — for even coverage with no gaps"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {/* ───── Panel 1 — Vertical zigzag (N↔S) ───── */}
        <Panel
          label="First Pass"
          sublabel="N ↔ S"
          caption="A continuous back-and-forth pass across every column."
        >
          <svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            className="w-full max-w-[200px] aspect-square"
            role="presentation"
          >
            <LawnBackground />
            <DirectionLabel orientation="NS" />

            {/* Seed trail — each column draws during its zigzag pass */}
            {linePositions.map((x, i) => {
              const goingDown = i % 2 === 0;
              const y1 = goingDown ? LAWN_TOP : LAWN_BOTTOM;
              const y2 = goingDown ? LAWN_BOTTOM : LAWN_TOP;
              const colStart =
                PHASE1_START + i * (VERT_SEGMENT + HORIZ_SEGMENT);
              const colEnd = colStart + VERT_SEGMENT;
              return (
                <motion.line
                  key={`v-${i}`}
                  x1={x}
                  y1={y1}
                  x2={x}
                  y2={y2}
                  stroke={SEED}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{
                    pathLength: [0, 0, 0, 1, 1, 1, 0],
                    opacity: [1, 1, 1, 1, 1, 0, 0],
                  }}
                  transition={{
                    ...loopTransition,
                    times: [
                      0,
                      n(Math.max(0, colStart - 0.02)),
                      n(colStart),
                      n(colEnd),
                      n(HOLD_END),
                      n(FADEOUT_END),
                      1,
                    ],
                  }}
                />
              );
            })}

            {/* Snake head traversing the vertical zigzag */}
            <SnakeHead
              path={panel1Path}
              phaseStart={PHASE1_START}
              phaseEnd={PHASE1_END}
            />
          </svg>
        </Panel>

        {/* ───── Panel 2 — Horizontal zigzag (W↔E) ───── */}
        <Panel
          label="Second Pass"
          sublabel="W ↔ E"
          caption="A second pass rotated 90° from the first."
        >
          <svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            className="w-full max-w-[200px] aspect-square"
            role="presentation"
          >
            <LawnBackground />
            <DirectionLabel orientation="WE" />

            {/* Verticals from Pass 1 — fade in as dim reference lines */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.4, 0.4, 0, 0] }}
              transition={{
                ...loopTransition,
                times: [
                  0,
                  n(PHASE1_END),
                  n(PHASE2_START - 0.05),
                  n(HOLD_END),
                  n(FADEOUT_END),
                  1,
                ],
              }}
            >
              {linePositions.map((x, i) => (
                <line
                  key={`vref-${i}`}
                  x1={x}
                  y1={LAWN_TOP}
                  x2={x}
                  y2={LAWN_BOTTOM}
                  stroke={SEED}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                />
              ))}
            </motion.g>

            {/* Seed trail — each row draws during its zigzag pass */}
            {linePositions.map((y, i) => {
              const goingRight = i % 2 === 0;
              const x1 = goingRight ? LAWN_LEFT : LAWN_RIGHT;
              const x2 = goingRight ? LAWN_RIGHT : LAWN_LEFT;
              const rowStart =
                PHASE2_START + i * (VERT_SEGMENT + HORIZ_SEGMENT);
              const rowEnd = rowStart + VERT_SEGMENT;
              return (
                <motion.line
                  key={`h-${i}`}
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke={SEED}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{
                    pathLength: [0, 0, 0, 1, 1, 1, 0],
                    opacity: [1, 1, 1, 1, 1, 0, 0],
                  }}
                  transition={{
                    ...loopTransition,
                    times: [
                      0,
                      n(Math.max(0, rowStart - 0.02)),
                      n(rowStart),
                      n(rowEnd),
                      n(HOLD_END),
                      n(FADEOUT_END),
                      1,
                    ],
                  }}
                />
              );
            })}

            {/* Snake head traversing the horizontal zigzag */}
            <SnakeHead
              path={panel2Path}
              phaseStart={PHASE2_START}
              phaseEnd={PHASE2_END}
            />
          </svg>
        </Panel>

        {/* ───── Panel 3 — Result ───── */}
        <Panel
          label="Result"
          sublabel="Even, Full Coverage"
          caption="Two perpendicular zigzag passes leave no thin spots."
        >
          <svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            className="w-full max-w-[200px] aspect-square"
            role="presentation"
          >
            <LawnBackground />

            <motion.g
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: [0, 0, 1, 1, 0, 0],
                scale: [0.92, 0.92, 1, 1, 1, 0.95],
              }}
              transition={{
                ...loopTransition,
                times: [
                  0,
                  n(RESULT_START),
                  n(RESULT_END),
                  n(HOLD_END),
                  n(FADEOUT_END),
                  1,
                ],
              }}
              style={{
                transformOrigin: `${LAWN_CENTER_X}px ${LAWN_CENTER_Y}px`,
              }}
            >
              {linePositions.map((x, i) => (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={LAWN_TOP}
                  x2={x}
                  y2={LAWN_BOTTOM}
                  stroke={SEED}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                />
              ))}
              {linePositions.map((y, i) => (
                <line
                  key={`h-${i}`}
                  x1={LAWN_LEFT}
                  y1={y}
                  x2={LAWN_RIGHT}
                  y2={y}
                  stroke={SEED}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="2 3"
                />
              ))}
            </motion.g>
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              y: [8, 8, 0, 0, 0, 0],
            }}
            transition={{
              ...loopTransition,
              times: [
                0,
                n(BADGE_START),
                n(BADGE_START + 0.4),
                n(HOLD_END),
                n(FADEOUT_END),
                1,
              ],
            }}
            className="mt-3 inline-flex items-center gap-1.5 bg-brand text-white font-body font-bold text-[10px] md:text-xs uppercase tracking-wider px-3 py-1.5 rounded-full"
          >
            <Check className="w-3 h-3" />
            No thin spots, no gaps
          </motion.div>
        </Panel>
      </div>

      <figcaption className="text-center font-body text-sm md:text-base text-paragraph mt-6 md:mt-8 font-bold">
        Two full back-and-forth passes — vertical first, then horizontal — so
        your lawn gets perfectly even coverage.
      </figcaption>
    </figure>
  );
};

export default AerationOverseedingDiagram;
