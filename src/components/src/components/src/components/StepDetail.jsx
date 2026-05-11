import React from 'react'

export default function StepDetail({ step }) {
  if (!step) return (
    <div className="step-detail">
      <div className="detail-header"><i className="ti ti-info-circle" />Select a step</div>
      <div className="step-empty"><i className="ti ti-click" style={{ fontSize: 32, opacity: 0.3 }} /><div className="empty-hint">Click any node above to see details.</div></div>
    </div>
  )
  return (
    <div className="step-detail">
      <div className="detail-header">
        <div className="detail-icon" style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}>
          <i className={`ti ${step.icon}`} style={{ color: step.color }} />
        </div>
        <div><div style={{ fontSize: 16, fontWeight: 600 }}>{step.title}</div><div style={{ fontSize: 11, color: '#8B9BB4' }}>Step {step.n} of 13</div></div>
      </div>
      <div className="detail-body">
        <div className="detail-section"><div className="label">SUMMARY</div><p style={{ fontSize: 13, marginTop: 6 }}>{step.summary}</p></div>
        <div className="detail-section"><div className="label">ACTORS</div>{step.actors.map(a => <div key={a} className="detail-tag" style={{ background: `${step.color}20`, color: step.color }}>{a}</div>)}</div>
        <div className="detail-section"><div className="label">TECH</div>{step.tech.map(t => <div key={t} className="detail-tag" style={{ background: '#1E293B', color: '#8B9BB4' }}>{t}</div>)}</div>
        <div className="detail-section"><div className="label">DETAILS</div>{step.detail.map(([k, v]) => <div key={k} className="detail-row"><div className="detail-key">{k}</div><div className="detail-val">{v}</div></div>)}</div>
        <div className="detail-section"><div className="label">ALGORAND AUDIT</div><div className="check-item"><i className="ti ti-check" /> Immutable on‑chain event</div><div className="check-item"><i className="ti ti-check" /> fingerprint_match = TRUE enforced</div><div className="check-item"><i className="ti ti-check" /> Donor‑verifiable proof</div></div>
      </div>
    </div>
  )
}
