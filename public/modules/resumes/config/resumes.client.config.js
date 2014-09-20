'use strict';

// Configuring the Articles module
angular.module('resumes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('My Resume'', 'Resumes', 'resumes', 'dropdown', '/resumes(/create)?');
		Menus.addSubMenuItem('My Resume'', 'resumes', 'List Resumes', 'resumes');
		Menus.addSubMenuItem('My Resume'', 'resumes', 'New Resume', 'resumes/create');
	}
]);