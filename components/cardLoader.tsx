import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardLoader = () => {
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    return (
        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-1">
            {
                numbers.map((number) => (
                    <div className='card' key={number}>
                        <div className="aspect-square overflow-hidden">
                            <Skeleton className='h-full' />
                        </div>
                        <div className="py-2 px-3">
                            <Skeleton count={3} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CardLoader