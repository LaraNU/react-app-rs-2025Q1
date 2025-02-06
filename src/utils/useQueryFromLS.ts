import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useQueryFromLS = (
  key: string,
  initialValue: string
): [
  string,
  Dispatch<SetStateAction<string>>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
] => {
  const [searchValue, setSearchValue] = useState(() => {
    const queryFromStorage = localStorage.getItem(key);
    return queryFromStorage || initialValue;
  });
  const [searchPerformed, setSearchPerformed] = useState(() => {
    return localStorage.getItem('searchPerformed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem(key, searchValue);
    if (searchValue === '') {
      localStorage.removeItem(key);
    }
  }, [key, searchValue]);

  useEffect(() => {
    localStorage.setItem('searchPerformed', String(searchPerformed));
  }, [searchPerformed]);

  return [searchValue, setSearchValue, searchPerformed, setSearchPerformed];
};
