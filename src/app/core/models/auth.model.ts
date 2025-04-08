export interface AuthFormValue {
  email: string;
  password: string;
  username?: string;
}

export interface LoginSuccessResponse {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

export interface LoginErrorResponse {
  message: string;
}

export interface RegisterSuccessResponse {
  message: 'User registered';
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'user';
  };
}

export interface RegisterErrorResponse {
  message: 'Email already registered';
}
