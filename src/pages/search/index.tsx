import React, { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetAllGigs } from '../../service/gig'
import Title from './title'
import Error from '../../components/error'
import Loader from '../../components/loader'
import Card from '../../components/card'
import type { Err } from '../../types'

const Search:FC = () => {
  //! soru işaretinden sonrası oldugu için searchparams
  const [searchParams] = useSearchParams() 

// urldeki parametrelere eriş
  const query = searchParams.get("query")
  const category = searchParams.get("category")


// api ye gönderilecek parametreleri oluştur
const params = {
  category,
  search:query,
}

// api den hizmet verilerini al

const {isLoading,error,data,refetch} = useGetAllGigs(params);




  return (
    <div>
      <Title search={query} category={category} />

    {isLoading ? ( 
      <Loader designs='my-40' />
    ) : error ? (
    <Error error={error as Err } refetch={refetch}/> 
  ) :  (
      <div className='layout'>
        {data?.map((item) => (
          <Card key={item._id} item={item}/>
        ) )}
      </div>
    ) }

    </div>
  )
}

export default Search