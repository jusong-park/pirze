export default function GrapeTrackerApp() {
  const grapes = [1, 2, 3, 4, 5]
  const total = grapes.reduce((a, b) => a + b, 0)

  const [filled, setFilled] = React.useState(Array(total).fill(false))
  const [roomName, setRoomName] = React.useState('우리 포도알')

  React.useEffect(() => {
    const saved = localStorage.getItem('grape-room')
    if (saved) {
      const parsed = JSON.parse(saved)
      setFilled(parsed.filled)
      setRoomName(parsed.roomName)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem(
      'grape-room',
      JSON.stringify({ filled, roomName })
    )
  }, [filled, roomName])

  const toggleGrape = (index) => {
    const updated = [...filled]
    updated[index] = !updated[index]
    setFilled(updated)
  }

  const resetAll = () => {
    setFilled(Array(total).fill(false))
  }

  let currentIndex = 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-violet-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full">
        <div className="flex items-center justify-between mb-6 gap-3">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="text-2xl font-bold border rounded-xl px-4 py-2 w-full"
          />

          <button
            onClick={resetAll}
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            초기화
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            {filled.filter(Boolean).length} / {total} 개 채움
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-violet-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(filled.filter(Boolean).length / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-8">
          {grapes.map((count, rowIndex) => {
            const row = []

            for (let i = 0; i < count; i++) {
              const grapeIndex = currentIndex
              row.push(
                <button
                  key={grapeIndex}
                  onClick={() => toggleGrape(grapeIndex)}
                  className={`w-16 h-16 rounded-full text-3xl transition-all duration-200 shadow-md hover:scale-105 ${
                    filled[grapeIndex]
                      ? 'bg-violet-500 text-white'
                      : 'bg-white border-2 border-violet-300 text-violet-300'
                  }`}
                >
                  🍇
                </button>
              )

              currentIndex++
            }

            return (
