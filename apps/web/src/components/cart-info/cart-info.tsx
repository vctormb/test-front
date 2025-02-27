import { useFetchCart } from '@/hooks'
import { moneyFormatter } from '@/utils'
import { ReactNode } from 'react'
import { Skeleton } from 'ui'
import { useTabsContext } from 'ui'
import { Button } from 'ui'
import { PAYMENT_TAB_FORM_ID } from '../payment-tab'
import { useFormContext } from 'react-hook-form'
import { Card } from '../card'

// ROOT

export function CartInfoRoot({ children }: { children: ReactNode }) {
  return (
    <Card className="h-fit gap-6 border-transparent md:mx-2 md:my-10 md:min-w-[320px] md:border-neutral-500">
      {children}
    </Card>
  )
}

// INFO DATA

export function CartInfoData() {
  const { data, isLoading } = useFetchCart()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 first:mt-4 last:mb-4" quantity={3} />
      </div>
    )
  }

  const quantity = data?.items.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <ul className="flex flex-col gap-2">
      <li className="flex justify-between text-sm">
        <label>Produtos: ({quantity} itens)</label>
        <span>{moneyFormatter.format(data!.total)}</span>
      </li>
      <li className="flex justify-between text-sm">
        <label>Frete</label>
        <span>{moneyFormatter.format(data!.shippingTotal)}</span>
      </li>
      <li className="flex justify-between text-sm">
        <label>Desconto</label>
        <span className="font-bold text-purple-500">{moneyFormatter.format(data!.discount)}</span>
      </li>
      <li className="flex justify-between">
        <label className="font-bold">Subtotal</label>
        <span className="font-bold">{moneyFormatter.format(data!.subTotal)}</span>
      </li>
    </ul>
  )
}

// SUBMIT

export function CartInfoSubmit() {
  const { isLoading } = useFetchCart()
  const tabs = useTabsContext()
  const {
    reset,
    formState: { isValid }
  } = useFormContext()

  function onResetForm() {
    reset()
    tabs.setTabKey('cart')
  }

  if (isLoading) {
    return <Skeleton className="h-14" />
  }

  if (tabs.tabKey === 'cart') {
    return (
      <Button type="button" onClick={() => tabs.setTabKey('payment')}>
        Seguir para o pagamento
      </Button>
    )
  }

  if (tabs.tabKey === 'payment') {
    return (
      <Button key="payment" type="submit" form={PAYMENT_TAB_FORM_ID} disabled={!isValid}>
        Finalizar pedido
      </Button>
    )
  }

  return (
    <>
      <Button color="black" onClick={onResetForm}>
        Voltar ao início do protótipo
      </Button>
    </>
  )
}
