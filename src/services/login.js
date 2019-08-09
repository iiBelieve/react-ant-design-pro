import request from '@/utils/request';

export async function loginServer(params) {
  console.log(params);
  return request('/middlegulf/api/login/sysuser', {
    method: 'POST',
    body: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

