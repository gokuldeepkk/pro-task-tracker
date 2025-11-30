import * as jwt from "jsonwebtoken";
export class TokenService {
  generateToken(payload: object): string {
    // Token generation logic to be implemented
    return jwt.sign(payload, "gokul", { expiresIn: "1h" });
  }
}
