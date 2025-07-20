export const queryKeys = {
    clients: {
        all: ['clients'] as const,
        lists: () => [...queryKeys.clients.all, 'list'] as const,
        list: (filters: Record<string, any> = {}) =>
            [...queryKeys.clients.lists(), filters] as const,
        details: () => [...queryKeys.clients.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.clients.details(), id] as const,
        search: (query: string) => [...queryKeys.clients.all, 'search', query] as const,
    },

    // Add other entities as needed
    // users: {
    //   all: ['users'] as const,
    //   lists: () => [...queryKeys.users.all, 'list'] as const,
    //   detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
    // },

    // projects: {
    //   all: ['projects'] as const,
    //   lists: () => [...queryKeys.projects.all, 'list'] as const,
    //   detail: (id: string) => [...queryKeys.projects.all, 'detail', id] as const,
    //   byClient: (clientId: string) => [...queryKeys.projects.all, 'client', clientId] as const,
    // }
} as const;