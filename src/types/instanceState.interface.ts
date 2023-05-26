export interface IInstanceState {
  stateInstance:
    | "authorized"
    | "notAuthorized"
    | "blocked"
    | "sleepMode"
    | "starting";
}
