import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Box, Switch } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { InfoIcon } from "../ui/InfoIcon";
import Button from "../ui/Button";
import { useWriteContract, useAccount, useSwitchChain } from "wagmi";
import { ABI } from "../../POIDHabi";
import { toast } from "react-toastify";
import { createPublicClient, decodeEventLog, http, parseEther } from "viem";
import { base, degen, arbitrum } from "viem/chains";
import { GameButtonNoHover } from "../ui/GameButton";

const chains = {
  degen: {
    name: "degen",
    currency: "degen",
    chainId: 666666666,
    POIDContranct:
      "0x2445BfFc6aB9EEc6C562f8D7EE325CddF1780814" as `0x${string}`,
    provider: createPublicClient({
      chain: degen,
      transport: http(
        "https://rpc-degen-mainnet-1.t.conduit.xyz/8TM2tJu2NV9h6McqXqDPHCnsvCdwVgyrH"
      ),
    }),
  },
  base: {
    name: "base",
    currency: "eth",
    chainId: 8453,
    POIDContranct:
      "0xb502c5856F7244DccDd0264A541Cc25675353D39" as `0x${string}`,
    provider: createPublicClient({
      chain: base,
      transport: http(
        "https://api.developer.coinbase.com/rpc/v1/base/q_7UksVVI6bvOgx0y6-hR123IsVxVk3-"
      ),
    }),
  },
  arbitrum: {
    name: "arbitrum",
    currency: "eth",
    chainId: 42161,
    POIDContranct:
      "0x0Aa50ce0d724cc28f8F7aF4630c32377B4d5c27d" as `0x${string}`,
    provider: createPublicClient({
      chain: arbitrum,
      transport: http(
        "https://arb-mainnet.g.alchemy.com/v2/vePHk-Vg-wjRw9LtykUKxDTxoUA2FHSh"
      ),
    }),
  },
};

const BountyDialog = ({
  bounty,
  onClose,
}: {
  bounty: Bounty | null;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState<string>(bounty?.title ?? "");
  const [description, setDescription] = useState<string>(
    bounty?.description ?? ""
  );
  const [reward, setReward] = useState<string>("");
  const [selectedChain, setSelectedChain] = useState<
    "degen" | "base" | "arbitrum"
  >("base");
  const [isSoloBounty, setIsSoloBounty] = useState<boolean>(true);
  const writeContract = useWriteContract();
  const account = useAccount();
  const switchChain = useSwitchChain();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  return (
    <Dialog
      open={!!bounty}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: `bg-poidhBlue/90 text-white ${
          isSubmiting ? "animate-pulse" : ""
        }`,
        style: {
          borderRadius: "30px",
          color: "white",
          border: "1px solid #D1ECFF",
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" width="100%">
          <span>title</span>
          <input
            type="text"
            disabled={isSubmiting}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4"
          />
          <span>description</span>
          <textarea
            rows={3}
            disabled={isSubmiting}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4 max-h-44 h-52"
          ></textarea>

          <span>reward</span>
          <div className="flex flex-col sm:flex-row items-center sm:gap-2 gap-4 w-full mb-[10px]">
            <input
              type="string"
              value={reward}
              disabled={isSubmiting}
              placeholder={`amount in ${chains[selectedChain].currency}`}
              onChange={(e) => setReward(e.target.value)}
              className="flex-grow sm:w-[70%] w-full border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md my-0 h-[100%]"
            />
            <select
              value={selectedChain}
              disabled={isSubmiting}
              onChange={(e) =>
                setSelectedChain(
                  e.target.value as "degen" | "base" | "arbitrum"
                )
              }
              className="flex-grow sm:w-[25%] w-full border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md my-0 h-[100%]"
            >
              <option value="base">base</option>
              <option value="degen">degen</option>
              <option value="arbitrum">arbitrum</option>
            </select>
          </div>
          <div className="flex text-balance gap-2 text-xs mb-2 items-center">
            <InfoIcon width={18} height={18} /> a 2.5% fee is deducted from
            completed bounties
          </div>
          <div className="flex items-center justify-start gap-2">
            <span>{isSoloBounty ? "Solo Bounty" : "Open Bounty"}</span>
            <Switch
              disabled={isSubmiting}
              checked={isSoloBounty}
              onClick={() => setIsSoloBounty(!isSoloBounty)}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                "& .MuiSwitch-thumb": {
                  color: isSoloBounty ? "rgb(241, 94, 95)" : "default",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "white",
                },
              }}
            />
          </div>
          <div className="text-xs">
            <span className="flex gap-2 items-center max-w-md">
              <InfoIcon width={18} height={18} />
              {isSoloBounty
                ? "you are the sole bounty contributor"
                : "users can add additional funds to your bounty"}
            </span>
          </div>
        </Box>
        <DialogActions>
          <button
            disabled={isSubmiting}
            className={"flex flex-row items-center justify-center"}
            onClick={async () => {
              if (!title || !description || !reward) {
                toast.error("Please fill in all fields.");
                return;
              }

              if (account.isDisconnected) {
                toast.error("Please connect your wallet.");
                return;
              }
              const chain = chains[selectedChain];

              const walletChainId = await account.connector?.getChainId();
              if (walletChainId !== chain.chainId) {
                await switchChain.switchChainAsync({ chainId: chain.chainId });
              }
              try {
                setIsSubmiting(true);
                const tx = await writeContract.writeContractAsync({
                  abi: ABI,
                  address: chain.POIDContranct,
                  functionName: isSoloBounty
                    ? "createSoloBounty"
                    : "createOpenBounty",
                  args: [title, description],
                  chainId: chain.chainId,
                  value: parseEther(reward),
                });

                const receipt = await chain.provider.waitForTransactionReceipt({
                  hash: tx,
                });

                const log = receipt.logs[0];

                if (!log) {
                  throw new Error("No logs found");
                }

                const data = decodeEventLog({
                  abi: ABI,
                  data: log.data,
                  topics: log.topics,
                });

                if (data.eventName !== "BountyCreated") {
                  throw new Error("Invalid event: " + data.eventName);
                }

                const bountyId = (data.args as any).id.toString();
                setIsSubmiting(false);

                toast.success("Bounty created");
                window.open(
                  `https://poidh.xyz/${chain.name}/bounty/${bountyId}`,
                  "_blank"
                );
              } catch (error) {
                toast.error("Failed!");
                return;
              }
            }}
          >
            <GameButtonNoHover />
            <Button>create bounty</Button>
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default BountyDialog;
