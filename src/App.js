import { useEffect, useState } from 'react';
import { ChainId, DAppProvider, useEthers, useSendTransaction } from '@usedapp/core';
import { utils } from 'ethers';
import Confetti from 'react-confetti';

const supportedChains = [ChainId.Mainnet, ChainId.Goerli, ChainId.Arbitrum, ChainId.ArbitrumGoerli];

const ConnectButton = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  return account ? (
    <div>
      <p className="text-sm text-green-500">Connected: {account}</p>
      <button onClick={deactivate} className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-700">
        Disconnect Wallet
      </button>
    </div>
  ) : (
    <button onClick={activateBrowserWallet} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
      Connect Wallet
    </button>
  );
}

const App = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { chainId, account } = useEthers();
  const { sendTransaction, state } = useSendTransaction();
  const isSupportedChain = supportedChains.includes(chainId);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSendTransaction = () => {
    sendTransaction({
      to: address,
      value: utils.parseEther(amount),
      data: utils.hexlify(utils.toUtf8Bytes(message)) // encode the message as hexadecimal
    });
  }

  useEffect(() => {
    if (state.status === 'Success') {
      setAddress("");
      setAmount("");
      setMessage("");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500); // Show confetti for 3 seconds
    }
  }, [state.status]);

  const isProcessing = state.status === 'Mining';
  console.log(process.env)

  console.log(process.env.REACT_APP_INFURA_PROJECT_ID)
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold mb-4">Send ETH with a message</h1>
      <ConnectButton />

      {state.status === 'Success' && <p className="text-green-500">Transaction sent successfully!</p>}
      {state.status === 'Fail' && <p className="text-red-500">Transaction failed!</p>}
      {isProcessing && <p className="text-yellow-500">Transaction is being processed...</p>}

      {isSupportedChain && account && (
        <>
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isProcessing} className="block w-1/2 px-4 py-2 mt-2 text-black border-2 border-gray-300 rounded-md focus:ring-blue-500 bg-white" />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isProcessing} className="block w-1/2 px-4 py-2 mt-2 text-black border-2 border-gray-300 rounded-md focus:ring-blue-500 bg-white" />
          <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} disabled={isProcessing} className="block w-1/2 px-4 py-2 mt-2 text-black border-2 border-gray-300 rounded-md focus:ring-blue-500 bg-white" />

          <button disabled={isProcessing} onClick={handleSendTransaction} className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Send
          </button>
        </>
      )}
      {!isSupportedChain && account && (
        <p className="text-red-500">Unsupported chain. Please use Mainnet or Arbitrum in order to use this app.</p>
      )}
      {state.status === 'Success' && showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
    </div>
  );
}

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/3478acda9c4441e7a7465efdabf18d88',
    [ChainId.Goerli]: 'https://goerli.infura.io/v3/3478acda9c4441e7a7465efdabf18d88',
    [ChainId.Arbitrum]: 'https://arbitrum-mainnet.infura.io/v3/3478acda9c4441e7a7465efdabf18d88',
    [ChainId.ArbitrumGoerli]: 'https://arbitrum-goerli.infura.io/v3/3478acda9c4441e7a7465efdabf18d88'
  },
}

export default function Dapp() {
  return (
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  );
}
