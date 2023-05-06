import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Error al cargar el usuario');
  }
  return res.json();
}

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user', fetcher);

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
