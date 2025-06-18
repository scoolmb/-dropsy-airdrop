# dropsy-airdrop beta

[![npm version](https://img.shields.io/npm/v/@dropsy/airdrop.svg)](https://www.npmjs.com/package/@dropsy/airdrop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://scoolmb.github.io/dropsy-airdrop/)

A modern client SDK for interacting with the **Dropsy Airdrop Protocol** on Solana, built with:

- ✅ TypeScript
- ⚙️ [tsup](https://github.com/egoist/tsup) for fast bundling
- 🔀 Dual CJS (`require`) and ESM (`import`) support
- 📦 Auto-generated type declarations

## 🚨 Important Notes

⚠️ This SDK is in active development  
⚠️ All program addresses are temporary  
⚠️ Instruction formats may change without warning  
⚠️ Devnet only - no mainnet support yet

## 🛠 Coming Soon

**📖 Interactive Documentation**  
Full API docs with live examples

**🧪 Testnet Sandbox**  
Try before you integrate

**🎮 CLI Interface**  
Command-line airdrop management

## 🔭 Current Status (v0.β)

- **Network**: Devnet only
- **Stability**: Experimental
- **Program ID**: Subject to change
- **Roadmap**: Mainnet launch

> Full API documentation: [https://scoolmb.github.io/dropsy-airdrop](https://scoolmb.github.io/dropsy-airdrop)

## Installation

```bash
npm install @dropsy/airdrop
# or
yarn add @dropsy/airdrop
# or
pnpm add @dropsy/airdrop
```

The @solana/kit is required if not already installed:

# Using npm

npm install @solana/kit

# Using yarn

yarn add @solana/kit

## Examples

Examples are available in the [examples](./examples) folder.  
Feel free to explore, modify, and use them as a starting point for your own work.

## Features

🚀 Controller – The Heart of Your Airdrop Platform
One of the most exciting parts of our protocol is the Controller.

A Controller acts as the foundation for creating and managing airdrops. By initializing your own controller, you can build a fully self-managed airdrop platform — and alse earn protocol fees from all the airdrops created using it.

What is a Controller?
A Controller is a special on-chain account that:

Registers ownership over a set of airdrops.

Collects protocol-level fees.

Allows anyone to create token airdrops under your control.

Why Use a Controller?

💸 Monetize: Earn fees from every airdrop created using your controller.

🛠️ Customize: Tailor your airdrop platform around it.

🌐 Permissionless: Anyone can initialize a controller and start building.

How to Initialize a Controller :

```bash
import \* as dropsy from "@dropsy/airdrop";

// Create the instruction to initialize your controller
const ix = await dropsy.getInitializeControllerInstructionAsync({
authority: wallet, // the owner of the controller (the signer )
feeLamports: BigInt(5000), // The fee lamports others will pay when c using your controller
});
```

## 📚 Documentation

Full API documentation is available at  
👉 [https://scoolmb.github.io/dropsy-airdrop/](https://scoolmb.github.io/dropsy-airdrop/)
