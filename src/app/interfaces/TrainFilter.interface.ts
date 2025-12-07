export interface TrainFilter {
  trainName: string,
  trainNumber: number,
  departureFrom: string,
  arrivalAt: string,
  departureDate: string | null,
  arrivalDate: string | null
}
