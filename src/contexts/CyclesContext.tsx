import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { Cycle } from '../@types'

type CyclesContextData = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  setActiveCycleId: Dispatch<SetStateAction<string | null>>
  setCycles: Dispatch<SetStateAction<Cycle[]>>
  activeCycleId: string | null
  amountSecondsPast: number
  setAmountSecondsPast: Dispatch<SetStateAction<number>>
}

interface CyclesProviderProps {
  children: ReactNode
}

const CyclesContext = createContext<CyclesContextData>({} as CyclesContextData)

export const useCycles = () => {
  const context = useContext(CyclesContext)

  return context
}

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPast, setAmountSecondsPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        setCycles,
        activeCycle,
        setActiveCycleId,
        activeCycleId,
        amountSecondsPast,
        setAmountSecondsPast,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
