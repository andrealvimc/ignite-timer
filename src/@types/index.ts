export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDateTime: Date
  interruptedDate?: Date
  finishedDate?: Date
}
