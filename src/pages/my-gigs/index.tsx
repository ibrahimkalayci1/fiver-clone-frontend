import React, { type FC } from 'react'
import { useProfile } from '../../service/auth'
import { useGetAllGigs } from '../../service/gig'
import Error from '../../components/error'
import type { AxiosError } from 'axios'
import Loader from '../../components/loader'
import Card from '../../components/card'
import type { Err } from '../../types'



const MyGigs: FC  = () => {

  // kullanıcının profile verilerini al
  const {user} = useProfile()



  // kullanıcıya aiy hizmet verilerini al
 const {isLoading,error,data,refetch} = useGetAllGigs({userId:user!.id})
  return (
    <div> 
      <h1 className='font-bold text-3xl mb-5 text-gray-600'>
        Hizmetlerim</h1>


      <div>
        {isLoading ? (
          <Loader/>
        ) : error ? (
        <Error error={error as Err} 
          refetch={refetch}/>
        ): (
          data && (
            <div className='layout'>
              {data.map((item) => (
                <Card key={item._id} item={item} expand/> //!sadece hizmetlerim bölümünde gigsleri silmek için 3.adım
              ) )}
            </div>
          )
        ) }
      </div>


    </div>
  )
}

export default MyGigs