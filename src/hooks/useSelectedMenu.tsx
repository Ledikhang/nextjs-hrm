import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useSelectedMenu(defaultPath: string = '/') {
    const pathname = usePathname();
    const [selectedMenu, setSelectedMenu] = useState<string>(defaultPath);

    useEffect(() => {
        setSelectedMenu(pathname ?? defaultPath);
    }, [pathname, defaultPath]);

    return selectedMenu;
}