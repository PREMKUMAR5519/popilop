import { createContext, useEffect, useState } from 'react';
import {
  adminApi,
  analyticsApi,
  automationsApi,
  creatorApi,
  crmApi,
  instagramApi,
  linksApi,
  ordersApi,
  productsApi,
  schedulerApi,
  settingsApi
} from '../api/appApi';
import { useAuth } from '../hooks/useAuth';

const initialState = {
  creatorProfile: null,
  landingPage: null,
  dashboard: null,
  links: { socialLinks: [], affiliateLinks: [] },
  instagram: { connection: null, status: { status: 'not-connected', lastSyncedAt: null } },
  crm: { items: [], meta: null },
  scheduler: [],
  automations: { automations: [], logs: [] },
  products: { items: [], meta: null },
  orders: [],
  settings: null,
  mediaLibrary: [],
  adminOverview: null,
  adminUsers: []
};

const AppDataContext = createContext({
  ...initialState,
  loading: false,
  error: null,
  refresh: async () => {}
});

export function AppDataProvider({ children }) {
  const { isAuthenticated, user, authReady } = useAuth();
  const [state, setState] = useState({
    ...initialState,
    loading: false,
    error: null
  });

  const refresh = async () => {
    if (!isAuthenticated || !user) {
      setState({
        ...initialState,
        loading: false,
        error: null
      });
      return;
    }

    setState(current => ({ ...current, loading: true, error: null }));

    try {
      if (user.role === 'admin') {
        const [adminOverview, adminUsers] = await Promise.all([adminApi.overview(), adminApi.users()]);
        setState({
          ...initialState,
          loading: false,
          error: null,
          adminOverview,
          adminUsers
        });
        return;
      }

      const [
        creatorProfile,
        landingPage,
        dashboard,
        links,
        instagram,
        crm,
        scheduler,
        automations,
        products,
        orders,
        settings,
        mediaLibrary
      ] = await Promise.all([
        creatorApi.profile(),
        creatorApi.landingPage(),
        analyticsApi.dashboard(),
        linksApi.list(),
        instagramApi.connection(),
        crmApi.list({ limit: 50 }),
        schedulerApi.list(),
        automationsApi.list(),
        productsApi.list({ limit: 50 }),
        ordersApi.list(),
        settingsApi.get(),
        settingsApi.mediaLibrary()
      ]);

      setState({
        loading: false,
        error: null,
        creatorProfile,
        landingPage,
        dashboard,
        links,
        instagram,
        crm: { items: crm.items || [], meta: crm.meta || null },
        scheduler,
        automations,
        products: { items: products.items || [], meta: products.meta || null },
        orders,
        settings,
        mediaLibrary,
        adminOverview: null,
        adminUsers: []
      });
    } catch (error) {
      setState(current => ({
        ...current,
        loading: false,
        error
      }));
    }
  };

  useEffect(() => {
    if (!authReady) {
      return;
    }
    refresh();
  }, [authReady, isAuthenticated, user?.role]);

  return <AppDataContext.Provider value={{ ...state, refresh }}>{children}</AppDataContext.Provider>;
}

export default AppDataContext;
