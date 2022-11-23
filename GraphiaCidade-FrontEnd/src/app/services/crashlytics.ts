const { newrelic } = window;

export const sendError = (err: any) => {
  if (process.env.NODE_ENV === 'production') {
    newrelic.noticeError(err);
  }
};

export const setProp = (name: string, value: string) => {
  newrelic.interaction()
    .setAttribute(name, value);
};
