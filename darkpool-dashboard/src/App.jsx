import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY

export default function App() {
  const [symbol, setSymbol] = useState("AAPL")
  const [input, setInput] = useState("AAPL")
  const [quote, setQuote] = useState(null)
  const [history, setHistory] = useState([])

  const fetchQuote = async (ticker) => {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`
    )
    const json = await res.json()
    setQuote(json)

    // fake intraday curve based on real price (Finnhub free tier limitation)
    const base = json.c

    const mockChart = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      price: base + (Math.random() - 0.5) * 2,
    }))

    setHistory(mockChart)
  }

  useEffect(() => {
    fetchQuote(symbol)
  }, [symbol])

  const change = quote?.d
  const percent = quote?.dp

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Institutional Dashboard</h1>
          <p className="text-zinc-400">Live price + market structure view</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <input
            className="bg-zinc-900 border border-zinc-700 px-3 py-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
          />

          <button
            className="bg-emerald-600 px-4 py-2 rounded"
            onClick={() => setSymbol(input)}
          >
            Load
          </button>
        </div>

        {/* Price Card */}
        <div className="bg-zinc-900 p-6 rounded">
          <div className="flex justify-between">
            <h2 className="text-zinc-400">Price</h2>
            <span className="text-zinc-500">{symbol}</span>
          </div>

          <div className="text-4xl font-bold mt-2">
            ${quote?.c?.toFixed(2) || "--"}
          </div>

          <div
            className={`mt-2 ${
              change >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {change?.toFixed(2)} ({percent?.toFixed(2)}%)
          </div>
        </div>

        {/* Chart */}
        <div className="bg-zinc-900 p-6 rounded h-80">
          <h2 className="text-zinc-400 mb-4">Price Structure</h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}