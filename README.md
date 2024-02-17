
# DEGEN HACKATHON: ROSE Project

# YOU WILL WANT TO READ THIS FULLY

## Overview

ROSE is a component based system that reduces the time it takes for Web2 marketplaces to onboard into Web3. 

ROSE is a plug and play system for two-sided Web2 marketplaces to connect their users listings into public ledgers without exposing personal information. 

ROSE helps accelerate the Web2 market into the Tezos ecosystem. 

ROSE is a library of components that reduces the time it takes to create Web2 and Web3 marketplaces from 6 month startup times, to only 1 week. Reducing the time it takes to develop new businesses (Especially in crypto) by 95%. 

# The Problem

Existing NFT Marketplaces are practically constrained to transferring digital assets, and it's a tough hurdle for everyday entrepreneurs to even want to get into this new technology.

# The idea

ROSE will reduce the time it takes for all users; 1. The market makers (startup owners), 2. The providers of markets (real world, hard working entrepreneurs), and 3. The demand side of markets (real world, every day people).

# The Solution

ROSE reduces the time it takes for Web2 marketplaces to onboard into Web3 by hosting both centralized databases of users, and prioritizing displaying decentralized databases of transactions.

ARTHUR LABS, a company outside of this hackathon, focuses on rapidly creating two-sided Web2 marketplaces, reducing development time drastically for startups. By integrating with ROSE, these marketplaces can seamlessly join the Web3 sphere, thereby inviting entrepreneurs globally to join Tezos.

# The Combined Power

1 Entirely new startup WEEKLY can enter into Tezos. Real world sectors can amplify the volume and transaction of mainnet usage. Everyday entrepreneurs can grow immutable portfolios of authentic services, authentic reviews, authenticity in their local communities. 

ROSE, ARTHUR LABS, and Tezos can bring the entire younger audience into Web3, permanently. 

## Ecosystem & Bounties
1. Utilizing Tezos Eco, with potential use of CameLIGO.
2. Targeting all available bounties within the Tezos Ecosystem.

Bounty #1:
We are developing a truly unique and optimized approach for anyone to build a startup marketplace, and deploy their marketplace into Tezos within 1 week. They don't need to touch any code beyond configuring a design system for their company. 

This fortifies the blockchain by accelerating daily usage.

Bounty #2: 
We will develop unique NFTs that store metadata of centralized database information (only that information that validates the user what the user is selling, price point, description, location, and not personal information). 

This pushes the boundaries of NFTs from the existing norm of digital assets, to digital proof of services. 

Bounty #3:
We truly can accelerate developer entrepreneurs by 95% to creating their own business in Tezos. We can provide a dApp template where all they need to do is solely customize their business model and branding, then deploy it and begin interacting with their own smart contract.

This empowers entrepreneurs to create uniquely innovate marketplaces in Web3 that serve a niche real world purpose.

# Hackathon Plan
1. Initialize repository, install dependencies.
2. Develop initial form (excluding account creation).
3. Integrate MongoDB.
4. Develop the NFT Contract.
5. Implement MongoDB to URL converter.
6. Link URL to NFT contract.
7. Perform NFT minting tests.
8. Prepare the presentation.
9. Plan for marketplace expansion.

## Presentation Outline (3 Minutes)
1. Introduction to ROSE.
2. Demonstration of code and MVP.
3. Discussion on marketplace expansion.
4. Real-world application scenarios.
5. Strategy for onboarding Web2 users into Tezos Ecosystem.

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
actor ServiceBuyer
entity Marketplace
database SmartContract
database MongoDB
actor Entrepreneur

Marketplace -> MongoDB: Retrieves entrepreneurs data
ServiceBuyer -> Marketplace: viewServices()
Marketplace --> MongoDB: sortsServices()
Marketplace --> SmartContract: sortsServices()
MongoDB --> Marketplace 
SmartContract --> Marketplace
ServiceBuyer -> Marketplace: Buys service
ServiceBuyer --> SmartContract: Choice of crypto
ServiceBuyer --> MongoDB: Choice of fiat
ServiceBuyer -> SmartContract: Signs contract
SmartContract -> Entrepreneur: Notifies
Entrepreneur -> ServiceBuyer: initiates service, gets in contact, begins work
ServiceBuyer -> Entrepreneur: Agrees on completed service

SmartContract -> Entrepreneur: Payment escrow is delivered
SmartContract -> Marketplace: Expands portfolio
Marketplace -> MongoDB: Updates portfolio



```

```plantuml
!theme plain
actor ServiceBuyer
entity Marketplace
database SmartContract
database MongoDB
actor Entrepreneur

Entrepreneur -> Marketplace: Joins marketplace
Entrepreneur -> Marketplace: createsListing()
Entrepreneur -> MongoDB
Entrepreneur -> SmartContract

Marketplace -> MongoDB: Retrieves entrepreneurs data
ServiceBuyer -> Marketplace: viewServices()
Marketplace --> MongoDB: sortsServices()
Marketplace --> SmartContract: sortsServices()
MongoDB --> Marketplace 
SmartContract --> Marketplace
ServiceBuyer -> Marketplace: Buys service
ServiceBuyer --> SmartContract: Choice of crypto
ServiceBuyer --> MongoDB: Choice of fiat
ServiceBuyer -> SmartContract: Signs contract
SmartContract -> Entrepreneur: Notifies
Entrepreneur -> ServiceBuyer: initiates service, gets in contact, begins work
ServiceBuyer -> Entrepreneur: Agrees on completed service

SmartContract -> Entrepreneur: Payment escrow is delivered
Entrepreneur -> SmartContract: Confirms receipt
Entrepreneur -> Marketplace: Updates service status
Marketplace -> MongoDB: Records transaction
SmartContract -> Marketplace: Reports completion
Marketplace -> ServiceBuyer: Updates service record


```


# Related Works
Pitch Deck - [app.pitch.com/app/player/9f3011de-83be-401c-b8a9-18926402e4e7/b97e774b-560d-4748-9831-f32f9b3a69ad](https://pitch.com/v/rose-system-arthur-labs-wh3tb5)
HackMD - https://hackmd.io/wUGU0MHASDqsaNdqywSvkw?both