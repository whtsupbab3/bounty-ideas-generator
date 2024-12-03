import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Switch } from '@mui/material';
import { Bounty } from './BountyItem';
import { InfoIcon } from '../ui/InfoIcon';
import GameButton from '../ui/GameButton';
import Button from '../ui/Button';

interface BountyDialogProps {
    isOpen: boolean;
    selectedBounty: Bounty | undefined;
    handleClose: () => void;
};

type Chain = 'degen' | 'eth' | 'base';

const BountyDialog = ({ isOpen, selectedBounty, handleClose }: BountyDialogProps) => {
    const [title, setTitle] = useState<string | undefined>(selectedBounty?.title);
    const [description, setDescription] = useState<string | undefined>(selectedBounty?.description);
    const [reward, setReward] = useState<number>(0);
    const [selectedChain, setSelectedChain] = useState<Chain>('eth');
    const [isSoloBounty, setIsSoloBounty] = useState<boolean>(true);

    useEffect(() => {
        if (selectedBounty) {
          setTitle(selectedBounty.title);
          setDescription(selectedBounty.description);
        }
    }, [selectedBounty]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                handleClose();
            }}
            maxWidth='xs'
            fullWidth
            PaperProps={{
            className: 'bg-poidhBlue/90 text-white',
            style: {
                borderRadius: '30px',
                color: 'white',
                border: '1px solid #D1ECFF',
            },
            }}
        >
        <DialogContent>
          <Box display='flex' flexDirection='column' width='100%'>
            <span>title</span>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4'
            />
            <span>description</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md mb-4 max-h-44'
            ></textarea>

            <span>reward</span>
            <div className="flex flex-col sm:flex-row items-center sm:gap-2 gap-4 w-full mb-[10px]">
                <input
                type="number"
                value={reward}
                onChange={(e) => setReward(Number(e.target.value))}
                className="flex-grow sm:w-[70%] w-full border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md my-0 h-[100%]"
                />
                <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value as Chain)}
                className="flex-grow sm:w-[25%] w-full border bg-transparent border-[#D1ECFF] py-2 px-2 rounded-md my-0 h-[100%]"
                >
                    <option value="eth">eth</option>
                    <option value="degen">degen</option>
                    <option value="base">degen</option>
                </select>
             </div>
            <div className='flex text-balance gap-2 text-xs mb-2 items-center'>
              <InfoIcon width={18} height={18} /> a 2.5% fee is deducted from
              completed bounties
            </div>
            <div className='flex items-center justify-start gap-2'>
              <span>{isSoloBounty ? 'Solo Bounty' : 'Open Bounty'}</span>
              <Switch
                checked={isSoloBounty}
                onClick={() => setIsSoloBounty(!isSoloBounty)}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                    '& .Mui-checked': {
                      color: 'rgb(241, 94, 95)', 
                    },
                    '& .Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#fff', 
                    },
                  }}
              />
            </div>
            <div className=' text-xs'>
              <span className='flex gap-2 items-center max-w-md '>
                <InfoIcon width={18} height={18} />
                {isSoloBounty
                  ? 'you are the sole bounty contributor'
                  : 'users can add additional funds to your bounty'}
              </span>
            </div>
            </Box>
            <DialogActions>
                <button
                    className={'flex flex-row items-center justify-center'}
                    onClick={() => {
                        console.log('title', title)
                        console.log('description', description)
                        console.log('reward', reward)
                        console.log('chain', selectedChain)
                        console.log('is solo', isSoloBounty)
                    }}
                    // disabled={account.isDisconnected}
                    // IVAN HELP PLEASE 
                >
                    <div className='button'>
                    <GameButton />
                    </div>
                    <Button onClick={() => {}}>create bounty</Button>
                </button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    );
}

export default BountyDialog;