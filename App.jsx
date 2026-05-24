import React from 'react'

export default function App() {
  const grapes = [1, 2, 3, 4, 5]
  const total = grapes.reduce((a, b) => a + b, 0)

  const [filled, setFilled] = React.useState(
    Array(total).fill(false)
  )

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
    <div style={{
      minHeight: '100vh',
      background: '#f3e8ff',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        width: '400px',
        textAlign: 'center'
      }}>
        <h1>🍇 포도알 채우기</h1>

        <button
          onClick={resetAll}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '10px',
            background: '#9333ea',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          초기화
        </button>

        <div>
          {grapes.map((count, rowIndex) => {
            const row = []

            for (let i = 0; i < count; i++) {
              const grapeIndex = currentIndex

              row.push(
                <button
                  key={grapeIndex}
                  onClick={() => toggleGrape(grapeIndex)}
                  style={{
                    width: '55px',
                    height: '55px',
                    margin: '4px',
                    borderRadius: '50%',
                    border: '2px solid #9333ea',
                    background: filled[grapeIndex]
                      ? '#9333ea'
                      : 'white',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  🍇
                </button>
              )

              currentIndex++
            }

            return (
              <div key={rowIndex}>
                {row}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
