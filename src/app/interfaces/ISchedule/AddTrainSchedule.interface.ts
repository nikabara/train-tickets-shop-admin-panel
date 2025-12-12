export interface AddTrainSchedule {
  trainId: number,
  departureFrom: string,
  arrivalAt: string,
  departureDate: Date | null,
  arrivalDate: Date | null
}
