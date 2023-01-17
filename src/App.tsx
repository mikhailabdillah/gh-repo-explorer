import s from './App.module.css'

function App() {
  return (
    <main className={s.app}>
      <div className={s.wrapper}>
        <h1>GitHub repositories explorer</h1>
        <div className={s.card}></div>
      </div>
    </main>
  )
}

export default App
