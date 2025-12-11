export interface UpdateTrainSchedule {
  trainScheduleId: number | undefined,
  trainId: number,
  departureFrom: string,
  arrivalAt: string,
  departureDate: Date | null | undefined,
  arrivalDate: Date | null | undefined
}
