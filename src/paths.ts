export const paths = {
  home: '/',
  login:'/login',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    detail:'/dashboard/detail/:id',
    customers: '/dashboard/posts',
    orders: '/dashboard/orders',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
