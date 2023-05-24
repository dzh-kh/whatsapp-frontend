export interface IInstanceState {
  instanceState:
    | "authorized"
    | "notAuthorized"
    | "blocked"
    | "sleepMode"
    | "starting";
}
