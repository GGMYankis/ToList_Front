import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { getToken } from './Helpers/auth';

export const loginGuard = () => {
    const router = inject(Router);
    if (getToken()) {
        return true;
    } else {
        return false;
    }
};

export const loginRedirectGuard = () => {
    const router = inject(Router);

    if (getToken()) {
        router.navigate(['/pages/teams']);
        return false;
    }
    return true;
};

