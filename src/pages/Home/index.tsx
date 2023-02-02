/* eslint-disable no-undef */
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Cycle } from '../../@types'
import { useCycles } from '../../contexts/CyclesContext'
import { newCycleFormSchema } from '../../helpers/validators/cycleFormSchema'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCycleAction,
} from '../../reducers/cycles/actions'

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const { activeCycle, dispatch, activeCycleId, setAmountSecondsPast } =
    useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDateTime: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPast(0)

    reset()
  }

  const handleInterruptCycle = () => {
    dispatch(interruptCycleAction())
  }

  document.title = `Ignite Timer`
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            onClick={() => handleInterruptCycle()}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
