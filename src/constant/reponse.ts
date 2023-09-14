export const SuccessResponseFunc = (
  message = null,
  statusCode = 200,
  data = {},
) => {
  return {
    valid: true,
    message: message ?? 'Success',
    status: statusCode,
    data,
  };
};
