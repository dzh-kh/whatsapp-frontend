import { IInstanceState } from "../../types/instanceState.interface";
import { $api } from "../http";

export const AuthService = {
  async checkInstance(
    idInstance: string,
    apiTokenInstance: string
  ): Promise<IInstanceState> {
    const { data } = await $api.get(
      `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    return data;
  },
};
