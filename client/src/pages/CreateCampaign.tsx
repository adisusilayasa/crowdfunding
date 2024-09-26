import React, { useState } from 'react'
import {ethers} from 'ethers'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/organisms/FormField'
import { money } from '../assets'
import CustomButton from '../components/moleculs/CustomButton'
import { useStateContext } from '../context'
import { checkIfImage } from '../utils/utils'

function CreateCampaign() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { createCampaign } = useStateContext()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  })

  const handleFormChange =(fieldName:string, e:any) => {
    setForm({...form, [fieldName]: e.target.value})
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    checkIfImage(form.image,async (exists: boolean) => {
      if(exists){
        setIsLoading(true)
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target,18)})
        setIsLoading(false)
        navigate('/')
      }else{
        alert('Provided valid image URL')
        setForm({...form, image: ''})
      }
    })
    console.log(form)
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && 'Loading...'}
      <div className='flex justify-center items-center p-[16px] sm:min-2-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px]'>
          Start a campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName = "Your Name"
            placeholder="Enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e:any) => handleFormChange('name', e)}
          />
          <FormField
            labelName = "Campaign Title"
            placeholder="Enter campaign title"
            inputType="text"
            value={form.title}
            handleChange={(e:any) => handleFormChange('title', e)}
          />
        </div>
        <FormField
          labelName = "Story"
          placeholder="Write your story"
          isTextArea={true}
          inputType="text"
          value={form.description}
          handleChange={(e:any) => handleFormChange('description', e)}
        />

        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img src={money} alt='money' className='w-[40px] h-[40px] object-contain'/>
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName = "Goal"
            placeholder="ETH 0.5"
            inputType="number"
            value={form.target}
            handleChange={(e:any) => handleFormChange('target', e)}
          />
          <FormField
            labelName = "End Date"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e:any) => handleFormChange('deadline', e)}
          />
        </div>
        <FormField
          labelName = "Campaign Image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e:any) => handleFormChange('image', e)}
        />
        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton btnType='submit' title='Submit New Campaign' styles='bg-[#1dc071]'/>
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign