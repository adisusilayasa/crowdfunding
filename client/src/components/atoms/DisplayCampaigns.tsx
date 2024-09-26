import React from 'react';
import { Campaign } from '../../context';
import { loader } from '../../assets';
import { useNavigate } from 'react-router-dom';
import FundCard from '../moleculs/FundCard';

type DisplayCampaignsProps = {
  title?: string;
  isLoading?: boolean;
  campaigns?: Campaign[];
};

export const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ title, campaigns, isLoading }) => {
  const navigate = useNavigate();

  function handleNavigate(campaign: Campaign) {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  }

  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>
        {title} ({campaigns?.length})
      </h1>

      <div className='flex flex-wrap gap-[26px] mt-[20px]'>
        {isLoading && (
          <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain' />
        )}

        {!isLoading && campaigns?.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#808191]'>
            No campaigns found
          </p>
        )}

        {!isLoading && campaigns && campaigns?.length > 0 && campaigns.map((campaign: Campaign) => (
          <FundCard key={campaign.pId} {...campaign} handleClick={() => handleNavigate(campaign)} />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
