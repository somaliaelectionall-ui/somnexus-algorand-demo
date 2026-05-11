import React, { useState } from 'react'

export default function MerchantApp({ onTransactionComplete, isFraudMode }) {
  const [screen, setScreen] = useState('home')
  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState([])
  const [txResult, setTxResult] = useState(null)

  const resetFlow = () => { setScreen('home'); setAmount(''); setPin([]); setTxResult(null) }
  const addDigit = (d) => {
    if (screen === 'amount' && amount.length < 5) setAmount(amount + d)
    else if (screen === 'pin' && pin.length < 4) setPin([...pin, d])
  }
  const clearLast = () => {
    if (screen === 'amount') setAmount(amount.slice(0, -1))
    else if (screen === 'pin') setPin(pin.slice(0, -1))
  }
  const handleTap = () => { setScreen('nfc'); setTimeout(() => setScreen('amount'), 1200) }
  const handleAmountConfirm = () => { if (parseFloat(amount) > 0) setScreen('pin') }
  const handlePinComplete = async () => {
    if (pin.length !== 4) return
    setScreen('processing')
    await new Promise(r => setTimeout(r, 800))
    if (isFraudMode) {
      setTxResult({ success: false, message: 'Biometric mismatch – transaction blocked' })
      setScreen('approved')
      if (onTransactionComplete) onTransactionComplete({ success: false, amount: 0, isFraud: true })
      return
    }
    await new Promise(r => setTimeout(r, 600))
    const amountNum = parseFloat(amount)
    setTxResult({ success: true, amount: amountNum, txId: `ALGO-${Date.now().toString(36)}` })
    setScreen('approved')
    if (onTransactionComplete) onTransactionComplete({ success: true, amount: amountNum })
  }
  React.useEffect(() => { if (screen === 'pin' && pin.length === 4) handlePinComplete() }, [pin])

  const renderScreen = () => {
    if (screen === 'home') return (
      <div className="phone-screen">
        <div className="wallet-card-phone">
          <div className="wallet-glow" />
          <div style={{ fontSize: 10, opacity: 0.6 }}>Merchant wallet</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>$1,247.50</div>
        </div>
        <div className="nfc-scan-area">
          <div className="nfc-icon-wrap">
            <i className="ti ti-device-mobile-vibration" style={{ fontSize: 48, color: '#00D4A8' }} />
            <div className="nfc-ring" /><div className="nfc-ring" />
          </div>
          <button className="phone-action-btn" onClick={handleTap}><i className="ti ti-wifi" /> Simulate card tap</button>
        </div>
      </div>
    )
    if (screen === 'nfc') return (
      <div className="phone-screen" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="nfc-icon-wrap">
          <i className="ti ti-credit-card" style={{ fontSize: 48, color: '#00D4A8' }} />
          <div className="nfc-ring" /><div className="nfc-ring" />
        </div>
        <div style={{ fontSize: 12, marginTop: 16 }}>Card detected · reading...</div>
        <div className="scan-bar" style={{ top: 20 }} />
      </div>
    )
    if (screen === 'amount') return (
      <div className="phone-screen">
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#8B9BB4' }}>Enter amount (USD)</div>
          <div style={{ fontSize: 36, fontWeight: 700, margin: '8px 0' }}>${amount || '0.00'}</div>
        </div>
        <div className="keypad">
          {['1','2','3','4','5','6','7','8','9','0','⌫','✓'].map(k => (
            <div key={k} className="key" onClick={() => k === '⌫' ? clearLast() : k === '✓' ? handleAmountConfirm() : addDigit(k)}>{k}</div>
          ))}
        </div>
      </div>
    )
    if (screen === 'pin') return (
      <div className="phone-screen" style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <i className="ti ti-lock" style={{ fontSize: 40, marginBottom: 16 }} />
        <div style={{ marginBottom: 20 }}>Enter beneficiary PIN</div>
        <div className="pin-row">
          {[0,1,2,3].map(i => <div key={i} className={`pin-dot ${pin[i] !== undefined ? 'filled' : ''}`} />)}
        </div>
        <div className="keypad" style={{ marginTop: 24 }}>
          {['1','2','3','4','5','6','7','8','9','0','⌫'].map(k => (
            <div key={k} className="key" onClick={() => k === '⌫' ? clearLast() : addDigit(k)}>{k}</div>
          ))}
        </div>
      </div>
    )
    if (screen === 'processing') return (
      <div className="phone-screen" style={{ alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <i className="ti ti-loader-2 spin-icon" style={{ fontSize: 48, color: '#00D4A8' }} />
        <div>Validating with SmartVista VAM...</div>
        <div className="vam-checklist">
          <div className="vam-check-row"><i className="ti ti-check-circle" style={{ color: '#34D399' }} /><span>Wallet found</span></div>
          <div className="vam-check-row"><i className="ti ti-check-circle" style={{ color: '#34D399' }} /><span>Balance verified</span></div>
          <div className="vam-check-row"><i className="ti ti-check-circle" style={{ color: '#34D399' }} /><span>PIN verified</span></div>
        </div>
      </div>
    )
    if (screen === 'approved') return (
      <div className="approved-screen">
        {txResult?.success ? (
          <>
            <div className="approved-ring"><i className="ti ti-check" style={{ fontSize: 40, color: '#00D4A8' }} /></div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>${amount} Approved</div>
            <div style={{ fontSize: 11, color: '#4A5568' }}>TX: {txResult.txId}</div>
            <div style={{ fontSize: 11 }}>Goods provided</div>
          </>
        ) : (
          <>
            <div className="approved-ring" style={{ borderColor: '#F87171' }}><i className="ti ti-x" style={{ fontSize: 40, color: '#F87171' }} /></div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F87171' }}>Blocked</div>
            <div style={{ textAlign: 'center' }}>{txResult?.message}</div>
          </>
        )}
        <button className="phone-action-btn" onClick={resetFlow} style={{ marginTop: 24 }}>New transaction</button>
      </div>
    )
    return null
  }

  return (
    <div className="phone-frame">
      <div className="phone-status-bar"><span>09:41</span><span>SmartVista Merchant</span><span>🔋 87%</span></div>
      <div className="phone-appbar"><i className="ti ti-menu-2" /><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500 }}>Yusuf's Shop</div><div style={{ fontSize: 9, opacity: 0.5 }}>Baidoa Market</div></div><i className="ti ti-bell" /></div>
      {renderScreen()}
      <div className="phone-tabbar">
        <div className="phone-tab active"><i className="ti ti-home" /><span>Home</span></div>
        <div className="phone-tab"><i className="ti ti-credit-card" /><span>Pay</span></div>
        <div className="phone-tab"><i className="ti ti-wallet" /><span>Wallet</span></div>
        <div className="phone-tab"><i className="ti ti-settings" /><span>Settings</span></div>
      </div>
    </div>
  )
}
