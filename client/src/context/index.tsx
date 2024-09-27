import React, { useContext, createContext, ReactNode } from 'react';
import { useAddress, useContract, useConnect, metamaskWallet, useContractWrite } from '@thirdweb-dev/react';
import  { utils }  from 'ethers';
import { SmartContract } from '@thirdweb-dev/sdk';
import { BigNumber } from 'ethers';
// Define the shape of your context
interface StateContextType {
  address: string | undefined;
  contract: SmartContract | undefined;
  connect: any;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: number, amount: string) => Promise<unknown>;
  getDonations: (pId: number) => Promise<Donation[]>;
}

interface CampaignForm {
  title: string;
  description: string;
  target: BigNumber;
  deadline: string;
  image: string;
}

export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  pId: number;
}

export interface Donation {
  donator: string;
  donation: string;
}

// Create the context with a default value
const StateContext = createContext<StateContextType | undefined>(undefined);

// Create a provider component
export const StateContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const { contract } = useContract(contractAddress);
  const { mutateAsync: createCampaign } = useContractWrite(contract as SmartContract, 'createCampaign');

  const address = useAddress();
  const connect = useConnect();

  const publishCampaign = async (form: CampaignForm) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    const campaigns = await contract?.call('getCampaigns');
    const parsedCampaigns = campaigns.map((campaign: any, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async (): Promise<Campaign[]> => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  };

  const donate = async (pId: number, amount: string): Promise<unknown> => {
    const data = await contract?.call('donateToCampaign', [pId], { value: utils.parseEther(amount) });

    return data;
  };

  const getDonations = async (pId: number): Promise<Donation[]> => {
    const donations = await contract?.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations: Donation[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const contextValue: StateContextType = {
    address,
    contract,
    connect,
    createCampaign: publishCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContextProvider');
  }
  return context;
};
