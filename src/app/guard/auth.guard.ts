import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../servizi/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Accedi al servizio di autenticazione per ottenere le informazioni sull'utente corrente e i suoi permessi
  const authService = new AuthService()

  // Esempio: controlla se l'utente ha un determinato permesso
  const requiredPermission: string = route.data['requiredPermission']; // Ottieni il permesso richiesto dalla route
  const userPermissions: string[] = authService.getPermission(); // Ottieni i permessi dell'utente corrente

  // Verifica se l'utente ha il permesso richiesto
  console.log("requiredPermission")
  console.log(requiredPermission)
  console.log("requiredPermission")
  console.log(userPermissions)
  if (userPermissions.includes(requiredPermission)) {
    return true; // L'utente ha il permesso richiesto, consente l'accesso
  } else {
    return false; // L'utente non ha il permesso richiesto, nega l'accesso
  }
};
