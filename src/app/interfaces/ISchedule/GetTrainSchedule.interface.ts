export interface GetTrainSchedule {
  trainScheduleId: number,
  trainId: number,
  departureFrom: string,
  arrivalAt: string,
  departureDate: Date,
  arrivalDate: Date
}
