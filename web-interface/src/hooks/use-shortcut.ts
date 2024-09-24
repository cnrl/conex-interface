import { Dispatch, SetStateAction, useEffect } from 'react';

export function useStateToggleShortcutOn(key: string, setIsOpen: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((navigator?.platform?.toLowerCase().includes('mac') ? e.metaKey : e.ctrlKey) && e.key === key) {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(currentValue => !currentValue);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
