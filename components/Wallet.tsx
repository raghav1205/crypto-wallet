import React from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface WalletProps {
  wallet: {
    type: string;
    wallets: { publicKey: string; privateKey: string }[];
  };
  handleWalletDelete: (
    type: string,
    keyPair: { publicKey: string; privateKey: string }
  ) => void;
  visibleKeys: boolean[];
  setVisibleKeys: (keys: boolean[]) => void;
}

const handleKeyClick = (key: string) => {
  navigator.clipboard.writeText(key)
}

const Wallet: React.FC<WalletProps> = ({
  wallet,
  handleWalletDelete,
  visibleKeys,
  setVisibleKeys,
}) => {
  return (
    <div
      key={wallet.type}
      className="flex flex-col gap-12  md:w-[95%] w-full overflow-hidden"
    >
      {wallet.wallets.map((keyPair, index) => {
        return (
          <div
            key={keyPair.publicKey}
            className="flex py-6 flex-col gap-6 bg-white px-6 rounded"
          >
            <div className="flex w-full justify-between ">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Wallet {index + 1}
              </h3>
              <MdDelete
                className="cursor-pointer mt-2 w-[1rem]"
                onClick={() => handleWalletDelete(wallet.type, keyPair)}
              />
            </div>
            <div className="w-full">
              <span className="block text-lg md:text-xl font-semibold mb-3">
              Public Key{" "}
              </span>
             
              <span  className="text-black text-opacity-80 truncate block max-w-[600px]" onClick ={() => handleKeyClick(keyPair.publicKey)}>
              {keyPair.publicKey}
              </span>
            </div>
            <div className="w-full">
              <span className="block text-lg md:text-xl font-semibold mb-3">
                Private Key{" "}
              </span>
              {visibleKeys[index] ? (
                <div className="w-full flex justify-between gap-2">
                  <span className=" text-black text-opacity-80 truncate" onClick ={() => handleKeyClick(keyPair.privateKey)}>
                    {keyPair.privateKey}
                  </span>
                  <FaEyeSlash
                    className="cursor-pointer min-w-[1rem]"
                    onClick={() => {
                      const newState = [...visibleKeys];
                      newState[index] = !newState[index];
                      setVisibleKeys(newState);
                    }}
                  />
                </div>
              ) : (
                <div className="w-full  flex justify-between gap-2">
                  <span className="truncate">
                    {"•".repeat(keyPair.privateKey.length)}
                  </span>
                  <FaEye
                    className="cursor-pointer min-w-[1rem]"
                    onClick={() => {
                      const newState = [...visibleKeys];
                      newState[index] = !newState[index];
                      setVisibleKeys(newState);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wallet;
