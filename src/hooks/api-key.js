// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
/* eslint-disable require-atomic-updates */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { params } = context;

    if(params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'jwt',
          accessToken: params.query.accessToken
        },
      };
    }

    return context;
  };
};