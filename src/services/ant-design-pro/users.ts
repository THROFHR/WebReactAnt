// @ts-ignore
/* eslint-disable */
import request from '@/services/request';

/** 此处后端没有提供注释 POST /api/users/login */
export async function UsersControllerLogin(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.UserLoginResponseDto>('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/users/logout */
export async function UsersControllerLogout(options?: { [key: string]: any }) {
  return request<API.ResponseDto>('/api/users/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/users/me */
export async function UsersControllerGetUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/users/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/users/me */
export async function UsersControllerUpdate(
  body: API.UpdateUserDto,
  options?: { [key: string]: any },
) {
  return request<API.UserDto>('/api/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/users/me */
export async function UsersControllerDelete(options?: { [key: string]: any }) {
  return request<API.UserDto>('/api/users/me', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/users/register */
export async function UsersControllerRegister(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<API.UserLoginResponseDto>('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/users/sendSms */
export async function UsersControllerSendSms(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/api/users/sendSms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
