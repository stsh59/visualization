import { Request, Response } from "express";
import AuthService from "./auth.service";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    await AuthService.signup(name, email, password);
    res.json({
      success: true,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.login(email, password);
    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getMe(res.locals.user._id);
    res.json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export default { login, signup, getMe };
