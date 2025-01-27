import axios from "axios";
import { getApiUrl } from "../../app/apiPrefix";
import { AppThunk } from "../../app/store";
import { nicknameSet, opponentReceived, User, userReceived } from "./userSlice";

export const getUser = (): AppThunk => async (dispatch) => {
  const { data: user } = await axios.get<User>(getApiUrl("/user"));
  console.log("user", user);

  dispatch(userReceived(user));
};

export const setNickname =
  (nickname: string): AppThunk =>
  async (dispatch, getState) => {
    const id = getState().user.user?.id;
    if (!id) {
      console.error("couldn't set nickname on user without ID");
      return;
    }
    try {
      await axios.post(getApiUrl("/user/nickname"), {
        nickname,
      });
    } catch (e) {
      throw e.response?.data?.message ?? e.toString();
    }
    dispatch(nicknameSet(nickname));
  };

export const fetchOpponent =
  (id: string): AppThunk =>
  async (dispatch) => {
    const opponent = await axios.get<User>(getApiUrl("/user", id));
    console.log("opponent", opponent.data);
    dispatch(opponentReceived(opponent.data));
  };
