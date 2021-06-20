import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

// high order function
export function withSSRAuth<P>(fn: GetServerSideProps<P>) { // we recieve the next getStatic function and a generic type that can be used as the return type 
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = ctx.req.cookies;

    const token = cookies['nextauth.token'];
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
    return await fn(ctx);
  }
}