import { moneyFormatter } from '@/utils'
import { ReactNode } from 'react'

// ROOT

export function CartProductItemRoot({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 md:pr-7">{children}</div>
  )
}

// INFO

type CartProductItemInfoProps = {
  description: string
  imgSrc: string
}

export function CartProductItemInfo({ description, imgSrc }: CartProductItemInfoProps) {
  return (
    <div className="flex flex-1 items-center gap-3">
      <img
        className="h-[60px] w-[60px] object-cover md:h-20 md:w-20"
        alt={description}
        src={imgSrc}
      />
      <p className="max-w-[200px] text-xs md:max-w-[400px]">{description}</p>
    </div>
  )
}

// PRICE

type CartProductItemPriceProps = {
  price: number
  maxPrice?: number | false
}

export function CartProductItemPrice({ price, maxPrice }: CartProductItemPriceProps) {
  return (
    <div className="flex flex-col gap-1">
      {maxPrice && (
        <span className="text-sm text-neutral-600 line-through">
          {moneyFormatter.format(maxPrice)}
        </span>
      )}
      <span className="text-sm font-bold">{moneyFormatter.format(price)}</span>
    </div>
  )
}
