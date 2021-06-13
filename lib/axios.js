import axios from 'axios';

axios.interceptors.request.use((x) => {
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

axios.interceptors.response.use(
  (x) => {
    console.log(
      `Execution time for: ${x.config.url} - ${
        new Date().getTime() - x.config.meta.requestStartedAt
      } ms`
    );
    return x;
  },
  // Handle 4xx & 5xx responses
  (x) => {
    console.error(
      `Execution time for: ${x.config.url} - ${
        new Date().getTime() - x.config.meta.requestStartedAt
      } ms`
    );
    throw x;
  }
);

export default axios;
