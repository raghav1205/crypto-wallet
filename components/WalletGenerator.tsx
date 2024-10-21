"use client";
import { useEffect, useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import { useLocalStorage } from "@uidotdev/usehooks";
import Wallet from "./Wallet";
import MnemonicDisplay from "./MnemonicDisplay";
import React from "react";
import Modal from "./Modal";
import useModal from "@/hooks/useModal";

const optionsArr = ["Solana", "Ethereum"];

interface Wallets {
  type: string;
  wallets: KeyPair[];
}

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

interface WalletGeneratorProps {
  handleScroll: (id: string) => void;
}

const WalletGenerator: React.FC<WalletGeneratorProps> = ({
  handleScroll,
}: WalletGeneratorProps) => {

  const [mnemonic, setMnemonic] = useLocalStorage<string[]>("mnemonic", []);
  const [options] = useState<string[]>(optionsArr);
  const [currentOption, setCurrentOption] = useState<string>("");
  const [wallets, setWallets] = useLocalStorage<Wallets[]>("wallets", []);
  const [visibleKeys, setVisibleKeys] = useState<boolean[]>([]);
  const { modalOpen, close, open } = useModal();

  useEffect(() => {
    if (mnemonic.length === 0) {
      const mnemonic = generateMnemonic();
      const mnemonicArray = mnemonic.split(" ");
      setMnemonic(mnemonicArray);
    }
    if(wallets.length !== 0){
      const nonEmptyWallet = wallets.find(w => w.wallets.length != 0)
      if(nonEmptyWallet) setCurrentOption(nonEmptyWallet.type)
    }
  }, []);

  useEffect(() => {
    const currentOptionWalletLength = wallets.find(
      (wallet) => wallet.type === currentOption
    )?.wallets.length;
    if (currentOptionWalletLength) {
      const newVisibleKeys = new Array(currentOptionWalletLength).fill(false);
      setVisibleKeys(newVisibleKeys);
    }
  }, [currentOption]);

  const handleAddWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic.join(" "));
    const idx = wallets.reduce((acc, curr) => {
      if (curr.type === currentOption) {
        return curr.wallets.length;
      }
      return acc;
    }, 0);
    const path =
      currentOption === "solana"
        ? `m/44'/501'/${idx}'/0'`
        : `m/44'/60'/${idx}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    let publicKey: string = "";
    let privateKey: string = "";

    if (currentOption === "solana") {
      console.log("Adding Wallet");
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keyPair = Keypair.fromSecretKey(secret);
      publicKey = keyPair.publicKey.toBase58();
      privateKey = bs58.encode(secret);
    } else if (currentOption === "ethereum") {
      privateKey = Buffer.from(derivedSeed).toString("hex");
      const wallet = new ethers.Wallet(privateKey);
      publicKey = wallet.address;
    }
    if (publicKey != "" && privateKey != "") {
      const newWallet: KeyPair = {
        publicKey,
        privateKey,
      };
      const previousCurrencyState = wallets.find(
        (wallet) => wallet.type === currentOption
      );
      if (!previousCurrencyState) {
        const updatedWallets = [
          ...wallets,
          { type: currentOption, wallets: [newWallet] },
        ];
        setWallets(updatedWallets);
      } else {
        const updatedCurrencyState = [
          ...previousCurrencyState?.wallets,
          newWallet,
        ];
        const updatedWallets = wallets.map((wallet) =>
          wallet.type === currentOption
            ? { type: wallet.type, wallets: updatedCurrencyState }
            : wallet
        );
        setWallets([...updatedWallets]);
      }
    }
  };
  const handleOptionClick = (e: any) => {
    setCurrentOption(e.target.innerText.toLowerCase());
  };
  const handleWalletDelete = (walletType: string, keypair: KeyPair) => {
    let updatedWallet = wallets.find((w) => w.type === walletType);
    if (updatedWallet) {
      updatedWallet?.wallets.forEach((keyPair, index) => {
        if (keyPair.publicKey === keypair.publicKey) {
          updatedWallet?.wallets.splice(index, 1);
        }
      });
      const newWalletsState = wallets.map((wallet) => {
        if (wallet.type === walletType) {
          return updatedWallet;
        }
        return wallet;
      });
      setWallets([...newWalletsState]);
    }
  };

  const handleClearAllClick = () => {
    open();
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4 py-[2rem] items-center min-h-[100vh]  md:p-[3rem] text-white" id="mnemonicDisplay">
        <MnemonicDisplay
          mnemonic={mnemonic}
          handleProceedClick={handleScroll}
        />
      </div>

      <div className="min-h-[100vh] pt-[2rem] w-full" id={'addWallet'}>
        <div className="flex gap-4 mt-0">
          {options.map((item) => {
            return (
              <button
                key={item}
                onClick={handleOptionClick}
                className={`border  btn glow ${
                  currentOption.toUpperCase() === item.toUpperCase()
                    ? " btn btn-yellow"
                    : ""
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-6   md:ml-auto"  >
          <button
            className="font-semibold disabled:opacity-70 btn mr-4 disabled:text-black"
            onClick={handleAddWallet}
            disabled={currentOption === ""}
          >
            Add Wallet
          </button>

          <button
            className=" font-semibold disabled:bg-red-400 bg-red-500 hover:bg-red-600 btn btn-red"
            disabled={wallets.length === 0}
            onClick={handleClearAllClick}
          >
            Clear All Wallets
          </button>
        </div>

        <Modal
          modalOpen={modalOpen}
          close={close}
          open={open}
          onClose={() => {}}
        >
          <div className="p-4 text-black m-[2rem] md:m-0 ">
            <h3 className="md:text-xl text-2xl  font-semibold">
              Are you sure you want to clear all wallets?
            </h3>
            <p className="md:text-md text-lg my-2">
              This action cannot be undone and will delete your data from local
              storage
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="btn btn-gray"
                onClick={() => {
                  setWallets([]);
                  close();
                }}
              >
                Yes
              </button>
              <button className="btn" onClick={close}>
                No
              </button>
            </div>
          </div>
        </Modal>

        <div className="py-2 mb-4 mt-10 w-[100%]">
          {wallets.map((wallet) => {
            if (wallet.type === currentOption)
              return (
                <Wallet
                  wallet={wallet}
                  handleWalletDelete={handleWalletDelete}
                  visibleKeys={visibleKeys}
                  setVisibleKeys={setVisibleKeys}
                />
              );
          })}
        </div>
      </div>
    </>
  );
};

export default WalletGenerator;
