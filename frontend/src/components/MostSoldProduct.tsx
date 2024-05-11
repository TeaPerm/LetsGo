import { MostSoldProduct } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Box } from 'lucide-react'

interface MostSoldProductProps{
    data: MostSoldProduct,
}

const MostSoldProductCard = ({data} : MostSoldProductProps) => {

    const {count,product,totalIncome,totalQuantity} = data
    console.log(data)

  return (
    <Card className='col-span-2'>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        Most Sold Product
      </CardTitle>
      <Box className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className='flex'>
        <img src={product.image} className='w-64 h-64'/>
        <div className='flex flex-col'>
        <span>
            {product.name}
        </span>
        <span>
            Number of sales: {count}
        </span>
        <span>
            Order count: {totalQuantity}
        </span>
        <span>
            Total income: {totalIncome}
        </span>
        </div>
    </CardContent>
    </Card>
  )
}

export default MostSoldProductCard
