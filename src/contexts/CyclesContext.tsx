import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle } from '../@types'
import { cyclesReducer } from '../reducers/cycles/reducer'

type CyclesContextData = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  dispatch: Dispatch<any>
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem('@IgniteTimer:cycles')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )
  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDateTime),
      )
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@IgniteTimer:cycles', stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        dispatch,
        activeCycle,
        activeCycleId,
        amountSecondsPast,
        setAmountSecondsPast,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
