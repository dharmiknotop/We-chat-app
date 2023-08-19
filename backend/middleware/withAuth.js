export function withAuth(gssp) {
  return async (context) => {
    const { req } = context;
    const tokens = req?.headers?.cookie?.split('=');
    const token = (tokens && tokens[1]) || '';

    if (!token || token === undefined || token === '' || token === 'null') {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    const gsspData = await gssp(context);

    return {
      props: {
        ...gsspData.props,
      },
    };
  };
}
