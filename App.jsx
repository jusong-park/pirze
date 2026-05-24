import React from 'react'

import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  onValue,
  set
} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD8mQ_EnzOPmUhOj6sdOPMdBdIazhZSSd8",
  authDomain: "grape-prize-355da.firebaseapp.com",
  databaseURL: "https://grape-prize-355da-default-rtdb.firebaseio.com",
  projectId: "grape-prize-355da",
  storageBucket: "grape-prize-355da.firebasestorage.app",
  messagingSenderId: "369756260951",
  appId: "1:369756260951:web:89a3662a7a3166990b7112"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export default function App() {

  const grapes = [1, 2, 3, 4, 5]
  const total = grapes.reduce((a, b) => a + b, 0)

  const [filled, setFilled] = React.useState(
    Array(total).fill(false)
  )

  React.useEffect(() => {

    const grapeRef = ref(database, 'grapes')

    onValue(grapeRef, (snapshot) => {

      const data = snapshot.val()

      if (data && data.filled) {
        setFilled(data.filled)
      }

    })

  }, [])

  const toggleGrape = (index) => {

    const updated = [...filled]

    updated[index] = !updated[index]

    setFilled(updated)

    set(ref(database, 'grapes'), {
      filled: updated
    })

  }

  const resetAll = () => {

    const cleared = Array(total).fill(false)

    setFilled(cleared)

    set(ref(database, 'grapes'), {
      filled: cleared
    })

  }

  let currentIndex = 0

  return (

    <div style={{
      minHeight: '100vh',
      background: '#f3e8ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        width: '400px',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
      }}>

        <h1>🍇 벌점 말고 상점 </h1>

        <p>
          {filled.filter(Boolean).length} / {total}
        </p>

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
                    width: '42px',
                    height: '42px',
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
