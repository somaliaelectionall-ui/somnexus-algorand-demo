export const STEPS = [
  { n:1, title:'Donor / NGO funding', short:'Donor', icon:'ti-building-bank', group:'setup', color:'#3B82F6', summary:'WFP holds USD treasury. Converts to USDC on Algorand.', actors:['WFP','ECHO','Algorand'], tech:['USDC smart contract'], detail:[['Donor','ECHO EU'],['Amount','$600k'],['Blockchain','Algorand']] },
  { n:2, title:'Somalia settlement funding', short:'Settlement', icon:'ti-bank', group:'setup', color:'#3B82F6', summary:'Funds to Somali settlement bank.', actors:['Settlement bank'], tech:['SWIFT'], detail:[['Bank','Premier Bank Somalia']] },
  { n:3, title:'Beneficiary enrolment', short:'Enrolment', icon:'ti-user-plus', group:'setup', color:'#8B5CF6', summary:'Field team enrolls beneficiaries.', actors:['Field team','SmartVista VAM'], tech:['Biometric capture'], detail:[['Capture','ID, Fingerprint'],['Wallet','VAM account']] },
  { n:4, title:'NFC card issuance', short:'NFC', icon:'ti-credit-card', group:'setup', color:'#8B5CF6', summary:'Link NFC card to VAM wallet.', actors:['Field agent'], tech:['NFC MIFARE'], detail:[['Contains','Token only'],['Linked','VAM wallet']] },
  { n:5, title:'Merchant onboarding', short:'Merchant', icon:'ti-store', group:'setup', color:'#F59E0B', summary:'Merchant downloads SmartVista app.', actors:['Merchant'], tech:['BPC Android app'], detail:[['App','SmartVista BPC']] },
  { n:6, title:'Aid disbursement', short:'Disburse', icon:'ti-send', group:'setup', color:'#F59E0B', summary:'Load funds into wallets.', actors:['WFP officer'], tech:['Rules engine'], detail:[['Rules','Food only, max $100'],['Funds','$50 per HH']] },
  { n:7, title:'Beneficiary redemption', short:'Redemption', icon:'ti-device-mobile', group:'operation', color:'#00D4A8', summary:'Tap card, enter PIN, approve.', actors:['Beneficiary','Merchant'], tech:['NFC tap','PIN'], detail:[['Step1','Open app'],['Step2','Tap card'],['Step3','Enter amount'],['Step4','Enter PIN'],['Step5','Validate'],['Step6','Approved']] },
  { n:8, title:'Merchant settlement', short:'Settlement', icon:'ti-wallet', group:'operation', color:'#00D4A8', summary:'Funds credited to merchant wallet.', actors:['SmartVista VAM'], tech:['Instant credit'], detail:[['Credit','Instant to merchant']] },
  { n:9, title:'Merchant cashout', short:'Cashout', icon:'ti-cash', group:'operation', color:'#10B981', summary:'Bank or EVC agent cashout.', actors:['Merchant','EVC agent'], tech:['EVC Plus'], detail:[['Option 9A','Direct bank'],['Option 9B','EVC agent']] },
  { n:10, title:'Liquidity agent', short:'Liquidity', icon:'ti-users', group:'operation', color:'#10B981', summary:'EVC agent manages float.', actors:['EVC agent'], tech:['Liquidity wallet'], detail:[['Agent earns','Basis points']] },
  { n:11, title:'Fraud monitoring', short:'Fraud', icon:'ti-shield-x', group:'operation', color:'#EF4444', summary:'Real‑time fraud detection.', actors:['Fraud engine'], tech:['Velocity checks','Biometric mismatch'], detail:[['Duplicate card','Blocked'],['Biometric fail','Denied + alert']] },
  { n:12, title:'Algorand audit', short:'Algorand', icon:'ti-link', group:'audit', color:'#A855F7', summary:'Immutable on‑chain events.', actors:['Algorand'], tech:['Smart contract'], detail:[['Treasury','USDC deposited'],['Transaction','Immutable log']] },
  { n:13, title:'Donor dashboard', short:'Dashboard', icon:'ti-chart-bar', group:'audit', color:'#A855F7', summary:'Real‑time donor dashboard.', actors:['ECHO','WFP'], tech:['Dashboard'], detail:[['Visibility','Every dollar tracked'],['Proof','On‑chain hash']] },
]

export const INITIAL_LEDGER = [
  { block:47829102, hash:'7X2KP9M4QRXT', id:'SO-BDO-4821', actor:'Yusuf Ahmed', event:'REDEMPTION', amount:'$50.00', ok:true, ts:'09:47:23' },
  { block:47829098, hash:'FRAUD4803BLKD', id:'SO-BDO-4803', actor:'Ahmed (camp leader)', event:'FRAUD_BLOCKED', amount:'$0.00', ok:false, ts:'09:41:30' },
  { block:47829090, hash:'BATCH6KBDISP1', id:'WFP-BATCH-001', actor:'WFP Programme', event:'DISBURSEMENT', amount:'$600,000', ok:true, ts:'09:30:00' },
]

export const DEMO_SEQUENCE = [
  { step:1, label:'Donor funds', duration:600 }, { step:2, label:'Settlement bank', duration:600 }, { step:3, label:'Enrolment', duration:900 }, { step:4, label:'NFC card', duration:600 }, { step:5, label:'Merchant onboarding', duration:600 }, { step:6, label:'Disbursement', duration:900 }, { step:7, label:'Redemption', duration:1200 }, { step:8, label:'Settlement', duration:600 }, { step:9, label:'Cashout', duration:600 }, { step:10, label:'Liquidity', duration:500 }, { step:11, label:'Fraud check', duration:500 }, { step:12, label:'Algorand audit', duration:700 }, { step:13, label:'Dashboard', duration:600 },
]
