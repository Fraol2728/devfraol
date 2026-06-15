import { ScrollAnimation } from "@/components/ScrollAnimation";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, RefreshCw, Repeat2, TrendingUp, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const COOLDOWN_SEC = 30;

const CHART_PERIODS = [
  { key: "today", label: "Today" },
  { key: "month", label: "1 Month" },
  { key: "year", label: "1 Year" },
];

const PAGE_PERIODS = [
  { key: "today", label: "Today" },
  { key: "1week", label: "1 Week" },
  { key: "1month", label: "1 Month" },
  { key: "6months", label: "6 Months" },
  { key: "1year", label: "1 Year" },
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parseDate = (str) => {
  if (!str) return null;
  try {
    const [datePart, rest] = str.split(", ");
    if (!rest) return null;
    const [timeStr, meridiem] = rest.trim().split(" ");
    let [h, m, s] = timeStr.split(":").map(Number);
    const mer = meridiem?.toLowerCase();
    if (mer === "pm" && h !== 12) h += 12;
    if (mer === "am" && h === 12) h = 0;
    return new Date(
      `${datePart} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    );
  } catch {
    return null;
  }
};

const fmtHour = (h) => {
  if (h === 0) return "12am";
  if (h < 12) return `${h}am`;
  if (h === 12) return "12pm";
  return `${h - 12}pm`;
};

const getChartData = (visitors, chartPeriod) => {
  const now = new Date();

  if (chartPeriod === "today") {
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const buckets = Array(24).fill(0);
    visitors.forEach((v) => {
      const ls = parseDate(v.lastSeenAt),
        fv = parseDate(v.firstVisitAt);
      let hit = null;
      if (ls && ls >= dayStart && ls < dayEnd) hit = ls;
      else if (fv && fv >= dayStart && fv < dayEnd) hit = fv;
      if (hit) buckets[hit.getHours()]++;
    });
    return buckets.map((value, h) => ({
      label: h % 4 === 0 ? fmtHour(h) : "",
      fullLabel: `${fmtHour(h)} – ${fmtHour(h === 23 ? 0 : h + 1)}`,
      value,
    }));
  }

  if (chartPeriod === "month") {
    const yr = now.getFullYear(),
      mo = now.getMonth(),
      today = now.getDate();
    const buckets = Array(today).fill(0);
    visitors.forEach((v) => {
      const ls = parseDate(v.lastSeenAt),
        fv = parseDate(v.firstVisitAt);
      let hit = null;
      if (ls && ls.getFullYear() === yr && ls.getMonth() === mo) hit = ls;
      else if (fv && fv.getFullYear() === yr && fv.getMonth() === mo) hit = fv;
      if (hit) {
        const idx = hit.getDate() - 1;
        if (idx < today) buckets[idx]++;
      }
    });
    const ms = MONTHS_SHORT[mo];
    return buckets.map((value, i) => ({
      label: (i + 1) % 5 === 1 ? String(i + 1) : "",
      fullLabel: `${ms} ${i + 1}`,
      value,
    }));
  }

  if (chartPeriod === "year") {
    const yr = now.getFullYear(),
      curMonth = now.getMonth();
    const buckets = Array(curMonth + 1).fill(0);
    visitors.forEach((v) => {
      const ls = parseDate(v.lastSeenAt),
        fv = parseDate(v.firstVisitAt);
      let hit = null;
      if (ls && ls.getFullYear() === yr && ls.getMonth() <= curMonth) hit = ls;
      else if (fv && fv.getFullYear() === yr && fv.getMonth() <= curMonth)
        hit = fv;
      if (hit) buckets[hit.getMonth()]++;
    });
    return buckets.map((value, i) => ({
      label: MONTHS_SHORT[i],
      fullLabel: null,
      value,
    }));
  }

  return [];
};

const getPeriodFilterStart = (key) => {
  const now = new Date();
  switch (key) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "1week":
      return new Date(now.setDate(now.getDate() - 7));
    case "1month":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "6months":
      return new Date(now.setMonth(now.getMonth() - 6));
    case "1year":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(0);
  }
};

const filterByPeriod = (visitors, key) => {
  const start = getPeriodFilterStart(key);
  return visitors.filter((v) => {
    const l = parseDate(v.lastSeenAt),
      f = parseDate(v.firstVisitAt);
    return (l && l >= start) || (f && f >= start);
  });
};

const getPageCounts = (visitors) => {
  const map = {};
  visitors.forEach((v) =>
    (v.pagesVisited || []).forEach((p) => {
      map[p] = (map[p] || 0) + 1;
    }),
  );
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
};

// ── Column Chart ──────────────────────────────────────────────────────────────

const ColumnChart = ({ data }) => {
  const [tooltip, setTooltip] = useState(null);

  const n = data.length;
  if (!n)
    return (
      <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
        No data for this period
      </div>
    );

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const W = 620,
    H = 230;
  const pL = 36,
    pR = 16,
    pB = 40,
    pT = 28;
  const chartH = H - pB - pT;
  const chartW = W - pL - pR;
  const maxBarW = n <= 12 ? 28 : n <= 20 ? 13 : 8;
  const barW = Math.min(maxBarW, Math.floor((chartW / n) * 0.52));
  const spacing = (chartW - n * barW) / (n + 1);

  const handleBarEnter = (i, d) => {
    if (!d.value) return;
    const barH = Math.max((d.value / maxVal) * chartH, 2);
    const barCenterX = pL + spacing + i * (barW + spacing) + barW / 2;
    const barTopY = pT + chartH - barH;
    setTooltip({
      idx: i,
      leftPct: (barCenterX / W) * 100,
      topPct: (barTopY / H) * 100,
      value: d.value,
      label: d.fullLabel,
    });
  };

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <div className="min-w-[320px]">
        <div className="relative w-full" onMouseLeave={() => setTooltip(null)}>
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${tooltip.leftPct}%`,
                  top: `${tooltip.topPct}%`,
                  transform: "translate(-50%, -115%)",
                }}
              >
                <div
                  style={{
                    background: "rgba(10,10,14,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "8px 13px",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.65)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {tooltip.value} visitor{tooltip.value !== 1 ? "s" : ""}
                  </p>
                  {tooltip.label && (
                    <p
                      style={{
                        color: "#9ca3af",
                        fontSize: "11px",
                        lineHeight: 1.3,
                        margin: "3px 0 0",
                      }}
                    >
                      {tooltip.label}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            {[1, 0.75, 0.5, 0.25, 0].map((ratio, gi) => {
              const y = pT + chartH * (1 - ratio);
              return (
                <g key={gi}>
                  <line
                    x1={pL}
                    y1={y}
                    x2={W - pR}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    strokeDasharray={ratio === 1 ? "none" : "3,3"}
                  />
                  <text
                    x={pL - 6}
                    y={y + 4}
                    textAnchor="end"
                    fill="#4b5563"
                    fontSize="10"
                  >
                    {Math.round(maxVal * ratio)}
                  </text>
                </g>
              );
            })}
            {data.map((d, i) => {
              const barH = Math.max(
                (d.value / maxVal) * chartH,
                d.value > 0 ? 2 : 0,
              );
              const x = pL + spacing + i * (barW + spacing);
              const y = pT + chartH - barH;
              const active = tooltip?.idx === i;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={pT}
                    width={barW}
                    height={chartH}
                    fill={
                      active
                        ? "rgba(255,255,255,0.055)"
                        : "rgba(255,255,255,0.025)"
                    }
                    rx="3"
                    onMouseEnter={() => handleBarEnter(i, d)}
                    style={{ cursor: d.value > 0 ? "pointer" : "default" }}
                  />
                  {d.value > 0 && (
                    <rect
                      x={x}
                      y={y}
                      width={barW}
                      height={barH}
                      fill={
                        active
                          ? "rgba(255,255,255,0.92)"
                          : "rgba(255,255,255,0.72)"
                      }
                      rx="3"
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {d.label && (
                    <text
                      x={x + barW / 2}
                      y={H - 8}
                      textAnchor="middle"
                      fill="#4b5563"
                      fontSize="10"
                    >
                      {d.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

// ── Horizontal Bar Chart ──────────────────────────────────────────────────────

const HorizontalBarChart = ({ data }) => {
  if (!data.length)
    return (
      <div className="flex items-center justify-center h-32 text-gray-600 text-sm">
        No data for this period
      </div>
    );

  const maxVal = Math.max(...data.map((d) => d[1]), 1);
  const rowH = 28,
    barH = 14,
    barPadT = (rowH - barH) / 2;
  const H = data.length * rowH + 16,
    W = 500;
  const labelW = 90,
    countW = 36,
    barAreaW = W - labelW - countW;

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <div className="min-w-[280px]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {data.map(([page, count], i) => {
            const bW = Math.max((count / maxVal) * barAreaW, count > 0 ? 3 : 0);
            const y = i * rowH + 8,
              centerY = y + barPadT + barH / 2;
            return (
              <g key={page}>
                <text
                  x={labelW - 8}
                  y={centerY}
                  textAnchor="end"
                  dominantBaseline="central"
                  fill="#6b7280"
                  fontSize="11"
                >
                  {page === "/" ? "/home" : page}
                </text>
                <rect
                  x={labelW}
                  y={y + barPadT}
                  width={barAreaW}
                  height={barH}
                  fill="rgba(255,255,255,0.04)"
                  rx="3"
                />
                <rect
                  x={labelW}
                  y={y + barPadT}
                  width={bW}
                  height={barH}
                  fill="rgba(255,255,255,0.72)"
                  rx="3"
                />
                <text
                  x={labelW + barAreaW + 8}
                  y={centerY}
                  dominantBaseline="central"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  {count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// ── Period Tab Bar ────────────────────────────────────────────────────────────

const PeriodTabs = ({ periods, active, onChange }) => (
  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none flex-shrink-0">
    {periods.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
          active === key
            ? "bg-white text-black"
            : "bg-white/10 text-gray-400 hover:bg-white/15 hover:text-white"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Analytics = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartPeriod, setChartPeriod] = useState("today");
  const [activePeriodTab, setActivePeriodTab] = useState("today");
  const [lastFetched, setLastFetched] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const cooldownRef = useRef(null);

  const startCooldown = useCallback(() => {
    clearInterval(cooldownRef.current);
    setCooldown(COOLDOWN_SEC);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(cooldownRef.current), []);

  const fetchData = useCallback(async () => {
    if (!API_URL) {
      setError("API URL not configured.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/visitors`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      setVisitors(json.data || []);
      setLastFetched(new Date());
    } catch (e) {
      setError(e.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
      startCooldown();
    }
  }, [startCooldown]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isRefreshDisabled = loading || cooldown > 0;

  const chartData = getChartData(visitors, chartPeriod);
  const chartTotal = chartData.reduce((s, d) => s + d.value, 0);
  const filteredVisitors = filterByPeriod(visitors, activePeriodTab);
  const pageData = getPageCounts(filteredVisitors);

  const dateLabel =
    chartPeriod === "today"
      ? new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : chartPeriod === "month"
        ? new Date().toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          })
        : new Date().getFullYear();

  return (
    <div className="min-h-screen pt-20 px-3 sm:px-4 max-w-6xl mx-auto pb-20">
      {/* ── Page Header ── */}
      <ScrollAnimation>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-7 h-7 sm:w-8 sm:h-8" />
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Analytics
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {lastFetched && (
              <span className="text-gray-500 text-xs">
                Updated {lastFetched.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={isRefreshDisabled}
              title={
                cooldown > 0 ? `Available in ${cooldown}s` : "Refresh data"
              }
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden
                ${
                  isRefreshDisabled
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/15 text-white cursor-pointer"
                }`}
            >
              {/* cooldown progress bar */}
              {cooldown > 0 && (
                <motion.div
                  className="absolute inset-0 bg-white/5 origin-left"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: COOLDOWN_SEC, ease: "linear" }}
                />
              )}
              <RefreshCw
                className={`w-4 h-4 relative z-10 ${loading ? "animate-spin" : ""}`}
              />
              <span className="relative z-10 min-w-[60px] text-center">
                {loading
                  ? "Loading…"
                  : cooldown > 0
                    ? `${cooldown}s`
                    : "Refresh"}
              </span>
            </button>
          </div>
        </div>
      </ScrollAnimation>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && !visitors.length ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading analytics...
        </div>
      ) : (
        <>
          {/* ── Visitor Count ── */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Visitor Count
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chartTotal} visitor{chartTotal !== 1 ? "s" : ""} ·{" "}
                    {dateLabel}
                  </span>
                </div>
                <PeriodTabs
                  periods={CHART_PERIODS}
                  active={chartPeriod}
                  onChange={setChartPeriod}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={chartPeriod}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <ColumnChart data={chartData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollAnimation>

          {/* ── Most Visited Pages ── */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 mb-4 sm:mb-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    Most Visited Pages
                  </h3>
                </div>
                <PeriodTabs
                  periods={PAGE_PERIODS}
                  active={activePeriodTab}
                  onChange={setActivePeriodTab}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePeriodTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <HorizontalBarChart data={pageData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollAnimation>

          {/* ── Repeat Visitors ── */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <Repeat2 className="w-5 h-5 text-gray-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Repeat Visitors
                </h3>
                <span className="text-xs text-gray-500 ml-1">
                  (visitCount &gt; 1)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {PAGE_PERIODS.map(({ key, label }) => {
                  const pv = filterByPeriod(visitors, key);
                  const repeat = pv.filter((v) => v.visitCount > 1).length;
                  const total = pv.length;
                  const pct =
                    total > 0 ? Math.round((repeat / total) * 100) : 0;
                  return (
                    <div
                      key={key}
                      className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <p className="text-xs text-gray-500 mb-2">{label}</p>
                      <p className="text-3xl font-bold text-white">{repeat}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {pct}% of {total}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimation>
        </>
      )}
    </div>
  );
};

export default Analytics;
