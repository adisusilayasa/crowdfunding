import React from 'react'
import { daysLeft } from '../../utils/utils';
type FundCardProps = {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  pId: number;
  styles?: string;
  handleClick?: any;
};
const FundCard: React.FC<FundCardProps>  = ({owner, title, description, target, deadline, amountCollected, image, handleClick}) => {
  const remainingDays = daysLeft(deadline)

  return (
    <div className=''>

    </div>
  )
}

export default FundCard