import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

// high order function
export function withSSRGuest<P>(fn: GetServerSideProps<P>) { // we recieve the next getStatic function and a generic type that can be used as the return type 
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = ctx.req.cookies;

    const token = cookies['nextauth.token']; // if the user is logged, we execute this block 
    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    return await fn(ctx);// if not, we execute the default passed
  }
}