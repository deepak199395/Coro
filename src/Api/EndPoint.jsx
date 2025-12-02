const BASE_URL = "https://shop999backend.vercel.app/api/v1";

const API = {
  base: BASE_URL,

  // -------- AUTH (39,40,36) -------- //
  AUTH_REGISTER: `${BASE_URL}/auth/register/api39`,
  AUTH_LOGIN: `${BASE_URL}/auth/login/api40`,
  CORO_USER_LOGIN: `${BASE_URL}/auth/coro-user/login/api36`,
  
  // -------- CORO USERS (31–35) -------- //
  CORO_USER_CREATE: `${BASE_URL}/coro/users/create/api31`,
  CORO_USER_LIST: `${BASE_URL}/coro/users/list/api32`,
  CORO_USER_GET: (id) => `${BASE_URL}/coro/users/get/api33/${id}`,
  CORO_USER_UPDATE: (id) => `${BASE_URL}/coro/users/update/api34/${id}`,
  CORO_USER_DELETE: (id) => `${BASE_URL}/coro/users/delete/api35/${id}`,

  // -------- DIARY (37,38) -------- //
  DIARY_CREATE: `${BASE_URL}/diary/create/api37`,
  DIARY_LIST: `${BASE_URL}/diary/list/api38`,

  // -------- EMI (41,42) -------- //
  EMI_CREATE: `${BASE_URL}/emi/create/api41`,
  EMI_LIST: `${BASE_URL}/emi/list/api42`,

  // -------- NEW EXPENSES (43–47) -------- //
  EXPENSE_CREATE: `${BASE_URL}/expenses/create/api43`,
  EXPENSE_LIST: `${BASE_URL}/expenses/list/api44`,
  EXPENSE_UPDATE: (id) => `${BASE_URL}/expenses/update/api46/${id}`,
  EXPENSE_DELETE: (id) => `${BASE_URL}/expenses/delete/api47/${id}`,

  // -------- PIN APIs (48–50) -------- //
  PIN_CREATE: `${BASE_URL}/pins/create/api48`,
  PIN_LIST: `${BASE_URL}/pins/list/api49`,
  PIN_VERIFY: `${BASE_URL}/pins/verify/api50`,
};

export default API;
