import React, { useEffect, useState } from 'react'
import { Campaign, useStateContext } from '../context'
import DisplayCampaigns from '../components/atoms/DisplayCampaigns'

function Profile() {

  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const {address, contract, getUserCampaigns} = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(()=> {
    if (contract) fetchCampaigns()
  },[address,contract])

  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  )
}

export default Profile