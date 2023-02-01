/* eslint-disable no-undef */
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCycles } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    setCycles,
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

  // LOGICA DO COUNTDOWN
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDateTime,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              }

              return cycle
            }),
          )

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
  }, [activeCycle, totalSeconds, activeCycleId, setCycles])

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
