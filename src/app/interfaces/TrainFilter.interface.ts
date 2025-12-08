export interface TrainFilter {
  trainId: number,
  trainName: string,
  trainNumber: number,
  departureFrom: string,
  arrivalAt: string,
  departureDate: string | null,
  arrivalDate: string | null
}
