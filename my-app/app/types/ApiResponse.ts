import { IMessage } from "@/app/model/UserSchema";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: IMessage[];
}
