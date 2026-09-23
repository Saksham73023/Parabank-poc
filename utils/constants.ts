export const routes = {
  home: '/parabank/index.htm',
  register: '/parabank/register.htm',
  overview: '/parabank/overview.htm',
  openAccount: '/parabank/openaccount.htm',
  transfer: '/parabank/transfer.htm',
  billPay: '/parabank/billpay.htm',
  findTransactions: '/parabank/findtrans.htm',
  updateProfile: '/parabank/updateprofile.htm'
} as const;

export const selectors = {
  logout: 'a[href="logout.htm"]',
  loginError: '.error'
} as const;
