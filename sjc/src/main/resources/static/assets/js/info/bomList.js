/**
 * bomList.js
 */

	

document.addEventListener('DOMContentLoaded', function() {

    const grid = new tui.Grid({
        el: document.getElementById('grid'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: '자재코드',
                name: 'mtCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '자재이름',
                name: 'mtName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '자재구분',
                name: 'materialType',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '규격',
                name: 'specification',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '단위',
                name: 'unit',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '단가',
                name: 'unitPrice',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '안전재고',
                name: 'safetyStock',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '비고',
                name: 'comm',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '재고코드',
                name: 'stcCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '재고변동일',
                name: 'updateDate',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '현재재고',
                name: 'currentStc',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            /*
            {
                header: '리드타임',
                name: 'leadtime',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            */
            {
                header: '현재수량',
                name: 'quantityRequired',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
            {
                header: '제품명',
                name: 'prdName',
                align: 'center',
                sortingType: 'desc',
                sortable: true                  
            },
        ],
        rowHeaders: ['checkbox', 'rowNum'],
        pageOptions: {
            useClient: true,
            perPage: 4
        }
    });


    const gridBom = new tui.Grid({
        el: document.getElementById('gridBom'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: 'BOM코드',
                name: 'bomCode',
                align: 'center',
                sortingType: 'asc',
                sortable: true                
            },
            {
                header: '제품코드',
                name: 'prdCode',
                align: 'center',
                //sortingType: 'desc',
                //sortable: true                
            },
            {
                header: '설명',
                name: 'description',
                align: 'center',
                //sortingType: 'desc',
                //sortable: true                
            },
            {
                header: '등록일',
                name: 'regDate',
                align: 'center',
                //sortingType: 'desc',
                //sortable: true                
            },
            {
                header: '담당자',
                name: 'manager',
                align: 'center',
                //sortingType: 'desc',
                //sortable: true                
            },
            /*
            {
                header: '메모',
                name: 'comm',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '소요수량',
                name: 'quantityRequired',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '자재코드',
                name: 'mtCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '순서',
                name: 'no',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: 'BOM상세코드',
                name: 'bDetailCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            */
        ],
        rowHeaders: ['checkbox', 'rowNum'],
        pageOptions: {
            useClient: true,
            perPage: 4
        }        
    });
    
    const gridBomDetail = new tui.Grid({
        el: document.getElementById('gridBomDetail'),
        scrollX: false,
        scrollY: false,
        columns: [
            {
                header: 'BOM상세코드',
                name: 'bdetailCode', //bDetailCode
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },			
            {
                header: 'BOM코드',
                name: 'bomCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            /*
            {
                header: '제품코드',
                name: 'prdCode',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            */
            {
                header: '자재코드',
                name: 'mtCode',
                align: 'center',
             
            },
            /*
            {
                header: '설명',
                name: 'description',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '등록일',
                name: 'regDate',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '담당자',
                name: 'manager',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '메모',
                name: 'comm',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            */
		   
            /*
            {
                header: '소요수량',
                name: 'quantityRequired',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            {
                header: '순서',
                name: 'no',
                align: 'center',
                sortingType: 'desc',
                sortable: true                
            },
            */
        ],
        rowHeaders: ['checkbox', 'rowNum'],
        pageOptions: {
            useClient: true,
            perPage: 4
        }        
    });



    function fetchMtList(search = {}) {
        const params = new URLSearchParams(search);
        const url = `/mts?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                grid.resetData(result);
            })
            .catch(error => {
                console.error(error);
            });
    }
    fetchMtList();

    document.getElementById('registerBtn').addEventListener('click', function() {
        const selectedRows = grid.getCheckedRows();
        
        if (selectedRows.length > 0) {
        	if (confirm("새로운 BOM을 등록하시겠습니까??") == true){
        		//registerBoms(selectedRows.map(row => row.mtCode));
        		registerBoms(selectedRows);
        	}else{
        		return false;
        	}
        } else {
            alert('등록할 자재를 선택해주세요.');
        }
    });

    function registerBoms(selectedRows) {
        fetch('/registerBoms', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedRows),
        })
	    .then(response => {
	        if (response.ok) {
				
				
			    fetchBoms();
			    fetchBomDetails();
			    
			    grid.uncheckAll();
		    	gridBom.addRowClassName(0, 'bg-success');
			    selectedRows.forEach((row , index) => {
					gridBomDetail.addRowClassName(index, 'bg-success');
				});
	        }
	        
	        return response.json();
	    })
        .then(result => {

            console.error('result:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function fetchBoms(search = {}) {
        const params = new URLSearchParams(search);
        const url = `/boms?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                gridBom.resetData(result);
                //gridBom.refreshLayout();
            })
            .catch(error => {
                console.error(error);
            });
    }
    fetchBoms();
    
    function fetchBomDetails(search = {}) {
        const params = new URLSearchParams(search);
        const url = `/bomDetails?${params.toString()}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                gridBomDetail.resetData(result);
                //gridBomDetail.refreshLayout();
                
            })
            .catch(error => {
                console.error(error);
            });
    }
    fetchBomDetails();

	gridBom.on('afterChange', (ev) => {
	  const changes = ev.changes;  // 변경된 셀들의 정보
	  const rowKey = changes[0].rowKey;  // 변경된 행의 rowKey
	  const updatedRow = gridBom.getRow(rowKey);  // 해당 행의 전체 데이터
	  
	  console.log('변경된 행 데이터:', updatedRow);
	  gridBom.addRowClassName(rowKey, 'bg-warning');
	});

/*
	window.addEventListener('resize', function() {
	    gridBom.refreshLayout();
	    gridBomDetail.refreshLayout();
	});
	*/	 
});		 