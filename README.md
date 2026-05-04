# Wallet_Recharge_System
This project is a digital wallet and recharge system developed using ASP.NET Core Web API and Entity Framework Core. It allows users to register, authenticate using JWT tokens, and perform wallet-based transactions such as mobile and DTH recharges.

The system includes role-based authorization (Admin/User), secure password hashing using BCrypt, and maintains transaction history for all operations. Each user is assigned a wallet with balance management, and all recharge operations are handled with proper validation and database transactions to ensure consistency.

A frontend (React) is integrated to interact with the API, enabling users to view their wallet balance, perform recharges, and handle errors gracefully.

