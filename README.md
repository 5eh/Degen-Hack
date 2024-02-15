* https://hackmd.io/cPkKc80nTlOA9oXBQtOgWA?both -- Better ReadMe

# DEGEN HACKATHON: ROSE Project
## Overview

ROSE is a groundbreaking project aimed at onboarding Web2 entrepreneurs into the Web3 ecosystem. It's a NFT Smart Contract platform designed to integrate MongoDB listings into the Web3 space. This allows service providers and goods sellers worldwide to build an on-chain portfolio, showcasing authentic services/goods with immutable customer reviews. ROSE facilitates selling services on-chain, marking a new era in Web3 commerce.

ARTHUR LABS, an expansion of this project, focuses on rapidly creating two-sided Web2 marketplaces, reducing development time drastically. By integrating with ROSE, these marketplaces can seamlessly transition into the Web3 sphere, thereby increasing Web3 user volume significantly.

## Plan
1. Create repo, install deps
2. Create form (Ignore account creation initially)
3. Connect MongoDB
4. Create NFT Contract 
5. Edit Contract to view T&C Page for each listing
6. MongoDB to URL convertor
7. Connect URL to contract for NFT
8. Test mint NFT
9. Create presentation
10. Marketplace expansion
11. # WIN

## Presentation Outline (3 Minutes)
1. Introduction to ROSE.
2. Demonstration of code and MVP.
3. Discussion on marketplace expansion.
4. Real-world application scenarios.
5. Strategy for onboarding Web2 users into Tezos Ecosystem.
6. Concluding with the project's potential to win.
7. Software Design: ROSE.xyz

# Idea

# Problem
The challenge lies in transitioning web3 online shops to the Web3 domain.

# Solution
ROSE.xyz addresses this by offering a platform for seamless integration.

# Requirements
### Functional Requirements
The application must convert MongoDB data into an NFT.

### Non-Functional Requirements
The application should be operational and user-friendly.
User Stories
As a user, I want to convert a JSON snippet of my MongoDB data into an NFT.
As a user, I want to own the NFT I create.
Diagrams

# Use Case Diagram
```plantuml
!theme plain
skinparam actorBorderThickness 1
left to right direction
title Use Case Diagram

User -- (convert)
User -- (own)
```

```plantuml
!theme plain
title Class Diagram
class Converter {
    mongoData: json
    owner: AccountId
    do_converting(mongoData: json) -> NFT
}

```

```plantuml
!theme plain
title Sequence Diagram
actor User
entity WebApp
database MongoDB
entity SmartContract

WebApp --> SmartContract: listens
User -> WebApp: createsService() through Input
WebApp -> WebApp: createsListing()
WebApp -> MongoDB: savesListing()
MongoDB -> WebApp: confirms()
MongoDB -> SmartContract: createsNFT()
SmartContract -> SmartContract: mintNFT()
WebApp -> User: if Contract, display Contract
WebApp -> User: else, display Listing
```

# Related Works
Arthur Labs Pitch Deck (Expansion of ROSE in the real world) - app.pitch.com/app/player/9f3011de-83be-401c-b8a9-18926402e4e7/b97e774b-560d-4748-9831-f32f9b3a69ad