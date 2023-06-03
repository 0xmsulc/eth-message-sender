# Eth Message Sender

Eth Message Sender is a web application that allows users to send Ethereum transactions along with a message. It integrates with MetaMask and supports multiple networks including Mainnet, Goerli, Arbitrum, and Arbitrum Goerli.

## Features

- Connect MetaMask wallet
- Send ETH to a specific address
- Include a custom message with the transaction
- Supports multiple networks: Mainnet, Goerli, Arbitrum, Arbitrum Goerli

## Technologies Used

- React: JavaScript library for building user interfaces
- UsedApp: Ethereum development library for interacting with Ethereum networks
- ethers.js: Ethereum JavaScript library for interacting with Ethereum blockchain
- Tailwind CSS: Utility-first CSS framework for styling the application

## Prerequisites

To run the Eth Message Sender locally, you'll need the following:

- Node.js (v14 or higher)
- Yarn package manager

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/eth-message-sender.git

2. Navigate to the project directory:

   ```shell
   cd eth-message-sender

3. Install the dependencies:

   ```shell
   yarn install

4. Create a `.env` file in the project root directory and provide the necessary environment variables. Here's an example:

   ```shell
   REACT_APP_INFURA_API_KEY=your-infura-api-key

5. Start the development server:

   ```shell
   yarn start


6. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Deploying to Production

To deploy the Eth Message Sender to a production environment, follow these steps:

1. Build the production-ready optimized bundle:

   ```shell
   yarn build


2. The build output will be available in the `build` directory. You can host this directory using any static hosting service or configure your own web server.

## Contributing

Contributions to the Eth Message Sender project are welcome. If you find any issues or have any suggestions for improvement, please feel free to create a GitHub issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

