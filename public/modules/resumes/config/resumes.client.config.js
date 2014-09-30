'use strict';

// Configuring the Articles module
angular.module('resumes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Resumes', 'resumes', 'dropdown', '/resumes(/create)?');
		Menus.addSubMenuItem('topbar', 'resumes', 'View My Resume', 'resumes_users/view');
		Menus.addSubMenuItem('topbar', 'resumes', 'Update My Resume', 'resumes_users');
	}
]);
