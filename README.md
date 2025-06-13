# TreasureChest
Dues tracking software with planned implementation of Chapter Management tooling. Built in-house by active members of the Omega Epsilon Chapter of Theta Tau at SJSU.

Current implementation:
- Tracking general information (status, balances, class)

Future Implementation:
- Transaction Ledger
- Alumni Registry

v0.1 (6/13/25)
- added docker support

## Starting application:

1. Ensure you have the appropriate tooling installed (refer to [setup.md](/docs/setup.md))
2. Install dependencies using ``npm i``
3. Run the docker-compose file using the command: 
    - ```docker compose -f 'docker-compose.yml' up -d --build ```