import React from 'react';

export default function useFormBase(args) {	
	const [isAddForm, setIsAddForm] = React.useState(false);
	
	function initAddForm() {
		setIsAddForm(x => true);
	}
	
	function initUpdateForm() {
		setIsAddForm(x => true);
	}

    return {
        isAddForm: isAddForm,
        initAddForm: initAddForm,
        initUpdateForm: initUpdateForm,
    }
}