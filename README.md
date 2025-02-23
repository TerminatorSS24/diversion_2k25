# 🚀 Ethereum-Based Freelance Escrow System (SepoliaETH)

## 📌 Overview
A decentralized identity and escrow system for freelancers and employers to ensure secure payments and verified work history using blockchain and smart contracts.

![WhatsApp Image 2025-02-23 at 11 45 07_fe7716d4](https://github.com/user-attachments/assets/55c92391-1399-4a8d-811d-f043436e846b)


## 💡 Problem Statement
Freelancers and employers face issues such as:
- **Fraud:** Fake freelancers and project abandonment.
- **Payment Disputes:** Unverified work quality leading to conflicts.
- **Missed Deadlines:** No penalty for delays or incomplete work.

## 🔗 Solution
- **Verified Work History:** Stored as **Soulbound Tokens (SBTs).**
- **Secure Escrow System:** Locks payments in smart contracts.
- **Automated Dispute Resolution:** Ensures fairness.

## 👥 Roles
1. **Project Distributor (PD)** – Posts projects, hires freelancers, and locks payments.
2. **Freelancer** – Applies for jobs, submits work, and gets paid upon approval.
3. **Admin** – Oversees escrow and dispute resolution.

## 🎯 Features
### 🔹 Secure Workflows
- PD hires freelancer and locks payment in **multi-signature escrow**.
- PD sets a deadline for project completion.

### 🔹 Milestone-Based Payment
- Freelancer submits work.
- PD reviews submission:
  - **Approved** → Funds are released.
  - **Rejected** → PD can extend the deadline or request a refund.
- Funds remain locked until approval or dispute resolution.

### 🔹 Dispute & Fund Security
- **Multi-Sig Escrow** prevents unauthorized fund withdrawal.
- **Decentralized Arbitration** using Kleros/Aragon.
- **Auto-Refund** if PD is inactive.
- **Identity Verification** via ENS/Gitcoin Passport.

## 🔧 Tech Stack
- ![Ethereum](https://img.shields.io/badge/Blockchain-Ethereum-blue) **Blockchain:** Ethereum (SepoliaETH for testing, Mainnet for deployment).
- ![Solidity](https://img.shields.io/badge/Smart%20Contracts-Solidity-lightgrey) **Smart Contracts:** Solidity.
- ![IPFS](https://img.shields.io/badge/Storage-IPFS-green) **Storage:** IPFS.
- ![Next.js](https://img.shields.io/badge/Frontend-Next.js-black) **Frontend:** Next.js 
- ![MySQL](https://img.shields.io/badge/Database-MySQL-blue) **Database:** MySQL.
- ![React](https://img.shields.io/badge/Frontend-React-blue) **Frontend:** React + TailwindCSS.
- ![WalletConnect](https://img.shields.io/badge/Wallet%20Auth-WalletConnect-blue) **Wallet Authentication:** WalletConnect + MetaMask.
  
## 🚀 User Flow
### 🔹 Project Distributor
1. Logs in via MetaMask/WalletConnect.
2. Posts a project (Escrow locks funds).
3. Selects a freelancer (SBT reputation verified).
4. Reviews submission and releases funds if approved.

### 🔹 Freelancer
1. Logs in and applies for projects.
2. Receives project details.
3. Completes and submits work.
4. Requests extension or escalates dispute if needed.

### 🔹 Admin
1. Handles disputes.
3. Issues **SBTs** for freelancer reputation.

## 🛡️ Fraud Prevention
✅ **Multi-Sig Escrow** prevents fund theft.
✅ **Milestone-Based Payouts** discourage freelancer abandonment.
✅ **Reputation SBTs** prevent fake accounts.

## 📜 Smart Contract Deployment
- **Network:** SepoliaETH
- **Main Contracts:** `EscrowContract.sol`, `ReputationSBT.sol`, `DisputeManager.sol`

## 🛠️ Setup & Installation
### Prerequisites
- Node.js (v16+)
- Truffle (v5.4.29)
- Ganache
- MetaMask
- solidity(v0.8.13)

### Steps
```bash
git clone https://github.com/yourusername/escrow-dapp.git
cd escrow-dapp
npm install
truffle compile
truffle migrate --network development
npm run dev
```

## 🚀 Roadmap
- ✅ **Phase 1:** Smart contract deployment on Ganache-cli.
- 🚧 **Phase 2:** On-chain arbitration integration.

## 📜 License
MIT License.

## 🤝 Contributing
1. Fork and create a new branch.
2. Commit changes.
3. Create a Pull Request.

