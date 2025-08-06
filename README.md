# Charter - Omega Epsilon 
Dues tracking software with planned implementation of Chapter Management tooling. Built in-house by active members of the Omega Epsilon Chapter of Theta Tau at SJSU.

[project doc](https://docs.google.com/document/d/1z0bv43UFDDDxrCZYHH-YiTgz-dcHAbLRyEr7b_KRQTg/edit?tab=t.0#heading=h.7p9s3de6mzdz)

Current implementation:
- Budget planning
- General membership management (statuses, balances, etc)
- Dues management

Future Implementation:
- Transaction Ledger
- Alumni Registry
- Automated Notification System for Late Dues via Amazon SNS
- Cloud Deployment with Docker, AWS, Vercel
- Migrate to Neon + Better Auth setup for more control over systems infrastructure.
- Authentication flow for Treasurers, Regent.

## Starting application:

1. Ensure you have the appropriate tooling installed (refer to [setup.md](/docs/setup.md))
2. Install dependencies using ``npm i``
3. Run the docker-compose file using the command: 
    - ```docker compose -f 'docker-compose.yml' up -d --build ```
