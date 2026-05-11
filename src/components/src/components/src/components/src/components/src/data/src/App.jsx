import React, { useState, useCallback } from 'react'
import StepNetwork from './components/StepNetwork'
import StepDetail from './components/StepDetail'
import MerchantApp from './components/MerchantApp'
import AlgorandTerminal from './components/AlgorandTerminal'
import { STEPS, INITIAL_LEDGER, DEMO_SEQUENCE } from './data/steps'

function App() {
  const [activeStep, setActiveStep] = useState(7)
  const [ledger, setLedger] = useState(INITIAL_LEDGER)
  const [isFraudMode, setIsFraudMode] = useState(false)
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [demoProgress, setDemoProgress] = useState(0)
  const [statusMsg, setStatusMsg] = useState('System ready · awaiting tap')

  const handleTransaction = useCallback((result) => {
    if (result.success && !isFraudMode) {
      setStatusMsg(`✅ Approved: $${result.amount} · posting to Algorand`)
      const newEntry = { block: 47829150, hash: `ALGO-${Date.now().toString(36)}`, id: 'SO-BDO-4821', actor: 'Yusuf Ahmed', event: 'REDEMPTION', amount: `$${result.amount}`, ok: true, ts: new Date().toLocaleTimeString() }
      setLedger(prev => [newEntry, ...prev].slice(0, 15))
      setActiveStep(8)
    } else if (!result.success && result.isFraud) {
      setStatusMsg('🚨 FRAUD BLOCKED · biometric mismatch · immutable alert on Algorand')
      const fraudEntry = { block: 47829155, hash: `FRAUD-${Date.now().toString(36)}`, id: 'SO-BDO-4803', actor: 'Ahmed (camp leader)', event: 'FRAUD_BLOCKED', amount: '$0.00', ok: false, ts: new Date().toLocaleTimeString() }
      setLedger(prev => [fraudEntry, ...prev].slice(0, 15))
      setActiveStep(11)
    }
  }, [isFraudMode])

  const runDemo = async () => {
    setIsDemoRunning(true)
    for (let i = 0; i < DEMO_SEQUENCE.length; i++) {
      const seq = DEMO_SEQUENCE[i]
      setActiveStep(seq.step)
      setStatusMsg(seq.label)
      setDemoProgress(((i + 1) / DEMO_SEQUENCE.length) * 100)
      await new Promise(r => setTimeout(r, seq.duration))
    }
    setStatusMsg('Demo complete · full on‑chain audit trail verified')
    setIsDemoRunning(false)
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-logo"><div className="logo-mark">SX</div><div className="logo-text">Somnexus<span className="logo-sub">× Algorand</span></div></div>
        <div className="topbar-spacer" />
        <div className="live-badge"><span className="live-dot" />TESTNET • LIVE</div>
        <button className="btn-demo" onClick={runDemo} disabled={isDemoRunning}><i className="ti ti-player-play" /> {isDemoRunning ? 'RUNNING...' : 'RUN DEMO (13 steps)'}</button>
        <button className="btn-fraud" onClick={() => setIsFraudMode(m => !m)} disabled={isDemoRunning}><i className="ti ti-shield-x" /> {isFraudMode ? 'FRAUD MODE ON' : 'SIMULATE FRAUD'}</button>
        <button className="btn-reset" onClick={() => window.location.reload()}>⟳ RESET</button>
      </div>
      <div className="ticker">
        <div className="ticker-inner">
          {['MERCHANTS:47','BENEF:12K','TOTAL DISBURSED:$284K','FRAUD BLOCKED:3','AVG TX:7.8s','COST:$1.50','VAM:ONLINE'].map(t => <div key={t} className="ticker-item"><div className="ticker-label">{t}</div></div>)}
          {['MERCHANTS:47','BENEF:12K','TOTAL DISBURSED:$284K','FRAUD BLOCKED:3','AVG TX:7.8s','COST:$1.50','VAM:ONLINE'].map(t => <div key={t+'dup'} className="ticker-item"><div className="ticker-label">{t}</div></div>)}
        </div>
      </div>
      <StepNetwork activeStep={activeStep} onStepClick={setActiveStep} isFraudMode={isFraudMode} />
      <div className="main-panels">
        <StepDetail step={STEPS.find(s => s.n === activeStep)} />
        <div className="merchant-panel">
          <div className="merchant-panel-header"><div className="label">BPC SMARTVISTA • LIGHTWEIGHT</div><div className="label" style={{ color: '#00D4A8' }}>NFC ENABLED</div></div>
          <MerchantApp onTransactionComplete={handleTransaction} isFraudMode={isFraudMode} />
          <div className="status-strip"><span className="status-step">STATUS:</span><span className="status-msg">{statusMsg}</span></div>
        </div>
        <AlgorandTerminal ledger={ledger} />
      </div>
      {isDemoRunning && <div className="demo-progress"><div className="demo-progress-fill" style={{ width: `${demoProgress}%` }} /></div>}
    </div>
  )
}

export default App
