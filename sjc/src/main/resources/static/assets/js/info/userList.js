/**
 * userList.js
 */

document.addEventListener('DOMContentLoaded', function() {
	const dataSource = {
		api: {
			readData: { 
			url: '/usersApi',	
			method: 'GET',
	    	},
		},
	    hideLoadingBar: true,
	  	initialRequest: true
	}
	
    const grid = new tui.Grid({
        el: document.getElementById('grid'),
		data: dataSource,
        scrollX: false,
        scrollY: false,
        contextMenu : null,
        rowHeaders: ['checkbox', 'rowNum'],
        columns: [
            {
                header: '사용자번호',
                name: 'userId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '아이디',
                name: 'loginId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '이름',
                name: 'userName',
                align: 'center',
                sortingType: 'desc',
                sortable: true,
                editor: 'text',
	            filter: {
	                type: 'text',
	                showApplyBtn: true,
	                showClearBtn: true
	            },                
                                  
            },
            
            {
                header: '권한',
                name: 'roleName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '부서명',
                name: 'deptCode',
                align: 'center',
                formatter: 'listItemText',
                editor: {
                  type: 'select',
                  options: {
                    listItems: [
                      { text: '영업', value: 'SA' },
                      { text: '생산', value: 'PR' },
                      { text: '자재', value: 'MT' },
                      { text: '품질', value: 'QA' },
                      { text: '설비', value: 'EQ' },
                      { text: '전산', value: 'IT' },
                    ]
                  }
                },

              },
              {
			    header: '연락처',
			    name: 'phone',
			    align: 'center',
			    sortingType: 'desc',
			    sortable: true
			  },
        ],
        pageOptions: {
            useClient: false,
            perPage: 4
        }
    });
    
    const gridUserHistoryModal = new tui.Grid({
        el: document.getElementById('gridUserhistoryModal'),
		data: dataSource,
        scrollX: false,
        scrollY: false,
        contextMenu : null,
        rowHeaders: ['rowNum'],
        columns: [
            {
                header: '사용자번호',
                name: 'userId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '아이디',
                name: 'loginId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '이름',
                name: 'userName',
                align: 'center',
                sortingType: 'desc',
                sortable: true,
                editor: 'text',
	            filter: {
	                type: 'text',
	                showApplyBtn: true,
	                showClearBtn: true
	            },                
                                  
            },
            /*
            {
                header: '권한',
                name: 'roleName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            */
            {
                header: '부서명',
                name: 'deptCode',
                align: 'center',
                formatter: 'listItemText',
                editor: {
                  type: 'select',
                  options: {
                    listItems: [
                      { text: '영업', value: 'SA' },
                      { text: '생산', value: 'PR' },
                      { text: '자재', value: 'MT' },
                      { text: '품질', value: 'QA' },
                      { text: '설비', value: 'EQ' },
                      { text: '전산', value: 'IT' },
                    ]
                  }
                },

              },
              {
			    header: '연락처',
			    name: 'phone',
			    align: 'center',
			    sortingType: 'desc',
			    sortable: true
			  },
              {
			    header: '수정일',
			    name: 'createdDate',
			    align: 'center',
			    sortingType: 'desc',
			    sortable: true
			  },
        ],
	    bodyHeight: 400,
		pageOptions: {
		    type: 'scroll', 
		    perPage: 10 
		},        
        /*
        pageOptions: {
            useClient: false,
            perPage: 4
        }
        */
    });
    
    const gridInsert = new tui.Grid({
        el: document.getElementById('gridInsert'),
        scrollX: false,
        scrollY: false,
        rowHeaders: ['rowNum'],
        columns: [
			/*
            {
                header: '사용자번호',
                name: 'userId',
                align: 'center',
                sortingType: 'desc',
                sortable: true,                
                editor: 'text',
            },
            */
            {
                header: '아이디',
                name: 'loginId',
                align: 'center',
                sortingType: 'desc',
                sortable: true,
                editor: 'text',
                validation: {
					required: true,
        			unique: true,
			        regExp: /^[a-zA-Z0-9]+$/
                },                
      
            },
            {
                header: '비밀번호',
                name: 'password',
                align: 'center',
                sortingType: 'desc',
                sortable: true,
                editor: 'text',
                validation: {
					required: true,
			        min: 1000,
			        max: 10000        			
                },                   
            },
            {
                header: '이름',
                name: 'userName',
                align: 'center',
                sortingType: 'desc',
                sortable: true,
                editor: 'text',
                validation: {
					required: true,
			        regExp: /^[가-힣a-zA-Z]+$/
                },                 
                                  
            },
            {
                header: '권한',
                name: 'roleName',
                align: 'center',
                formatter: 'listItemText',
                editor: {
                  type: 'radio',
                  options: {
                    listItems: [
                      { text: 'ROLE_ADMIN', value: 'ROLE_ADMIN' },
                      { text: 'ROLE_USER', value: 'ROLE_USER' },
                    ]
                  }
                },
	            validation: {
	                required: true
	            }                
            },
            {
                header: '부서명',
                name: 'deptCode',
                align: 'center',
                formatter: 'listItemText',
                editor: {
                  type: 'select',
                  options: {
                    listItems: [
                      { text: '영업', value: 'SA' },
                      { text: '생산', value: 'PR' },
                      { text: '자재', value: 'MT' },
                      { text: '품질', value: 'QA' },
                      { text: '설비', value: 'EQ' },
                      { text: '전산', value: 'IT' },
                    ]
                  }
                },
	            validation: {
	                required: true
	            }                
              },
              {
			    header: '연락처',
			    name: 'phone',
			    align: 'center',
			    sortingType: 'desc',
			    sortable: true,
                editor: 'text',
                validation: {
			        regExp: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/
                },                   
                
			  },
        ],
        /*
        pageOptions: {
            useClient: false,
            perPage: 3
        }
        */
    });
    
    tui.Grid.applyTheme('striped');

    document.getElementById('searchBtn').addEventListener('click', function() {
		
        const searchParams = {
            userId: document.getElementById('inputUserId').value,
            loginId: document.getElementById('inputLoginId').value,
            roleName: document.getElementById('inputRoleName').value,
            userName: document.getElementById('inputUserName').value,
            deptCode: document.getElementById('inputDeptCode').value,
            deptName: document.getElementById('inputDeptName').value,
        };
        
  		grid.readData(1, searchParams);
    });
    
    document.getElementById('inputUserId').addEventListener('input', function() {
	    const searchParams = {
	        userId: document.getElementById('inputUserId').value,
	    };
		grid.readData(1, searchParams);
	});
    document.getElementById('inputLoginId').addEventListener('input', function() {
	    const searchParams = {
	        loginId: document.getElementById('inputLoginId').value,
	    };
		grid.readData(1, searchParams);
	});
    document.getElementById('inputRoleName').addEventListener('input', function() {
	    const searchParams = {
	        roleName: document.getElementById('inputRoleName').value,
	    };
		grid.readData(1, searchParams);
	});
    document.getElementById('inputUserName').addEventListener('input', function() {
	    const searchParams = {
	        userName: document.getElementById('inputUserName').value,
	    };
		grid.readData(1, searchParams);
	});
    document.getElementById('inputDeptCode').addEventListener('input', function() {
	    const searchParams = {
	        deptCode: document.getElementById('inputDeptCode').value,
	    };
		grid.readData(1, searchParams);
	});
    document.getElementById('inputDeptName').addEventListener('input', function() {
	    const searchParams = {
	        deptName: document.getElementById('inputDeptName').value,
	    };
		grid.readData(1, searchParams);
	});

    /*
    grid.on('editingFinish', (event) => {
        const { rowKey, columnName, value } = event;
        grid.setValue(rowKey, columnName, value);
	  	console.log('grid editingFinish:', rowKey);
    });
    
    gridInsert.on('editingFinish', (event) => {
        const { rowKey, columnName, value } = event;
        gridInsert.setValue(rowKey, columnName, value);
	  	console.log('gridInsert editingFinish:', rowKey, columnName, value );
	  	
    });
    */
	/*    
	gridInsert.on('validateChange', (ev) => {
	    console.log('검증 결과:', ev);
	});    
	*/
    document.getElementById('updateBtn').addEventListener('click', function() {
	    //const modifiedRows = grid.getModifiedRows();
	    const modifiedRows = grid.getModifiedRows().updatedRows;
	    
	    if (modifiedRows.length === 0) {
	        //alert('수정된 데이터가 없습니다.');
			Swal.fire({
                icon: 
                'warning',		// !	
                text: '수정된 데이터가 없습니다.',
            });	        
	        return;
	    }
	
	
		const isConfirmed = Swal.fire({
	            title: '사용자 정보 수정',
	            text: "사용자 정보를 수정 하시겠습니까?",
                icon: 
                //'success';	// v
                //'error',		// X
                //'warning',		// !	
                'info',		// i
                //'question', 	// ?
	            showCancelButton: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#d33',
	            confirmButtonText: '수정', // 수정.
	            cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
					// do something.
					modifyUsers(modifiedRows);
					
                    Swal.fire({
                        icon: 'success',
                        title: '사용자정보 수정완료',
                        text: '사용자정보 수정완료 되었습니다.',
                    });
                }else{
    				return false;
				}
        	});	
	
		/*
		if (confirm("수정 하시겠습니까??")){
			modifyUsers(modifiedRows);
		}else{
			return;
		}
		*/	
	});

    function modifyUsers(modifiedRows) {
	    fetch('users', {
	        method: 'PUT',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(modifiedRows),
	    })
	    .then(response => {
	        if (response.ok) {
				const modifiedRowKeys = [
				  ...modifiedRows.map(row => row.rowKey),
				];
				
				modifiedRowKeys.forEach(rowKey => {
					
				  if (rowKey !== undefined) {
				    grid.addRowClassName(rowKey, 'bg-warning');
				  }
		  		});
	        }
	        
	        return response.json();
	    })
	    .then(result => {
	        //fetchUsers();
	        grid.reloadData();
	        console.log(result);
	    })
	    .catch(error => {
	        console.error('Error: ', error);
	    })
	    .finally(() => {
	    	
	    });
    }

    
    document.getElementById('saveBtn').addEventListener('click', function() {
		
		//console.log(gridInsert.validate());
		//console.log(grid.getData());
		//console.log(gridInsert.getData());
		
	    const updatedRows = gridInsert.getModifiedRows().updatedRows;
	    
	    const modifiedRows = gridInsert.getModifiedRows().createdRows;
	    //const modifiedRows = gridInsert.getData();
	    
	    modifiedRows.forEach(object => {
			if	(object == null || object == ""){
		        //alert('데이터 입력하세요.');
				Swal.fire({
	                icon: 
	                'warning',		// !	
	                text: '데이터 입력하세요.',
	            });		        
		        return false;
			}
			
		});
	    
	    if (modifiedRows.length == 0) {
	        //alert('등록된 데이터가 없습니다.');
			Swal.fire({
                icon: 
                'warning',		// !	
                text: '등록된 데이터가 없습니다.',
            });	        
	        return false;
	    }
	    
	    if(gridInsert.validate() == 0){
			// do nothing
		}else if (gridInsert.validate()[0].errors.length > 0) {
	        //alert('형식에 맞게 입력하세요.');
			Swal.fire({
                icon: 
                'warning',		// !	
                text: '형식에 맞게 입력하세요.',
            });	        
	        return false;
	    }
	
	
		const isConfirmed = Swal.fire({
	            title: '사용자 등록',
	            text: "사용자 등록하시겠습니까?",
                icon: 
                //'success';	// v
                //'error',		// X
                //'warning',		// !	
                'info',		// i
                //'question', 	// ?
	            showCancelButton: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#d33',
	            confirmButtonText: '등록', // 수정.
	            cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
					// do something.
					saveUsers(modifiedRows);
					
                    Swal.fire({
                        icon: 'success',
                        title: '사용자 등록완료',
                        text: '사용자 등록이 완료 되었습니다.',
                    });
                }else{
    				return false;
				}
        	});	
	
		/*
		if (confirm("등록 하시겠습니까??")){
			saveUsers(modifiedRows);
		}else{
			return false;
		}
		*/
		
	});
	
	
    function saveUsers(modifiedRows) {
	    fetch('users', {
	        method: 'PUT',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(modifiedRows),
	    })
	    .then(response => {
	        if (response.ok) {
				const modifiedRowKeys = [
				  ...modifiedRows.map(row => row.rowKey),
				];
				
				modifiedRowKeys.forEach(rowKey => {
				  if (rowKey !== undefined) {
				    gridInsert.addRowClassName(rowKey, 'bg-warning');
				    gridInsert.restore();
		    		//document.getElementById('gridInsert').style.display="none";
		    		document.getElementById('gridInsertWrapper').style.display="none";
				  }
		  		});
	        }
	        
	        return response.json();
	    })
	    .then(result => {
	        //fetchUsers();
	        console.log(result);
	    })
	    .catch(error => {
	        console.error('Error: ', error);
	    })
	    .finally(() => {
	    	
	    });
    }	
	
		
    document.getElementById('insertBtn').addEventListener('click', function() {
		
		//document.getElementById('gridInsert').style.display="block";
		document.getElementById('gridInsertWrapper').style.display="block";
		gridInsert.refreshLayout();
		//gridInsert.appendRow();
		gridInsert.appendRow({
			 userId : '1000'
			,password : 1234
			,userName : '신규 사용자'
			,roleName : 'ROLE_USER'
			,deptCode : 'IT'
			,phone	  : '010-'

		});
    });
    
    function insertUser(user) {
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(result => {
            fetchUsers();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

	document.getElementById('deleteBtn').addEventListener('click', function() {
		
		const checkedRows = grid.getCheckedRows();
		if (checkedRows.length === 0) {
			
			//alert('삭제할 항목을 선택해주세요.');
			Swal.fire({
                icon: 
                'warning',		// !	
                text: '삭제할 항목을 선택해주세요.',
            });			
	    	return;
		}


		const isConfirmed = Swal.fire({
	            title: '사용자 등록',
	            text: "사용자 등록하시겠습니까?",
                icon: 
                //'success';	// v
                //'error',		// X
                //'warning',		// !	
                'info',		// i
                //'question', 	// ?
	            showCancelButton: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#d33',
	            confirmButtonText: '삭제', // 수정.
	            cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
					// do something.
					deleteUsers(checkedRows.map(row => row.userId));
					
                    Swal.fire({
                        icon: 'success',
                        title: '사용자 삭제완료',
                        text: '사용자 삭제가 완료 되었습니다.',
                    });
                }else{
    				return false;
				}
        	});


	  	/*
		if (confirm("삭제하시겠습니까??")){
			deleteUsers(checkedRows.map(row => row.userId));
		}else{
			return;
		}
		*/
	});

    function deleteUsers(userIds) {
		//fetch('/users', {
		fetch('/usersProcedure', {
			method: 'DELETE',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(userIds)
			})
		.then(response => response.json())
		.then(result => {
			console.log('Delete result:', result);
			grid.removeCheckedRows();
			grid.refreshLayout();
		})
		.catch(error => {
			console.error('Delete error:', error);
			//alert('삭제 중 오류가 발생했습니다.');
			Swal.fire({
                icon: 
                'warning',		// !	
                text: '삭제 중 오류가 발생했습니다.',
            });			
		});
    }
    
    document.getElementById('copyBtn').addEventListener('click', function() {
        const selectedRows = grid.getCheckedRows();
        
        if (selectedRows.length > 0) {
        	if (confirm("복사하시겠습니까??") == true){
        		copyUsers(selectedRows.map(row => row.userId));
        	}else{
        		return false;
        	}
        } else {
            alert('복사할 사용자를 선택해주세요.');
        }
    });

    function copyUsers(userIds) {
        fetch('/copyUsers', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userIds),
        })
        .then(response => response.json())
        .then(result => {
            //fetchUsers();
            fetchCopyLogs();
            fetchCopyDetails();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }      

    const gridCopyLog = new tui.Grid({
        el: document.getElementById('gridCopyLog'),
        scrollX: false,
        scrollY: false,
        rowHeaders: ['rowNum'],
        columns: [
            {
                header: '복사번호',
                name: 'logId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '입력일',
                name: 'copyDate',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
        ],
        pageOptions: {
            useClient: true,
            perPage: 3
        }
    });

    function fetchCopyLogs(search = {}) {
        const params = new URLSearchParams(search);
        const url = `/copyLogs?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                gridCopyLog.resetData(result);
            })
            .catch(error => {
                console.error(error);
            });
    }

    fetchCopyLogs();
    
    const gridCopyDetail = new tui.Grid({
        el: document.getElementById('gridCopyDetail'),
        scrollX: false,
        scrollY: false,
        rowHeaders: ['rowNum'],
        columns: [
            {
                header: '복사상세번호',
                name: 'detailId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '복사번호',
                name: 'logId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '사용자번호',
                name: 'userId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '아이디',
                name: 'loginId',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '이름',
                name: 'userName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '부서코드',
                name: 'DeptCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '권한',
                name: 'roleName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
        ],
        pageOptions: {
            useClient: true,
            perPage: 3
        }
    });

    function fetchCopyDetails(search = {}) {
        const params = new URLSearchParams(search);
        const url = `/copyDetails?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                gridCopyDetail.resetData(result);
            })
            .catch(error => {
                console.error(error);
            });
    }
    fetchCopyDetails();
    
	document.getElementById('xlsxBtn').addEventListener('click', function() {
		
		const options = {
		  includeHiddenColumns: true,
		  onlySelected: false,
		  fileName: '사용자정보',
		};
		
		grid.export('xlsx', options);		
	});
	
	document.getElementById('userHistoryBtn').addEventListener('click', function() {
		fetchUserHistory();
	});

    function fetchUserHistory() {
        const url = `userHistory`;
        fetch(url)
        .then(response => response.json())
        .then(result => {
            gridUserHistoryModal.resetData(result);
            $('#userHistoryModal').modal('show');
            gridUserHistoryModal.refreshLayout();            
        })
        .catch(error => {
            console.error(error);
        });
    }


	document.addEventListener('click', (e) => {
	    grid.finishEditing();
	    gridInsert.finishEditing();
	});


});