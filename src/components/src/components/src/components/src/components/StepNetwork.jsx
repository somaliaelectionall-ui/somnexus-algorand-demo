import React from 'react'
import { STEPS } from '../data/steps'

export default function StepNetwork({ activeStep, onStepClick, isFraudMode }) {
  return (
    <div className="network-section">
      <div className="network-title"><i className="ti ti-share-2" /><span>END‑TO‑END AID DELIVERY · 13 STEPS</span></div>
      <div className="network-grid">
        {STEPS.map(step => (
          <div key={step.n} className={`step-node ${activeStep === step.n ? 'active' : ''} ${activeStep > step.n ? 'done' : ''} ${isFraudMode && step.n === 11 ? 'fraud-active' : ''}`} onClick={() => onStepClick(step.n)}>
            <div className="step-circle">{step.n}</div>
            <div className="step-label">{step.short}</div>
          </div>
        ))}
      </div>
      <div className="vam-bar"><span>SMARTVISTA VAM ENGINE</span><span className="vam-dot" /><span style={{ fontSize: 9 }}>12,000 wallets · 47 merchants</span></div>
    </div>
  )
}
