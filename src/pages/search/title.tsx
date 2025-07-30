import React from 'react'
import type { GetAllGigsParams } from '../../types'

const Title = ({category,search}:GetAllGigsParams) => {
  return (

        <h1>
            {search ? (
                <p>
                    <span className='font-bold'>{search}</span> için arama sonuçları
                </p>
            ) : category ? (
                <p>
                    <span className='font-bold'>{category}</span> kategorisi için sonuçlar
                </p>
            ): (
                <p>Bütün Sonuçlar</p>
            ) }
        </h1>

)
}

export default Title