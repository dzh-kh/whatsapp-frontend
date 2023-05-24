import { IInstanceState } from "../../types/instanceState.interface";
import { $api } from "../http";

export const AuthService = {
  async login(
    idInstance: number,
    apiTokenInstance: string
  ): Promise<IInstanceState> {
    const { data } = await $api.get(
      `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    return data.instanceState;
  },

  async logout() {
    localStorage.clear();
  },
};
