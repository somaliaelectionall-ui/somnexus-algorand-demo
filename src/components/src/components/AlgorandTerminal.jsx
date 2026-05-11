import React from 'react'

export default function AlgorandTerminal({ ledger }) {
  return (
    <div className="algo-terminal">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#F87171' }} />
        <div className="terminal-dot" style={{ background: '#FBBF24' }} />
        <div className="terminal-dot" style={{ background: '#34D399' }} />
        <span className="terminal-title">ALGORAND TESTNET</span>
      </div>
      <div className="terminal-stats">
        <div className="t-stat"><span className="t-stat-label">BLOCK:</span><span className="t-stat-value">#47M</span></div>
        <div className="t-stat"><span className="t-stat-label">USDC LOCKED:</span><span className="t-stat-value">$600K</span></div>
      </div>
      <div className="terminal-col-heads">
        <div className="t-col-head">TIME</div><div className="t-col-head">HASH</div><div className="t-col-head">BENEF</div>
        <div className="t-col-head">ACTOR</div><div className="t-col-head">EVENT</div><div className="t-col-head">AMOUNT</div>
      </div>
      <div className="terminal-rows">
        {ledger.map((row, i) => (
          <div key={row.hash + i} className={`terminal-row ${i === 0 ? 'fresh' : ''} ${!row.ok ? 'blocked' : ''}`}>
            <div className="t-block">{row.ts || '—'}</div>
            <div className="t-hash">{row.hash}</div>
            <div className="t-id">{row.id}</div>
            <div className="t-actor">{row.actor}</div>
            <div className="t-event"><span className="event-pill">{row.event}</span></div>
            <div className="t-amount">{row.amount}</div>
          </div>
        ))}
        {ledger.length === 0 && <div className="terminal-row"><div style={{ gridColumn: '1/-1', textAlign: 'center' }}>No transactions yet. Tap card.</div></div>}
      </div>
      <div className="terminal-input"><span className="terminal-prompt">$</span><span className="terminal-cursor">_</span><span style={{ fontSize: 10, marginLeft: 8, color: '#4A5568' }}>fingerprint_match enforced</span></div>
    </div>
  )
}
