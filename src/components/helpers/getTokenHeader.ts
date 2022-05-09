export const getTokenHeader = () => {
  const storage = localStorage.getItem('persist:root') as string;
  const token = JSON.parse(JSON.parse(storage).user).data.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};
