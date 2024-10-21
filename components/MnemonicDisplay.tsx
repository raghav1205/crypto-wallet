import {useState} from 'react'


interface MnemonicDisplayProps {
  mnemonic: string[];
  handleProceedClick: (id: string) => void;
  
}
const MnemonicDisplay = ({ mnemonic, handleProceedClick }: MnemonicDisplayProps) => {
  const [cardClicked, setCardClicked] = useState<boolean>(false)
  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic.join(" "));
  };

  return (
    <>
      <h3  className="text-4xl mb-3 text-center font-semibold">Secret Recovery Phrase</h3>
      <p className="text-lg text-white text-opacity-60 mb-6">
        Save these words in a safe place
      </p>
      <div
        className="md:w-[60%] bg-[#363844] rounded-md p-2 mb-[1rem]"
        onClick={handleCopyMnemonic}
      >
        <div className="grid grid-cols-3 items-cetner gap-5 bg-[#363844] rounded-t rouned-md  w-full pl-6 p-3 py-4 ">
          {mnemonic.map((word, index) => {
            return (
              <div
                key={index}
                className="text-white rounded-md font-semibold text-md truncate"
              >
                <span className="mr-3 text-opacity-25 text-white ">
                  {index + 1}
                </span>
                <span>{word}</span>
              </div>
            );
          })}
        </div>
        <p className="w-[98%] mx-auto border-[#494b55] border-t flex justify-center  pt-2 text-sm text-opacity-60 text-gray-100" onClick = {() => {
          setCardClicked(true)
          setTimeout(() => {
            setCardClicked(false)
        },5000)
        }}>
         { cardClicked ? 'Copied!'
          : 'Click anywhere on this card to copy'
         }
        </p>
      </div>

      <button className=" btn btn-green mt-[3rem]" onClick={() => handleProceedClick('addWallet')}>
        Proceed
      </button>
    </>
  );
};

export default MnemonicDisplay;
