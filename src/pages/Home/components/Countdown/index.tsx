/* eslint-disable no-undef */
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCycles } from '../../../../contexts/CyclesContext'
import {
  ActionTypes,
  markCurrentCycleAsFinishedAction,
} from '../../../../reducers/cycles/actions'

import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    dispatch,
    activeCycleId,
    amountSecondsPast,
    setAmountSecondsPast,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - Ignite Timer`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDateTime),
        )

        if (secondsDifference >= totalSeconds) {
          dispatch(markCurrentCycleAsFinishedAction())

          setAmountSecondsPast(totalSeconds)

          clearInterval(interval)
        } else {
          setAmountSecondsPast(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, dispatch, setAmountSecondsPast])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
