export function updateActiveNavigation(navItem) {
	return {
		type: '@nav/UPDATE_ACTIVE_NAVIGATION_REQUEST',
		payload: { navItem },
	};
}
